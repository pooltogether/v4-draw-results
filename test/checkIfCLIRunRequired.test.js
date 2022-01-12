const checkIfCLIRunRequired = require('../scripts/helpers/checkIfCLIRunRequired');

const assert = require('chai').assert;
const {
  MAINNET_USDC_TICKET_ADDRESS,
  POLYGON_USDC_TICKET_ADDRESS,
  AVALANCHE_USDC_TICKET_ADDRESS,
  POLYGON_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
  MAINNET_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
  AVALANCHE_USDC_PRIZE_DISTRIBUTOR_ADDRESS,
} = require('../scripts/constants');

describe('checkIfCLIRunRequired', () => {
  it('checkIfCLIRunRequired = true ', async () => {
    const result = await checkIfCLIRunRequired(1, MAINNET_USDC_TICKET_ADDRESS);

    assert.isBoolean(result);
  }).timeout(90000);
});
