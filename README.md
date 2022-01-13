<p align="center">
  <a href="https://github.com/pooltogether/pooltogether--brand-assets">
    <img src="https://github.com/pooltogether/pooltogether--brand-assets/blob/977e03604c49c63314450b5d432fe57d34747c66/logo/pooltogether-logo--purple-gradient.png?raw=true" alt="PoolTogether Brand" style="max-width:100%;" width="400">
  </a>
</p>

<br />

# V4 Draw Results

![Draw Calculator CLI](https://github.com/pooltogether/v4-draw-results/actions/workflows/cron.yml/badge.svg)
![Unit Tests](https://github.com/pooltogether/v4-draw-results/actions/workflows/unit_test.yaml/badge.svg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/27b08c1f-abf1-4e39-ba86-60bd8584302d/deploy-status)](https://app.netlify.com/sites/eager-fermat-3a8c47/deploys)

## Description

This repository serves as a layer above the [draw-calculator-cli](https://github.com/pooltogether/draw-calculator-cli) and stores the result of draw calculator CLI runs.

The draw calculator CLI is instantiated periodically from the [cron workflow](./.github/workflows/cron.yml). This workflow checks if the most recent `drawId` for a network is greater than the last committed `drawId`, and if so, runs the [draw-calculator-cli](https://github.com/pooltogether/draw-calculator-cli).

This data serves as the data source for the hosted [Netlify API](https://api.pooltogether.com/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw/12/prizes.json). More information on how to use this API can be found [here](https://v4.docs.pooltogether.com/prize-api).

## Setup

### Prerequisites

This repository can be cloned/forked and the data reproduced or continued.

You'll need to add the following secrets to the repository (under Settings/Secrets -> Repository Secrets):

| Secret              | Value/Description |
| ------------------- | ----------------- |
| ALCHEMY_MAINNET_URL | Mainnet RPC URL   |
| MATICVIGIL_URL      | Polygon RPC URL   |
| AVALANCHE_URL       | Avalanche RPC URL |

### Forking Steps

1. Clone/fork this repository to your repository of choice.
1. Add the environmental secrets to your Github repo as shown above.
1. Enable Github Actions in your repository if you have not done so already.
1. To continue fowards with all existing data, commit and push to remote origin. This will trigger a workflow run. This run will inspect the last commited drawId and make RPC calls to see what the most recent draw was on each network. The draw calculator cli will be run for each `drawId` which has not been committed.

## Adding a new Prize Pool

After following the appropriate steps to [add the prize pool](https://github.com/pooltogether/draw-calculator-cli#adding-a-new-prize-pool) to the [draw-calculator-cli package](https://github.com/pooltogether/draw-calculator-cli), do the following:

1. Add the `prize distributor` and `ticket` addresses (**in lowercase**) associated with the new prize pool [here](./scripts/constants.js)
1. Add logic to check if the CLI tool needs to be run [here](./scripts/runCLI.js). For example:

```js
await runForChainId(NETWORK_CHAINID, NEW_TICKET_ADDRESS, "newPrizePool", "newPrizePool");
```

1. Add the `prize distributor` address lookup logic [here](./scripts/helpers/getPrizeDistributorAddress.js)

1. Add a workflow step to commit prize files if they were created. For example:

```yaml
- name: Commit files for [newPrizePool]
  if: steps.runDrawCalcCLI.outputs.[newPrizePool]CliToolRan == 'true'
  run: |
    git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
    git config --local user.name "github-actions[bot]"
    git pull
    git add ./api/prizes/[newPrizePoolChainId]/
    git commit -m "Add draw for [newPrizePool] draw ${{steps.runDrawCalcCLI.outputs.[newPrizePool]DrawId}}"
```

1. Create the file directory for the new network (as per Data Structure section below) with an empty `.gitkeep` for the `drawId` _BEFORE_ the genesis drawId for that network. For example: the genesis `drawId` for the Avalanche network was 67, populate `api/prizes/43114/0x83332f908f403ce795d90f677ce3f382fe73f3d1/66` with a `.gitkeep` file. This is required since the script which checks if a draw-calculator-cli requires a starting point.
1. Commit and push changes. Inspect the workflow run console.

## Adding a new Network

After following the appropriate steps to [add the network](https://github.com/pooltogether/draw-calculator-cli#adding-a-new-network) to the [draw-calculator-cli package](https://github.com/pooltogether/draw-calculator-cli), do the following:

1. Add the new network RPC endpoint URL to the repo secrets as described above.
1. Add this under the `env` section in the [workflow cron.yaml "Run Draw Calculator CLI (if required)"]("./.github/workflows/cron.yaml") step alongside the other env variables. This makes the secret available to the NodeJS program as it runs.
1. Follow the instructions for adding a [prize pool](#adding-a-new-prize-pool)

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
        └───43114 (chainId for avalanche)
            └─── 0x83332f908f403ce795d90f677ce3f382fe73f3d1 (Prize Distributor address)
            │           └─── draw
            │                └─── 67
            │                     │    0xa123..json
            │                     │    0xa124..json
            │                     │    ...
            │                     │    prizes.json
            │                     │    status.json
            |
            │                └─── 68
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

### Examples

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

## Testing

There are unit tests (which run in a seperate `unit_test.yaml`) workflow. These also require the RPC URL's to be added as env secrets.
