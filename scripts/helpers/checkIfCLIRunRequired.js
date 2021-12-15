const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');

async function checkIfCLIRunRequired(chainId) {
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
module.exports = checkIfCLIRunRequired;
