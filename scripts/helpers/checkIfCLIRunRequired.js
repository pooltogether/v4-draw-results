const findMostRecentDrawCommitedForChainId = require('./findMostRecentDrawCommitedForChainId');
const getNewestPrizeDistribution = require('./getNewestPrizeDistribution');

async function checkIfCLIRunRequired(chainId, ticket) {
  console.log(`checking if draw calculator CLI needs to be run for chainId: ${chainId}`);
  const mostRecentCommit = findMostRecentDrawCommitedForChainId(chainId, ticket);
  console.log(`chainId ${chainId} most recent commit drawId:  ${mostRecentCommit}`);

  const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
  console.log(
    `chainId ${chainId} most recent newestPrizeDistributionDrawId drawId:  ${newestPrizeDistributionDrawId}`,
  );

  if (mostRecentCommit.toString() !== newestPrizeDistributionDrawId.toString()) {
    console.log(`checkIfRunRequired for chainId ${chainId}: true`);
    return true;
  }
  console.log(`checkIfRunRequired for chainId ${chainId}: false`);
  return false;
}
module.exports = checkIfCLIRunRequired;
