const drawBufferAbi = require('@pooltogether/v4-mainnet/deployments/mainnet/DrawBuffer.json').abi;
const drawBufferMainnetAddress =
  require('@pooltogether/v4-mainnet/deployments/mainnet/DrawBuffer.json').address;
const drawBufferPolygonAddress =
  require('@pooltogether/v4-mainnet/deployments/polygon/DrawBuffer.json').address;
const ethers = require('ethers');

async function getNewestDraw(chainId) {
  let drawBufferAddress = '';
  let providerUrl = '';

  if (chainId == '1') {
    drawBufferAddress = drawBufferMainnetAddress;
    providerUrl = process.env.ALCHEMY_MAINNET_URL;
  } else if (chainId == '137') {
    drawBufferAddress = drawBufferPolygonAddress;
    providerUrl = process.env.MATICVIGIL_URL;
  }

  if (drawBufferAddress == '' || providerUrl == '') {
    throw new Error('Chain ID not supported or drawBuffer address not found');
  }
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const drawBufferContract = new ethers.Contract(drawBufferAddress, drawBufferAbi, provider);

  const draw = await drawBufferContract.getNewestDraw();

  return draw.drawId;
}

module.exports = getNewestDraw;
