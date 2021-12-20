const newestPrizeDistributionDrawId = 55;
const mostRecentCommitedDrawId = 50;

// create an array of numbers between mostRecetnCommitedDrawId and newestPrizeDistributionDrawId
const draws = Array.from(
  { length: newestPrizeDistributionDrawId - mostRecentCommitedDrawId + 1 },
  (v, k) => k + mostRecentCommitedDrawId,
);
console.log(draws);
