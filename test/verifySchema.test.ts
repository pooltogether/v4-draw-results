const AJV = require('ajv');
const schema = require('../schema/prize.json');
const testData = require('./data/prizes.json');
const expect = require('chai').expect;

describe('validate data against schema', () => {
  it('prize data is valid', () => {
    const ajv = new AJV();
    expect(ajv.validate(schema, testData)).to.be.true;
  });
});
