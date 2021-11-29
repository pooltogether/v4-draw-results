<p align="center">
  <a href="https://github.com/pooltogether/pooltogether--brand-assets">
    <img src="https://github.com/pooltogether/pooltogether--brand-assets/blob/977e03604c49c63314450b5d432fe57d34747c66/logo/pooltogether-logo--purple-gradient.png?raw=true" alt="PoolTogether Brand" style="max-width:100%;" width="400">
  </a>
</p>

<br />

# v4-draw-results

This is where the results of a [draw-calculator-cli](https://github.com/pooltogether/draw-calculator-cli) run triggered by Defender lives.

Also serves as the data source for the Netlify API.

The structure is `./chainId/<prizeDistributorAddress>/draw<drawId>/*.json`

The file structure is according to Prize Distributor address (not by Ticket) is because a Ticket can mave multiple associated Prize Distributors.
NOTE: The use of lower case strings for addresses.

For example:

1. `./1/0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe/draw1/prizes.json`
   will display all prizes for chainId = 1 (Ethereum Mainnet) for Prize Distributor (address: 0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe) for draw 1.

1. `./137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw12/prizes.json`
   will display all prizes for chainId = 137 (Polygon/Matic) for Prize Distributor (address: 0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056) for draw 12.
