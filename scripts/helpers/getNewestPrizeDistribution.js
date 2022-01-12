const prizeDistributionBufferAbi =
  require('@pooltogether/v4-mainnet/deployments/mainnet/PrizeDistributionBuffer.json').abi;

const getProviderForNetwork = require('./getProviderForNetwork');
const getPrizeDistributionBufferAddress = require('./getPrizeDistributionBufferAddress');

const ethers = require('ethers');

async function getNewestPrizeDistribution(chainId) {
  let prizeDistributionBufferAddress = getPrizeDistributionBufferAddress(chainId);
  let providerUrl = await getProviderForNetwork(chainId);
  if (prizeDistributionBufferAddress == '' || providerUrl == '') {
    throw new Error('Chain ID not supported or prize distribution address not found');
  }

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const prizeDistributionBuffer = new ethers.Contract(
    prizeDistributionBufferAddress,
    prizeDistributionBufferAbi,
    provider,
  );

  const prizeDistribution = await prizeDistributionBuffer.getNewestPrizeDistribution();
  return prizeDistribution;
}
module.exports = getNewestPrizeDistribution;
