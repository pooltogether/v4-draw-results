const fetch = require('node-fetch');
const getNewestDrawId = require('./helpers/getNewestDrawId');
const getOldestDrawId = require('./helpers/getOldestDrawId');
const { MAINNET_TICKET_ADDRESS, POLYGON_TICKET_ADDRESS } = require('./constants');

const repoNamme = 'v4-draw-results';
const url = `https://api.github.com/repos/aodhgan/${repoNamme}/dispatches`;
const chainIds = [1, 137];
const PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PAT;

// this script synchronizes a newly cloned repo with all the draws so far
async function sync() {
  if (!PERSONAL_ACCESS_TOKEN) {
    throw new Error('GITHUB_PAT not set');
  }
  if (repoNamme == '') {
    throw new Error('Repository Name not set');
  }

  const newestDrawId = await getNewestDrawId(1);
  const oldestDrawId = await getOldestDrawId(1);

  // create an array of drawIds between the oldest and newest draw
  const draws = Array.from({ length: newestDrawId - oldestDrawId + 1 }, (v, k) => k + oldestDrawId);

  // fire mainnet requests
  await sendRequestsForNetwork(1, MAINNET_TICKET_ADDRESS, draws);
  // fire polygon requests
  await sendRequestsForNetwork(137, POLYGON_TICKET_ADDRESS, draws);

  console.log('Done!');
}
sync();

async function sendRequestsForNetwork(chainId, ticket, draws) {
  draws.forEach(async (drawId) => {
    console.log(`Triggering workflow run for chainId: ${chainId}, drawId: ${drawId}`);
    const res = await sendDispatchRequest(chainId, ticket, drawId);
    console.log(`Response Status: ${res}`);
    if (res !== 204) {
      throw new Error(`Failed to trigger workflow run for draw ${drawId}`);
    }
  });
}

async function sendDispatchRequest(chainId, ticket, drawId) {
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
