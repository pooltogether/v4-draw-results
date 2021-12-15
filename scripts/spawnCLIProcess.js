const spawn = require('child_process').spawn;

async function spawnCLIProcess(chainId, ticket, drawId, directory) {
  console.log('spawning node process');
  const child = spawn(
    'node',
    [
      './node_modules/@pooltogether/draw-calculator-cli/dist/index.js',
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
  // use child.stdout.setEncoding('utf8'); if you want text chunks
  child.stdout.on('data', (chunk) => {
    // data from standard output is here as buffers
    console.log(chunk.toString());
  });
  child.stderr.on('data', (chunk) => {
    // data from standard output is here as buffers
    console.log(chunk.toString());
  });

  await new Promise((resolve) => {
    child.on('close', resolve);
  });
}
module.exports = spawnCLIProcess;
