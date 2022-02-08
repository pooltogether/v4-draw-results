const spawn = require('cross-spawn');

async function spawnCLIProcess(chainId, ticket, drawId, directory) {
  console.log('spawning node process');
  console.log(__dirname, 'dirrr')
  const child = spawn(
    'node',
    [ 
      './node_modules/.bin/ptv4',
      'compute',
      'allDrawPrizes',
      '-c',
      chainId,
      '-t',
      ticket,
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
