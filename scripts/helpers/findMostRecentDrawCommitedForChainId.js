const fs = require('fs');
const {
  POLYGON_PRIZE_DISTRIBUTOR_ADDRESS,
  MAINNET_PRIZE_DISTRIBUTOR_ADDRESS,
  AVALANCHE_PRIZE_DISTRIBUTOR_ADDRESS,
} = require('../constants');

function findMostRecentDrawCommitedForChainId(chainId) {
  let prizeDistributor = '';
  if (chainId == '1') {
    prizeDistributor = MAINNET_PRIZE_DISTRIBUTOR_ADDRESS;
  } else if (chainId == '137') {
    prizeDistributor = POLYGON_PRIZE_DISTRIBUTOR_ADDRESS;
  } else if (chainId == '43114') {
    prizeDistributor = AVALANCHE_PRIZE_DISTRIBUTOR_ADDRESS;
  }

  const drawsPath = `${__dirname}/../../api/prizes/${chainId}/${prizeDistributor}/draw`;
  const draws = fs.readdirSync(drawsPath);
  // draws is an array of numbers,  get max draw from draws
  const maxDraw = draws.reduce((a, b) => {
    return Math.max(a, b);
  });

  return maxDraw;
}
module.exports = findMostRecentDrawCommitedForChainId;
