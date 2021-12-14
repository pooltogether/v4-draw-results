const findMostRecentDrawCommitedForChainId = require('./helpers/findMostRecentDrawCommitedForChainId');
const getNewestPrizeDistribution = require('./helpers/getNewestPrizeDistribution');
const spawnCLIProcess = require('./spawnCLIProcess');

async function run() {
  let chainId = 1;
  console.log(`checking if draw calculator CLI needs to be run for chainId: ${chainId}`);
  if (await checkIfRunRequired(chainId));
  {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    console.log(`running CLI for chainId: ${chainId} and drawId ${newestPrizeDistributionDrawId}`);

    await spawnCLIProcess(
      chainId,
      '0xdd4d117723C257CEe402285D3aCF218E9A8236E1',
      newestPrizeDistributionDrawId,
      './api/prizes',
    );
  }

  // now polygon
  chainId = 137;
  console.log(`checking if draw calculator CLI needs to be run for chainId: ${chainId}`);
  if (await checkIfRunRequired(chainId));
  {
    const newestPrizeDistributionDrawId = (await getNewestPrizeDistribution(chainId)).drawId;
    console.log(`running CLI for chainId: ${chainId} and drawId ${newestPrizeDistributionDrawId}`);

    await spawnCLIProcess(
      chainId,
      '0x6a304dFdb9f808741244b6bfEe65ca7B3b3A6076',
      newestPrizeDistributionDrawId,
      './api/prizes',
    );
  }
}
run();

async function checkIfRunRequired(chainId) {
  const mostRecentCommit = findMostRecentDrawCommitedForChainId(chainId);
  const newestPrizeDistribution = await getNewestPrizeDistribution(chainId);
  return mostRecentCommit != newestPrizeDistribution.drawId;
}
