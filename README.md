<p align="center">
  <a href="https://github.com/pooltogether/pooltogether--brand-assets">
    <img src="https://github.com/pooltogether/pooltogether--brand-assets/blob/977e03604c49c63314450b5d432fe57d34747c66/logo/pooltogether-logo--purple-gradient.png?raw=true" alt="PoolTogether Brand" style="max-width:100%;" width="400">
  </a>
</p>

<br />

# V4 Draw Results

![Draw Calculator CLI](https://github.com/pooltogether/v4-draw-results/actions/workflows/cron.yml/badge.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/27b08c1f-abf1-4e39-ba86-60bd8584302d/deploy-status)](https://app.netlify.com/sites/eager-fermat-3a8c47/deploys)

## Description

This is where the results of the [draw-calculator-cli](https://github.com/pooltogether/draw-calculator-cli) are stored.

The draw calculator CLI is instantiated periodically from the [cron workflow](./.github/workfdlowcron.yml). This workflow checks if the most recent `drawId` for a network is greater than the last committed draw, and if so, runs the [draw-calculator-cli](https://github.com/pooltogether/draw-calculator-cli).

This data serves as the data source for the hosted [Netlify API](https://api.pooltogether.com/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw/12/prizes.json). More information on how to use this API can be found [here](https://v4.docs.pooltogether.com/prize-api).

## Setup

### Prerequisites

This repository can be cloned/forked and the data reproduced or continued.

You'll need to add the following secrets to the repository (under settings/Secrets -> Repository Secrets):

| Secret              | Value/Description |
| ------------------- | ----------------- |
| ALCHEMY_MAINNET_URL | Mainnet RPC URL   |
| ALCHEMY_RINKEBY_URL | Rinkeby RPC URL   |
| MATICVIGIL_URL      | Polygon RPC URL   |
| MUMBAI_URL          | Mumbai RPC URL    |
| AVALANCHE_URL       | Avalanche RPC URL |

### Steps

1. Add the environmental secrets to your Github repo as shown above.
1. Add the environmental variables to the `.envrc` as shown in the `.envrc.example`.
1. Install the repo using `yarn`.
1. Enable Github Actions if you have not done so already.

### Adding a new network

After following the appropriate steps to add the network to the draw-calculator-cli, do the following:

1. Add the new network RPC endpoint URL to the repo secrets.
1. Add this under the `env` section in the [workflow cron.yaml "Run Draw Calculator CLI (if required)"]("./.github/cron.yaml") step alongside the other env variables. This makes the secret available to the workflow as it runs.
1. Add a workflow step to commit prize files if they were created.
1. Add logic to check if the CLI tool needs to be run [here]("./scripts/runCLI.js").
1. Create the file directory for the new network (as below) with an empty `.gitkeep` for the `drawId` _BEFORE_ the genesis drawId for that network. For example: the genesis `drawId` for the Avalanche network was 67, populate `api/prizes/43114/0x83332f908f403ce795d90f677ce3f382fe73f3d1/66` with a `.gitkeep` file. This is required since the script which checks if a draw-calculator-cli requires a starting point.

## Data Structure

The generated file structure is:

```
v4-draw-results
│   README.md
│   package.json
│   ...
└───api
    └───prizes
        └───1 (chainId for mainnet)
            │    └─── 0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe (Prize Distributor address)
            │           └─── draw
            │                └─── 1
            │                     │   0xa123..json
            │                     │   0xa124..json
            │                     │   ...
            │                     │   prizes.json
            │                     │   status.json
            |
            │                └─── 2
            │               ...
        └───137 (chainId for polygon)
            └─── 0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056 (Prize Distributor address)
            │           └─── draw
            │                └─── 1
            │                     │    0xa123..json
            │                     │    0xa124..json
            │                     │    ...
            │                     │    prizes.json
            │                     │    status.json
            |
            │                └─── 2
            │           ...

```

| File         | Description                                          |
| ------------ | ---------------------------------------------------- |
| 0xa123..json | Data for a winning address for a draw                |
| prizes.json  | Index file including all winners for draw            |
| status.json  | Metadata about the CLI run (status and time elapsed) |

Where `prizes.json` is an index of all the individual address files and `status.json` includes .

The file structure is according to Prize Distributor address (not by Ticket) is because a Ticket can mave multiple associated Prize Distributors.
**NOTE** : The use of lower case strings for addresses.

## Examples

For example:

1. `./api/prizes/1/0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe/draw/1/prizes.json`
   will display all prizes for chainId = 1 (Ethereum Mainnet) for Prize Distributor (address: `0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe`) for draw 1.

   This is also viewable at the [Netlify API](https://api.pooltogether.com/prizes/1/0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe/draw/1/prizes.json).

1. `./api/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw/12/prizes.json`
   will display all prizes for chainId = 137 (Polygon/Matic) for Prize Distributor (address: `0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056`) for draw 12.

   This is also viewable at the [Netlify API](https://api.pooltogether.com/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw/12/prizes.json).

1. `./api/prizes/43114/0x83332f908f403ce795d90f677ce3f382fe73f3d1/draw/70/prizes.json`
   will display all prizes for chainId = 43114 (Avalanche) for Prize Distributor (address: `0x83332f908f403ce795d90f677ce3f382fe73f3d1`) for draw 70.

   This is also viewable at the [Netlify API](https://api.pooltogether.com/prizes/43114/0x83332f908f403ce795d90f677ce3f382fe73f3d1/draw/70/prizes.json).
