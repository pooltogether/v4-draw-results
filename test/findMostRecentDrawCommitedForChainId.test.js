const findMostRecentDrawCommitedForChainId = require('../scripts/helpers/findMostRecentDrawCommitedForChainId');
const {
  MAINNET_USDC_TICKET_ADDRESS,
  POLYGON_USDC_TICKET_ADDRESS,
  AVALANCHE_USDC_TICKET_ADDRESS,
  POLYGON_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
  MAINNET_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
  AVALANCHE_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
} = require('../scripts/constants');

const expect = require('chai').expect;

describe('findMostRecentDrawCommitedForChainId', () => {
  it('findMostRecentDrawCommitedForChainId = 1 ', async () => {
    // expect to return the highest drawId in file system

    const result = await findMostRecentDrawCommitedForChainId(1, MAINNET_USDC_TICKET_ADDRESS);
    expect(result).greaterThan(0);
  });
  it('findMostRecentDrawCommitedForChainId = 137', async () => {
    // expect to return the highest drawId in file system

    const result = await findMostRecentDrawCommitedForChainId(137, POLYGON_USDC_TICKET_ADDRESS);
    expect(result).greaterThan(0);
  });
  it('findMostRecentDrawCommitedForChainId = 43114', async () => {
    // expect to return the highest drawId in file system

    const result = await findMostRecentDrawCommitedForChainId(43114, AVALANCHE_USDC_TICKET_ADDRESS);
    expect(result).greaterThan(0);
  });
});
