const newestDrawId = 32;
const oldestDrawId = 1;

const draws = Array.from({ length: newestDrawId - oldestDrawId + 1 }, (v, k) => k + oldestDrawId);

console.log(draws);
