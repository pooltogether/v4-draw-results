async function getProviderForNetwork(chainId) {
  let providerUrl = '';

  if (chainId == '1') {
    providerUrl = process.env.ALCHEMY_MAINNET_URL;
  } else if (chainId == '137') {
    providerUrl = process.env.MATICVIGIL_URL;
  } else if (chainId == '43114') {
    providerUrl = process.env.AVALANCHE_URL;
  }

  if (providerUrl == '') {
    throw new Error('Chain ID not supported');
  }
  return providerUrl;
}
module.exports = getProviderForNetwork;
