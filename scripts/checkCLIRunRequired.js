const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');

function run() {
  let chaindId = 1;

  const mostRecentCommit = findMostRecentDrawCommitedForChainId(1);
  const newestPrizeDistribution = getNewestPrizeDistribution(1);

  if (mostRecentCommit != newestPrizeDistribution.drawId) {
    console.log('The most recent draw is not the newest prize distribution');
  }
}
