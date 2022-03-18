# @api3/operations

> A package that houses data and utilities required for API3 operations

## Branches and versioning

The main branch of this repository will always represent our current working system reference. The main branch will be
used by all operational concerns except concerns that specifically reference a deprecated version of the repository.
Deprecated versions will be tagged as a specific version, eg. `v0.1`. Deprecated versions may be supported indefinitely.

Deprecated versions as of this commit:

- `v0.1`: RRP-based Beacons`

New deployments must follow the new `branch->PR (including CI status checks)->merge to main` process.

## Chain and contract deployment references

API3 operational services rely on various on-chain contracts. Deployments of these contracts are referenced by their
chain name in the
[API3 utility-contracts repository](https://github.com/api3dao/utility-contracts/tree/main/SelfServeRrpBeaconServerWhitelister/deployments).
Deployed contracts are versioned through their import in `package.json`, which can be any supported git reference.

---

## Integrating a new API

This repository contains utilities for generating and integrating new APIs. Utilities rely on `yarn` and various
dependencies and therefore these should be installed before utilising any utilities with the command `yarn install`.

Utilities take the form of interactive CLI applications. The following utilities, in deployment order, are available:

- `create-boilerplate`: Prompts for various API metadata and creates a set of folders with examples. These folders must
  be populated with real data and the example files removed prior to running the next step.
  - The files that must be supplied will be:
    - `templates/*`
    - `beacons/*`
    - `{oisTitle}/*`
    - Note that the above files can have any name initially as the validator will name them according to their
      `templateName`, `beaconName` and `oisTitle`.
- `validate`: Validates and conforms the entire repository - any errors must be fixed prior to continuing.
- `generate-deployment-payload`: Generates a `deploy.zip` file and places it in `/export`.
  - This file contains everything the target API provider needs to conduct a deployment.
  - The zip file will contain an Airnode and Airkeeper config file.
  - The API provider will still need a funded mnemonic, AWS account and a working installation of docker in order to do
    the actual deployment.
  - Be sure to ask for the `receipt.json` file after deployment is complete, as this will be required for the next step.
- `import-receipt`: Imports the API provider's `receipt.json` file.
  - Place the API provider's `receipt.json` into the `/import` folder and then run this command.
  - This adds the metadata in `receipt.json` into the `apiMetadata.json` file.
  - Additionally, `receipt.json` must be emailed to `receipts@api3.org` as the endpoint URL is sensitive data.

Once the above steps have been followed, checkout a new branch, eg. `git checkout -b nasa-deployment` Commit, push and
create a PR. The CI system will conduct various tests. Once these tests have passed and you receive approval (as
enforced by Github) you will then be able to merge your new deployment to main. The telemetry apps will begin collecting
data from your new deployment immediately.

---

## Directory and file structure

### `/data`

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

This is used by the API3 docs site and the Beacon Explorer (tentative name).

The file has the following structure:

- `beacons`: [...]
  - `beaconId`: The Beacon ID, a unique string that identifies this data feed, eg.
    "0x7c3e9a38a16439e9b3e77bfe742f6c10004c26beabfab70fd78e3cf062ed6256"
  - `beaconName`: A human-readable name, eg. "Ticker VWAP USD/BTC"
    - This is usually the same as the source template's name.
    - This should be formatted for public consumption.
  - `beaconDescription`: A human-readable description, eg. "A ticker feed for the global volume-weighted average price
    of the BTC/USD pair"
    - This is usually the same as the source template's description.
    - This should be formatted for public consumption.
  - `apiName`: The API Name of the deployment this data feed relies on, eg. "CoinGecko".
    - This should be formatted for public consumption; pay attention to capitalisation.
  - `templateId`: The ID of the template used to execute API calls that power this data feed
  - `chains`: An array of strings representing the names of chains on which this service runs. Chain names should
    reference the utility-contracts package, eg. "ropsten"
  - Optionally:
    - "templateName": If the template name and beacon name differ, this field will be populated.
    - "templateDescription": If the template description and beacon description differ, this field will be populated.

### `/data/apis/{oisTitle}`

Hosts one directory per API, where the directory name is the OIS title.

**The OIS title of an API is immutable.**

Hosts API integration, deployment and service-related data about a specific API. The contents of this directory should
refer to the first-party deployment, i.e., do not push your third-party deployment data here. If you really have to, you
can create a separate directory (e.g., `/data/apis/test-{oisTitle}`).

### `/data/apis/{oisTitle}/apiMetadata.json`

A JSON file that contains metadata related to the API provider:

- `active`: If the latest deployment under `/data/apis/{oisTitle}/deployments` is active
- `contact`: Contact information of the API provider, specifically related to Airnode operation
- `airnode`: Airnode address
- `xpub`: Extended public key of the Airnode wallet

### `/data/apis/{oisTitle}/ois`

Hosts JSON files that contain OIS iterations. Each OIS must be versioned according to [semver](https://semver.org/) and
the version will be used in the file name.

### `/data/apis/{oisTitle}/deployments`

Directories that contain the files used for individual deployments. Each of these directories are named with the
deployment date as `YYYY-MM-DD`. If more than one deployment was done in a day, only push the latest one.

Each of the directories only include the contents of the zip file that is sent to the API provider for deployment. Make
sure to sanitize `aws.env` and `secrets.env` files of all sensitive data, and update their extension to be
`.env.example`.

### `/data/{protocol/{oisTitle}/templates`

Files containing template data and metadata. The files are named to describe what the template is for so that they are
human-browsable. The files contents are:

- `templateId`: Template ID
- `templateName`: A human-readable name for the template.
  - In most cases this will inform the default name of the beacon that uses this template.
  - This name will be publicly displayed and should be both appropriate and honour branding capitalisation.
- `templateDescription`: As above, but a description
  - In most cases this will inform the default description of the beacon that uses this template.
  - This text will be publicly displayed; please take care.
- `endpointId`: Endpoint ID (must match one from the target Airnode's `config.json`).
- `templateParameters`: The Airnode ABI-encoded parameters.
- `decodedTemplateParameters`: `templateParameters` decoded to be human-readable for convenience, not to be used in
  production.

### `/data/{oisTitle}/beacons`

Files containing subscription data and metadata. The files are named to describe what the subscription is for so that
they are human-browsable.

- `beaconId`: A Beacon ID, eg. "0x168194af62ab1b621eff3be1df9646f198dcef36f9eace0474fd19d47b2e0039"
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
  - `conditions`: A human-readable condition object which will be used by API3 to determine whether a Beacon should be
    updated.
    - `description`: A human-readable string describing the conditions, eg. "Deviation greater than 5%"
    - `deviationFactorThreshold`: The factor by which to multiply the provider's deviation threshold to calculate API
    - `_conditionParameters`
