const spawnCLIProcess = require('./spawnCLIProcess');
const checkIfCLIRunRequired = require('./helpers/checkIfCLIRunRequired');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');

const {
  MAINNET_TICKET_ADDRESS,
  POLYGON_TICKET_ADDRESS,
  AVALANCHE_TICKET_ADDRESS,
} = require('./constants');

const core = require('@actions/core');

async function run() {
  await runForChainId(1, 'mainnetCliToolRan', 'mainnetDrawId');
  // await runForChainId(137, 'polygonCliToolRan', 'polygonDrawId');
  await runForChainId(43114, 'avalancheCliToolRan', 'avalancheDrawId');

  console.log('done! exiting 0');
  process.exit(0);
}
run();

async function runForChainId(chainId, chainIdRunBoolean, chainIdDrawIdMsg) {
  const path = './api/prizes';

  if (await checkIfCLIRunRequired(chainId)) {
    const newestPrizeDistributionDrawId = (
      await getNewestPrizeDistribution(chainId).drawId
    ).toNumber();
    const mostRecentCommitedDrawId = findMostRecentDrawCommitedForChainId(chainId).toNumber();

    // need to run between these two draw Ids exclusive of the first - create a range
    const draws = Array.from(
      { length: newestPrizeDistributionDrawId - mostRecentCommitedDrawId },
      (v, k) => k + mostRecentCommitedDrawId + 1,
    );
    console.log('running CLI for draws: ', draws);
    for (let drawId of draws) {
      console.log(`running CLI for chainId: ${chainId} and drawId ${drawId}`);
      await spawnCLIProcess(chainId, lookupTicketAddress(chainId), drawId, path);
    }

    core.setOutput(chainIdRunBoolean, 'true');
    core.setOutput(chainIdDrawIdMsg, JSON.stringify(draws));
  }
}

function lookupTicketAddress(chainId) {
  switch (chainId) {
    case 1:
      return MAINNET_TICKET_ADDRESS;
    case 137:
      return POLYGON_TICKET_ADDRESS;
    case 43114:
      return AVALANCHE_TICKET_ADDRESS;
    default:
      throw new Error(`unsupported chainId: ${chainId}`);
  }
}
