const fs = require('fs');
const path = require('path');
const getPrizeDistributorAddress = require('./getPrizeDistributorAddress');

function findMostRecentDrawCommitedForChainId(chainId, ticket) {
  const prizeDistributor = getPrizeDistributorAddress(chainId, ticket);
  const drawsPath = `${__dirname}/../../api/prizes/${chainId}/${prizeDistributor}/draw`;
  const draws = fs.readdirSync(path.resolve(drawsPath));
  // draws is an array of numbers,  get max draw from draws
  const maxDraw = draws.reduce((a, b) => {
    return Math.max(a, b);
  });

  return maxDraw;
}
module.exports = findMostRecentDrawCommitedForChainId;
