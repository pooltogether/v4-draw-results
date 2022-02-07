const cp = require('child_process');
const spawn = require('child_process').spawn;

async function spawnCLIProcess(chainId, ticket, drawId, directory) {
  const child = spawn(
    'node',
    [ 
      './node_modules/@pooltogether/v4-cli/dist/index.js',
      '-c',
      chainId,
      '-t',
      ticket,
      '-d',
      drawId,
      '-o',
      directory,
    ],
    { cwd: process.cwd() },
  );

  child.stdout.pipe(process.stdout)

  child.stdout.on('close', (error) => {
    console.log('close', error);
  });

  child.stdout.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  child.stderr.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  await new Promise((resolve) => {
    child.on('close', resolve);
  });
}
module.exports = spawnCLIProcess;
