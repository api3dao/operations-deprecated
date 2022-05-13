# @api3/operations

> A package that houses data and utilities required for API3 operations

For development usage refer to the [development usage guide](DEVELOPMENT_USAGE.md)

## Branches and versioning

`main` represents the current state of the system. Deprecated versions are housed in individual branches. Deprecated
versions that are still supported are:

- `v0.1`: RrpBeaconServer-based Beacons

## Updates

1. Create new branch with the updates
2. Open PR to `main` (or to a deprecated version branch)
3. Have changes approved by reviewers
4. Apply changes if needed, e.g., have an API provider redeploy
5. Merge PR immediately after step 4

If an update has moved on to step 4, block all other updates from doing so until the PR is merged. This is to prevent
parallel updates from overwriting each other's changes.

## Directory and file structure

`/data` houses static data that other applications (e.g., monitoring and visualization services) may need to know about,
including:

- Chain integrations
- API integrations
  - OIS
  - Deployment files
  - Templates
  - Beacons
- Managed feeds
- Pricing parameters

### Chains — `/data/chains`

`/data/chains` contains JSON files storing per-chain metadata in the following format:

- `name`: The name of the chain
- `id`: The id of the chain, eg. "3" for Ropsten
- `contracts`: An object containing active protocol contracts on this chain, eg.
  - `DapiServer`: "0x000..."
- `nativeToken`: The native token symbol of the chain, eg. "ETH"
- `blockTime`: The average number of seconds between blocks
- `logoPath`: A URL or relative path to a logo for this chain

### APIs — `/data/apis`

`/data/apis` hosts one directory per API, where the directory name is the sanitized API Name.

#### API Metadata — `/data/apis/{sanitizedApiName}/apiMetadata.json`

A JSON file that contains metadata related to the API:

- `name`: API name that will be seen by the end-user (which the sanitized name will be derived from)
- `active`: If the latest deployment under `/data/apis/{sanitizedApiName}/deployments` is active
- `airnode`: Airnode address
- `xpub`: Extended public key of the Airnode wallet
- `logoPath`: a URL or relative path to a logo for this data provider

#### OIS — `/data/apis/{sanitizedApiName}/ois`

Hosts JSON files that contain OIS iterations. Each OIS must be versioned according to [semver](https://semver.org/) and
the file name will be `<oisTitle>_<version>.json`.

#### Deployments — `/data/apis/{sanitizedApiName}/deployments`

Directories that contain the files used for individual deployments. Each of these directories are named with the
deployment date as `YYYY-MM-DD`. If more than one deployment was done in a day, only include the latest one.

Example `secrets.env.example` and `aws.env.example` files are generated for convenience. Populated versions of these
files will be required for deployment. The populated files (which will contain secrets) should not be included in this
repository.

#### Templates — `/data/apis/{sanitizedApiName}/templates`

Files containing template data. The files are named as `/data/apis/{sanitizedApiName}/templates/{sanitizedTemplateName}`
to be human-browsable.

- `name`: Template name that will be seen by the end-user (which the sanitized name will be derived from)
- `templateId`: Template ID
- `endpointId`: Endpoint ID
- `parameters`: Airnode ABI-encoded parameters
- `decodedParameters`: `parameters` used to derive the Airnode ABI-encoded parameters, not used in production

#### Beacons — `/data/apis/{sanitizedApiName}/beacons`

Files containing Beacon data. The files are named as `/data/apis/{sanitizedApiName}/templates/{sanitiziedBeaconName}` to
be human-browsable.

- `name`: Beacon name that will be seen by the end-user (which the sanitized name will be derived from). Defaults to
  `"{API name} {Template name}"`
- `description`: An extended description of the beacon, eg. "Price of BTC in USD"
- `beaconId`: Beacon ID
- `airnodeAddress`: The source Airnode's address, eg. "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace"
- `templateId`: The associated template ID, eg. "0xea30f92923ece1a97af69d450a8418db31be5a26a886540a13c09c739ba8eaaa"
- `updateConditionPercentage`: A number representing the deviation threshold percentage above which an update should
  occur, eg. 0.75 for 0.75%
  - This value will be used to generate a conditions object for services.
- `chains`: Chains on which the beacon is operated in any point in time
  - `active`: If the beacon is being actively operated
  - `name`: Name of the chain (must match a chain with deployed contracts from the repository noted above), eg.
    "ropsten"
  - `sponsor`: The sponsor address, eg. "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  - `topUpWallets`: [...] An array of addresses to monitor and keep topped-up
    - `walletType`: The wallet type, either 'API3' or 'Provider'
    - `address`: The target address, eg. "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
- `airseekerConfig`:
  - `deviationThreshold`: API3's update condition threshold percentage, eg: 0.1 for 0.1%
  - `heartbeatInterval`: Time in seconds since the last update, past which an update will be forced
  - `updateInterval`: The interval in seconds between update condition evaluation

### Managed feeds — `/data/feeds`

_TODO_

### Pricing parameters

_TODO, possibly as additional fields under Beacon.chains and Feed.chains_

## Utilities

This repository contains utilities that are used to create some of the contents in `/data`. You can see the instructions
for these [here](./UTILITIES.MD).
