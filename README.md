# @api3/operations

> A package that houses data and utilities required for API3 operations

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

### APIs — `/data/apis`

`/data/apis` hosts one directory per API, where the directory name is the sanitized API Name.

#### API Metadata — `/data/apis/{sanitizedApiName}/apiMetadata.json`

A JSON file that contains metadata related to the API:

- `name`: API name (which the sanitized name will be derived from)
- `active`: If the latest deployment under `/data/apis/{sanitizedApiName}/deployments` is active
- `airnode`: Airnode address
- `xpub`: Extended public key of the Airnode wallet

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
- `decodedParameters`: `parameters` decoded to be human-readable for convenience, not to be used in production.

#### Beacons

`/data/apis/{apiName}/beacons`

- Initialised during creation of the boilerplate and is manually populated.
- Files can be named arbitrarily as they are renamed according to the `beaconName` on `validate`.

Files containing subscription data and metadata:

- `beaconId`: A Beacon ID, programmatically generated on validation, eg.
  "0x168194af62ab1b621eff3be1df9646f198dcef36f9eace0474fd19d47b2e0039"
  - To auto-generate beaconIds and set them in the these files, run `yarn derive-beacon-ids`
- `beaconName`: A descriptive name, eg. "CoinGecko USD/BTC"
  - This defaults to the source template's name.
- `beaconDescription`: An extended description of the beacon, eg. "Price of BTC in USD"
  - This defaults to the source template's description.
- `airnodeAddress`: The source Airnode's address, eg. "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace"
- `templateId`: An associated template ID, eg. "0xea30f92923ece1a97af69d450a8418db31be5a26a886540a13c09c739ba8eaaa"
- `updateConditionPercentage`: A number representing the deviation threshold percentage above which an update should
  occur, eg. 0.75 for 0.75%
  - This value will be used to generate a conditions object for services.
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
- `signedKeeperConditions`:
  - `deviationFactorThreshold`: The factor by which to multiply the provider's deviation threshold to calculate API3's
    `_conditionParameters`
  - `ttlMinutes`: The number of minutes that need to have elapsed since the on-chain value exceeded API3's
    updateCondition

## Utilities

This repository contains utilities that are used to create some of the contents in `/data`. You can see the instructions
for these [here](./utilities).