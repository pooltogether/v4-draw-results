const spawnCLIProcess = require('./spawnCLIProcess');
const checkIfCLIRunRequired = require('./helpers/checkIfCLIRunRequired');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');

const {
  MAINNET_USDC_TICKET_ADDRESS,
  POLYGON_USDC_TICKET_ADDRESS,
  AVALANCHE_USDC_TICKET_ADDRESS,
} = require('./constants');

const core = require('@actions/core');

async function run() {
  await runForChainId(1, MAINNET_USDC_TICKET_ADDRESS, 'mainnetCliToolRan', 'mainnetDrawId');
  await runForChainId(137, POLYGON_USDC_TICKET_ADDRESS, 'polygonCliToolRan', 'polygonDrawId');
  await runForChainId(
    43114,
    AVALANCHE_USDC_TICKET_ADDRESS,
    'avalancheCliToolRan',
    'avalancheDrawId',
  );
  console.log('Exit: 0');
  process.exit(0);
}
run();

async function runForChainId(chainId, ticket, chainIdRunBoolean, chainIdDrawIdMsg) {
  const path = './api/prizes';

  let runRequired;
  try {
    runRequired = await checkIfCLIRunRequired(chainId, ticket)
    if (true) {
      const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
      const mostRecentCommitedDrawIdResult = findMostRecentDrawCommitedForChainId(chainId, ticket);
      const mostRecentCommitedDrawId = parseInt(mostRecentCommitedDrawIdResult);
  
      // need to run between these two draw Ids exclusive of the first - create a range
      const draws = Array.from(
        { length: newestPrizeDistributionDrawId - mostRecentCommitedDrawId },
        (v, k) => k + mostRecentCommitedDrawId + 1,
      );

      for (let drawId of draws) {
        console.log(`running CLI for chainId: ${chainId} and drawId ${drawId}`);
        await spawnCLIProcess(chainId, ticket, drawId, path);
      }
  
      core.setOutput(chainIdRunBoolean, 'true');
      core.setOutput(chainIdDrawIdMsg, JSON.stringify(draws));
    }
  } catch (error) {
    console.log('Error: ', error);
    switch (error.code) {
      // Exit Code 2: DO RETRY
      case 'PROVIDER_ERROR':
      case 'SUBGRAPH_ERROR':
        console.log('Exit: 2');
        process.exit(2)
      // Exit Code 9: DO NOT RETRY
      case 'NETWORK_ERROR':
      case 'CHAIN_ID_NOT_SUPPORTED':
          console.log('Exit: 9');
          process.exit(9)
      case 'UNEXPECTED_ERROR':
      default:
        console.log('Exit: 1');
        process.exit(1);
    }
  }

}
