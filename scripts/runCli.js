const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
// const cli = require('@pooltogether/draw-calculator-cli/dist/index.js');

function run() {
  let chaindId = 1;
  if (checkIfRunRequired(chaindId));
  {
    console.log(`running CLI for chainId: ${chaindId}`);
  }
}

function checkIfRunRequired(chainId) {
  const mostRecentCommit = findMostRecentDrawCommitedForChainId(chainId);
  const newestPrizeDistribution = getNewestPrizeDistribution(chainId);
  return mostRecentCommit != newestPrizeDistribution.drawId;
}
