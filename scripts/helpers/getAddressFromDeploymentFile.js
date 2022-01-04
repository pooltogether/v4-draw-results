import { readFileSync } from 'fs';

export function getAddressFromDeploymentFile(chainId, contractName): string {
  let mainnetOrTestnet;
  let networkName;
  if (chainId == '1') {
    mainnetOrTestnet = 'v4-mainnet';
    networkName = 'mainnet';
  } else if (chainId == '137') {
    mainnetOrTestnet = 'v4-mainnet';
    networkName = 'polygon';
  } else if (chainId == '4') {
    mainnetOrTestnet = 'v4-testnet';
    networkName = 'rinkeby';
  } else if (chainId == '80001') {
    mainnetOrTestnet = 'v4-testnet';
    networkName = 'mumbai';
  } else if (chainId == '43114') {
    mainnetOrTestnet = 'v4-mainnet';
    networkName = 'avalanche';
  } else {
    throw new Error(
      `Cannot find deployment file for contract ${contractName} on network: ${networkName}`,
    );
  }

  let path = `node_modules/@pooltogether/${mainnetOrTestnet}/deployments/${networkName}/${contractName}.json`;

  return JSON.parse(readFileSync(path, { encoding: 'utf-8' })).address.toLowerCase();
}
