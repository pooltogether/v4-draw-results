const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
const spawnCLIProcess = require('./spawnCLIProcess');

const { MAINNET_TICKET_ADDRESS, POLYGON_TICKET_ADDRESS } = require('./constants');
async function run() {
  let cliToolRan = false;
  const path = './api/prizes';
  let chainId = 1;

  if (await checkIfRunRequired(chainId)) {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    console.log(`running CLI for chainId: ${chainId} and drawId ${newestPrizeDistributionDrawId}`);
    await spawnCLIProcess(chainId, MAINNET_TICKET_ADDRESS, newestPrizeDistributionDrawId, path);
    cliToolRan = true;
  }

  // now polygon
  chainId = 137;

  if (await checkIfRunRequired(chainId)) {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    console.log(`running CLI for chainId: ${chainId} and drawId ${newestPrizeDistributionDrawId}`);
    await spawnCLIProcess(chainId, POLYGON_TICKET_ADDRESS, newestPrizeDistributionDrawId, path);
    cliToolRan = true;
  }

  if (!cliToolRan) {
    process.exit(1);
  }

  console.log('done! exiting 0');
  process.exit(0);
}
run();

async function checkIfRunRequired(chainId) {
  console.log(`checking if draw calculator CLI needs to be run for chainId: ${chainId}`);
  const mostRecentCommit = findMostRecentDrawCommitedForChainId(chainId);
  console.log(`chainId ${chainId} most recent commit drawId:  ${mostRecentCommit}`);

  const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
  console.log(
    `chainId ${chainId} most recent newestPrizeDistributionDrawId drawId:  ${newestPrizeDistributionDrawId}`,
  );

  if (mostRecentCommit.toString() !== newestPrizeDistributionDrawId.toString()) {
    console.log('checkIfRunRequired returning true');
    return true;
  }
  console.log('checkIfRunRequired returning false');
  return false;
}
