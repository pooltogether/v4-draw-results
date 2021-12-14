const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
// const cli = require('@pooltogether/draw-calculator-cli/dist/index.js');

async function run() {
  let chaindId = 1;
  console.log(`checking if draw calculator CLI needs to be run for chainId: ${chainId}`);
  if (checkIfRunRequired(chaindId));
  {
    console.log(`running CLI for chainId: ${chaindId}`);
  }
}
run();

async function checkIfRunRequired(chainId) {
  const mostRecentCommit = findMostRecentDrawCommitedForChainId(chainId);
  const newestPrizeDistribution = await getNewestPrizeDistribution(chainId);
  return mostRecentCommit != newestPrizeDistribution.drawId;
}
