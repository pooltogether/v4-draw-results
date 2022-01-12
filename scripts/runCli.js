const spawnCLIProcess = require('./spawnCLIProcess');
const checkIfCLIRunRequired = require('./helpers/checkIfCLIRunRequired');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');

const {
  MAINNET_USDC_TICKET_ADDRESS,
  POLYGON_USDC_TICKET_ADDRESS,
  AVALANCHE_USDC_TICKET_ADDRESS,
} = require('./constants');

const core = require('@actions/core');

async function run() {
  await runForChainId(1, MAINNET_USDC_TICKET_ADDRESS, 'mainnetCliToolRan', 'mainnetDrawId');
  await runForChainId(137, POLYGON_USDC_TICKET_ADDRESS, 'polygonCliToolRan', 'polygonDrawId');
  await runForChainId(
    43114,
    AVALANCHE_USDC_TICKET_ADDRESS,
    'avalancheCliToolRan',
    'avalancheDrawId',
  );

  console.log('done! exiting 0');
  process.exit(0);
}
run();

async function runForChainId(chainId, ticket, chainIdRunBoolean, chainIdDrawIdMsg) {
  const path = './api/prizes';

  if (await checkIfCLIRunRequired(chainId, ticket)) {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    const mostRecentCommitedDrawIdResult = findMostRecentDrawCommitedForChainId(chainId);
    const mostRecentCommitedDrawId = parseInt(mostRecentCommitedDrawIdResult);

    // need to run between these two draw Ids exclusive of the first - create a range
    const draws = Array.from(
      { length: newestPrizeDistributionDrawId - mostRecentCommitedDrawId },
      (v, k) => k + mostRecentCommitedDrawId + 1,
    );
    console.log('running CLI for draws: ', draws);
    for (let drawId of draws) {
      console.log(`running CLI for chainId: ${chainId} and drawId ${drawId}`);
      await spawnCLIProcess(chainId, ticket, drawId, path);
    }

    core.setOutput(chainIdRunBoolean, 'true');
    core.setOutput(chainIdDrawIdMsg, JSON.stringify(draws));
  }
}
