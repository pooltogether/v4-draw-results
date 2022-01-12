const {
  MAINNET_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
  AVALANCHE_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
  POLYGON_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
  MAINNET_USDC_TICKET_ADDRESS,
  POLYGON_USDC_TICKET_ADDRESS,
  AVALANCHE_USDC_TICKET_ADDRESS,
} = require('../constants');

function getPrizeDistributorAddress(chainId, ticket) {
  if (chainId == '1' && ticket == MAINNET_USDC_TICKET_ADDRESS) {
    return MAINNET_USDC_PRIZE_DISTRIBUTOR_ADDRESS;
  } else if (chainId == '137' && ticket == POLYGON_USDC_TICKET_ADDRESS) {
    return POLYGON_USDC_PRIZE_DISTRIBUTOR_ADDRESS;
  } else if (chainId == '43114' && ticket == AVALANCHE_USDC_TICKET_ADDRESS) {
    return AVALANCHE_USDC_PRIZE_DISTRIBUTOR_ADDRESS;
  }
  throw new Error(
    `prize distributor address not defined for chainId: ${chainId} and ticket: ${ticket}`,
  );
}
module.exports = getPrizeDistributorAddress;
