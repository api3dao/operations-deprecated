# @api3/operations

> A package that houses data and utilities required for API3 operations

## Branches, versioning and protocols

Operational service sets occupy different branches in this repository, keyed by their protocol:

- airnode
- airkeeper
- airseeker

Additionally, development branches of each of the above are present for testing, carrying the "-dev" postfix, eg.
"airnode-dev"

### Chain and contract deployment references

API3 services rely on various on-chain contracts. Deployments of these contracts are referenced by their chain name in
the `@api3/utility-contracts` [package](https://www.npmjs.com/package/@api3/utility-contracts), also available in the
repository
[here](https://github.com/api3dao/utility-contracts/tree/main/SelfServeRrpBeaconServerWhitelister/deployments).
`@api3/utility-contracts` is versioned through its import in `package.json`, which can be a tagged version or git
reference.

## `/data`

Static data that other applications (e.g., monitoring and visualization services) may need to know about, including:

- Chain integrations
- API integrations
  - OIS
  - Deployment files
- Templates
- Beacons

### `/data/documentation.json`

This file is generated programmatically pre-commit by `export-documentation` and contains documentation-appropriate
metadata for live beacon services.

This is used by the API3 docs site and the Beacon Explorer.

It has the following structure:

- `beacons`: [...]
  - `beaconId`: The Beacon ID, a unique string that identifies this data feed, eg.
    "0x7c3e9a38a16439e9b3e77bfe742f6c10004c26beabfab70fd78e3cf062ed6256"
  - `beaconName`: A human-readable name, eg. "Ticker VWAP USD/BTC"
  - `beaconDescription`: A human-readable description, eg. "A ticker feed for the global volume-weighted average price
    of the BTC/USD pair"
  - `oisTitle`: The oisTitle of the deployment this data feed relies on, eg. "CoinGecko"
  - `templateId`: The ID of the template used to execute API calls that feed this data feed
  - `decodedTemplateParameters`: An array of decoded template parameters
  - `chains`: An array of strings representing the names of chains on which this service runs. Chain names should
    reference the utility-contracts package, eg. "ropsten"

### `/data/apis/{oisTitle}`

Hosts one directory per API, where the directory name is the OIS title.

**The OIS title of an API is immutable.**

The OIS title will be displayed publicly and therefore should be correctly capitalised and appropriate, eg. "CoinGecko"
and "CoinMarketCap"

Hosts API integration, deployment and service-related data about a specific API. The contents of this directory should
refer to the first-party deployment, i.e., do not push your third-party deployment data here. If you really have to, you
can create a separate directory (e.g., `/data/apis/test-{oisTitle}`).

**All files merged to `main` must have been reviewed and tested.**

#### `/data/apis/{oisTitle}/apiMetadata.json`

A JSON file that contains metadata related to the API provider:

- `active`: If the latest deployment under `/data/apis/{oisTitle}/deployments` is active
- `contact`: Contact information of the API provider, specifically related to Airnode operation

#### `/data/apis/{oisTitle}/ois`

Hosts JSON files that contain OIS iterations. Each OIS must be versioned according to [semver](https://semver.org/) and
the version will be used in the file name.

#### `/data/apis/{oisTitle}/deployments`

Directories that contain the files used for individual deployments. Each of these directories are named with the
deployment date as `YYYY-MM-DD`. If more than one deployment was done in a day, only push the latest one.

Each of the directories only include the contents of the zip file that is sent to the API provider for deployment. Make
sure to sanitize `aws.env` and `secrets.env` files of all sensitive data, and update their extension to be
`.env.example`.

### `/data/{protocol/{oisTitle}/templates`

Files containing template data and metadata. The files are named to describe what the template is for so that they are
human-browsable. The files contents are:

- `templateId`: Template ID
- `templateName`: A human-readable name for the template, usually a copy of the name of the beacon that uses this
  template
- `templateDescription`: As above, but a description
- `endpointId`: Endpoint ID (must match one from `config.json`)
- `templateParameters`: Airnode ABI-encoded parameters
- `decodedTemplateParameters`: `parameters` decoded to be human-readable

### `/data/{oisTitle}/beacons`

Files containing subscription data and metadata. The files are named to describe what the subscription is for so that
they are human-browsable.

- `beaconId`: A Beacon ID, eg. "0x168194af62ab1b621eff3be1df9646f198dcef36f9eace0474fd19d47b2e0039"
- `beaconName`: A descriptive name, eg. "CoinGecko USD/BTC"
- `beaconDescription`: An extended description of the beacon, eg. "Price of BTC in USD"
- `airnodeAddress`: "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace"
- `templateId`: An associated template ID, eg. "0xea30f92923ece1a97af69d450a8418db31be5a26a886540a13c09c739ba8eaaa"
- `conditions`: ABI Encoded condition inputs, eg. "0x316242..."
- `conditionsDescription`: A human-readable description of the `conditions` configuration directive
- `relayer`: The relayer address, eg. "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace"
- `sponsor`: The sponsor address, eg. "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
- `requester`: The requester address, eg. "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
- `fulfillFunctionId`: The bytes4 fulfilment function ID, eg. "0x206b48f4"
- `chains`: [...] Chains that the beacon is currently operational on
  - `name`: Name of the chain (must match a chain with deployed contracts from the repository noted above), eg.
    "ropsten"
  - `topUpWallets`: [...] An array of addresses to monitor and keep topped-up
    - `walletType`: The wallet type, either 'API3' or 'Provider'
    - `address`: The target address, eg. "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
