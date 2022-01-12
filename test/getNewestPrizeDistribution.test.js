const expect = require('chai').expect;
const getNewestPrizeDistribution = require('../scripts/helpers/getNewestPrizeDistribution');

describe('getNewestPrizeDistribution', () => {
  it('getNewestPrizeDistribution', async () => {
    const result = await getNewestPrizeDistribution('1');
    expect(result.drawId).to.be.greaterThan(1);
  }).timeout(90000);
});
