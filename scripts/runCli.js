const spawnCLIProcess = require('./spawnCLIProcess');
const checkIfRunCLIRequired = require('./helpers/checkIfRunCLIRequired');
const { MAINNET_TICKET_ADDRESS, POLYGON_TICKET_ADDRESS } = require('./constants');

const core = require('@actions/core');

async function run() {
  const path = './api/prizes';
  let chainId = 1;

  if (await checkIfRunCLIRequired(chainId)) {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    console.log(`running CLI for chainId: ${chainId} and drawId ${newestPrizeDistributionDrawId}`);
    await spawnCLIProcess(chainId, MAINNET_TICKET_ADDRESS, newestPrizeDistributionDrawId, path);

    core.setOutput('mainnetCliToolRan', 'true');
    core.setOutput('mainnetDrawId', newestPrizeDistributionDrawId);
    core.setOutput('mainnetChainId', chainId);
  }

  // now polygon
  chainId = 137;

  if (await checkIfRunCLIRequired(chainId)) {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    console.log(`running CLI for chainId: ${chainId} and drawId ${newestPrizeDistributionDrawId}`);
    await spawnCLIProcess(chainId, POLYGON_TICKET_ADDRESS, newestPrizeDistributionDrawId, path);

    core.setOutput('polygonCliToolRan', 'true');
    core.setOutput('polygonDrawId', newestPrizeDistributionDrawId);
    core.setOutput('polygonChainId', chainId);
  }

  // add other networks here

  console.log('done! exiting 0');
  process.exit(0);
}
run();
