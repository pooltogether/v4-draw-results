const drawRangeStart = '67'.toNumber();
const drawRangeEnd = '55'.toNumber();
const draws = Array.from({ length: drawRangeStart - drawRangeEnd }, (v, k) => k + drawRangeEnd + 1);
console.log(draws);
