function getProviderForNetwork(chainId) {
  let providerUrl = '';

  if (chainId == '1') {
    providerUrl = process.env.ALCHEMY_MAINNET_URL;
  } else if (chainId == '137') {
    providerUrl = process.env.MATICVIGIL_URL;
  } else if (chainId == '43114') {
    providerUrl = process.env.AVALANCHE_URL;
  }

  if (providerUrl == '') {
    const e = new Error('Chain ID not supported');
    e.code = 'CHAIN_ID_NOT_SUPPORTED';
    throw e
  }
  return providerUrl;
}

module.exports = getProviderForNetwork;
