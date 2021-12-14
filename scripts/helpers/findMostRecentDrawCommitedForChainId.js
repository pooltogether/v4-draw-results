const fs = require('fs');
function findMostRecentDrawCommitedForChainId(chainId) {
  let prizeDistributor = '';
  if (chainId == '1') {
    prizeDistributor = '0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe';
  } else if (chainId == '137') {
    prizeDistributor = '0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056';
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
