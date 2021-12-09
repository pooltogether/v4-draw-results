const fetch = require('node-fetch');
const getDrawCount = require('./helperss/getDrawCount');
const {
  MAINNET_TICKET_ADDRESS,
  POLYGON_DRAW_BUFFER,
  POLYGON_TICKET_ADDRESS,
} = require('./constants');

const repoNamme = 'v4-draw-results-fork';

const url = `https://api.github.com/repos/pooltogether/${repoNamme}/dispatches`;

const chainIds = [1, 137];

const PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PAT;

// this script syncs a newly cloned repo with all the draws so far
async function sync() {
  const startDraw = 1;

  if (!PERSONAL_ACCESS_TOKEN) {
    throw new Error('GITHUB_PAT not set');
  }
  if (repoNamme == '') {
    throw new Error('Repository Name not set');
  }

  // get most recent draw
  const mostRecentDraw = getDrawCount('1'); // draw count should be the same for both chains
  console.log(`mostRecentDraw: ${mostRecentDraw}`);

  const draws = Array.from({ length: mostRecentDraw }, (v, k) => k + 1);
  console.log(draws);

  // fire mainnet requests
  draws.forEach(async (drawId) => {
    console.log(`Triggering workflow run for chainId: ${chainIds[0]}, drawId: ${drawId}`);
    const res = sendDispatchRequest(chainId[0], MAINNET_TICKET_ADDRESS, drawId);
    console.log(`Response Status: ${res}`);
    if (res !== 204) {
      throw new Error('Failed to trigger workflow run');
    }
  });

  // fire polygon requests
  draws.forEach(async (drawId) => {
    console.log(`Triggering workflow run for chainId: ${chainIds[1]}, drawId: ${drawId}`);
    sendDispatchRequest(chainIds[1], POLYGON_TICKET_ADDRESS, drawId);
    console.log(`Response Status: ${res}`);
    if (res !== 204) {
      throw new Error('Failed to trigger workflow run');
    }
  });
  console.log('Done!');
}
sync();

function sendDispatchRequest(chainId, ticket, drawId) {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/vnd.github.everest-preview+json',
      ContentType: 'application/json',
      Authorization: 'token' + ' ' + PERSONAL_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      event_type: 'webhook',
      client_payload: { drawId, chainId, ticket },
    }),
  });
  return response.status;
}
