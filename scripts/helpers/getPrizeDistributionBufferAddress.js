const prizeDistributionBufferMainnet =
  require('@pooltogether/v4-mainnet/deployments/mainnet/PrizeDistributionBuffer.json').address;
const prizeDistributionBufferPolygon =
  require('@pooltogether/v4-mainnet/deployments/polygon/PrizeDistributionBuffer.json').address;
const prizeDistributionBufferAvalanche =
  require('@pooltogether/v4-mainnet/deployments/avalanche/PrizeDistributionBuffer.json').address;

function getPrizeDistributionBufferAddress(chainId) {
  let prizeDistributionBufferAddress = '';

  if (chainId == '1') {
    prizeDistributionBufferAddress = prizeDistributionBufferMainnet;
  } else if (chainId == '137') {
    prizeDistributionBufferAddress = prizeDistributionBufferPolygon;
  } else if (chainId == '43114') {
    prizeDistributionBufferAddress = prizeDistributionBufferAvalanche;
  }
  if (prizeDistributionBufferAddress == '') {
    throw new Error(
      `No prize distribution buffer address found for chainId: ${chainId} and ticket: ${ticket}`,
    );
  }

  return prizeDistributionBufferAddress;
}
module.exports = getPrizeDistributionBufferAddress;
