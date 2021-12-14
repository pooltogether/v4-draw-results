const prizeDistributionBufferAbi =
  require('@pooltogether/v4-mainnet/deployments/mainnet/PrizeDistributionBuffer.json').abi;
const prizeDistributionBufferMainnet =
  require('@pooltogether/v4-mainnet/deployments/mainnet/PrizeDistributionBuffer.json').address;
const prizeDistributionBufferPolygon =
  require('@pooltogether/v4-mainnet/deployments/polygon/PrizeDistributionBuffer.json').address;
const ethers = require('ethers');

async function getNewestPrizeDistribution(chainId) {
  console.log(`Finding newest prize distribution for chainId ${chainId}`);

  let drawBufferAddress = '';
  let providerUrl = '';

  if (chainId == '1') {
    drawBufferAddress = prizeDistributionBufferMainnet;
    providerUrl = process.env.ALCHEMY_MAINNET_URL;
  } else if (chainId == '137') {
    drawBufferAddress = prizeDistributionBufferPolygon;
    providerUrl = process.env.MATICVIGIL_URL;
  }

  if (drawBufferAddress == '' || providerUrl == '') {
    throw new Error('Chain ID not supported or drawBuffer address not found');
  }

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const prizeDistributionBuffer = new ethers.Contract(
    drawBufferAddress,
    prizeDistributionBufferAbi,
    provider,
  );

  const prizeDistribution = await prizeDistributionBuffer.getNewestPrizeDistribution();
  console.log(`The newest prize distribution set is for draw ${prizeDistribution.drawId}`);

  return prizeDistribution;
}
// getNewestPrizeDistribution(1);

module.exports = getNewestPrizeDistribution;
