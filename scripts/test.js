const spawnCLIProcess = require('./spawnCLIProcess');

async function f() {
  await spawnCLIProcess(1, '0xdd4d117723C257CEe402285D3aCF218E9A8236E1', 8, './results');
  console.log('done');
}
f();
