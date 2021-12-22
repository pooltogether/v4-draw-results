const spawnCLIProcess = require('./spawnCLIProcess');
const checkIfCLIRunRequired = require('./helpers/checkIfCLIRunRequired');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');

const { MAINNET_TICKET_ADDRESS, POLYGON_TICKET_ADDRESS } = require('./constants');

const core = require('@actions/core');

async function run() {
  const path = './api/prizes';
  let chainId = 1;

  if (await checkIfCLIRunRequired(chainId)) {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    const mostRecentCommitedDrawId = findMostRecentDrawCommitedForChainId(chainId);

    // need to run between these two draw Ids - create a range
    const draws = Array.from(
      { length: newestPrizeDistributionDrawId - mostRecentCommitedDrawId + 1 },
      (v, k) => k + mostRecentCommitedDrawId,
    );
    console.log('running CLI for draws: ', draws);

    for (let drawId of draws) {
      console.log(`running CLI for chainId: ${chainId} and drawId ${drawId}`);
      await spawnCLIProcess(chainId, MAINNET_TICKET_ADDRESS, drawId, path);
    }

    core.setOutput('mainnetCliToolRan', 'true');
    core.setOutput('mainnetDrawId', JSON.stringify(draws));
    core.setOutput('mainnetChainId', chainId);
  }

  // now polygon
  chainId = 137;

  if (await checkIfCLIRunRequired(chainId)) {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    const mostRecentCommitedDrawId = findMostRecentDrawCommitedForChainId(chainId);

    // need to run between these two draw Ids - create a range
    const draws = Array.from(
      { length: newestPrizeDistributionDrawId - mostRecentCommitedDrawId + 1 },
      (v, k) => k + mostRecentCommitedDrawId,
    );
    console.log('running CLI for draws: ', draws);
    for (let drawId of draws) {
      console.log(`running CLI for chainId: ${chainId} and drawId ${drawId}`);
      await spawnCLIProcess(chainId, POLYGON_TICKET_ADDRESS, drawId, path);
    }

    core.setOutput('polygonCliToolRan', 'true');
    core.setOutput('polygonDrawId', JSON.stringify(draws));
    core.setOutput('polygonChainId', chainId);
  }

  console.log('done! exiting 0');
  process.exit(0);
}
run();
