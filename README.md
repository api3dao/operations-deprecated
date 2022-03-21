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
  - The files that must be supplied and/or edited will be:
    - `templates/*`
    - `beacons/*`
    - `ois/*`
      - Note that the above files can have any name initially as the validator will name them according to their
        `templateName`, `beaconName` and `oisTitle-oisVersion`.
    - `deployments/secrets.env`:
      - This is a boilerplate file, but it contains a programmatically generated HTTP gateway endpoint secret. Please
        retain this secret and post it to our `#operations-keys` Slack channel on successful deployment, along with
        `receipt.json`.
      - This secret should not be committed and will be expunged pre-commit.
    - Please reference the "Directory and file structure" section below for more information on these resources.
- `validate`: Validates and conforms the entire repository - any errors must be fixed prior to continuing.
- `create-config`: Creates a set of config files:
  - `config.json`: The Airnode config file, should not require editing.
  - `airkeeper.json`: The Airkeeper config file, should not require editing.
  - `secrets.env`: This file will need to be populated prior to executing the next step and ultimately deployment.
    - The file will require an HTTP gateway secret, this secret will be generated and populated in the next deployment
      step on the API provider's machine.
    - Important: Once the deployment is complete, the HTTP Gateway key, along with the `receipt.json` file must be
      posted to the `#operations-keys` channel on our Slack workspace.
  - The above files will be validated by their respective validators. Be sure to fix any errors output.

Once you have populated the config files, avoiding populating them with any secrets:

- `git checkout -b ...`: Create a new descriptively-named branch, eg. "nasa-deployment" and push the branch to the
  operations repository.

### Deployment at the client's premises:

- Clone the repository and switch to the earlier-created branch
- Ask the API provider to run the following command: `generate-gateway-key`
  - This will generate the HTTP Gateway key
  - It will print the key to the terminal.
  - It will also write the key into `secrets.env`
  - You must note this key for later posting to our Slack channel. It must not be committed to this repository.
- Guide the API provider through populating the rest of the `secrets.env` file.
- Deploy Airnode and AirKeeper with the following command: `deploy-all`
- Be sure to retain a copy of `receipt.json`.
- Thank the API provider for being part of the API3 ecosystem.
- Post `receipt.json` and the HTTP gateway key to out Slack channel: `#operations-keys`
  - The key can be included anywhere in the message, but not in the attached `receipt.json`.

### Back on your development machine:

- `import-receipt`: Imports the API provider's `receipt.json` file.
  - Place the API provider's `receipt.json` into the `/import` folder and then run this command.
  - This adds the metadata in `receipt.json` into the `apiMetadata.json` file.

Once the above steps have been followed, commit, push and create a PR. The CI system will conduct various tests. Once
these tests have passed and you receive approval (as enforced by Github) you will then be able to merge your new
deployment to main. The telemetry apps will begin collecting data from your new deployment immediately.

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

#### Documentation

`/data/documentation.json`

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

### APIs

`/data/apis/{apiName}`

Hosts one directory per API, where the directory name is the API Name.

Hosts API integration, deployment and service-related data about a specific API. The contents of this directory should
refer to the first-party deployment, i.e., do not push your third-party deployment data here.

#### API Metadata

`/data/apis/{apiName}/apiMetadata.json`

A JSON file that contains metadata related to the API provider:

- `active`: If the latest deployment under `/data/apis/{oisTitle}/deployments` is active
- `contact`: Contact information of the API provider, specifically related to Airnode operation
- `airnode`: Airnode address
- `xpub`: Extended public key of the Airnode wallet
- `httpEndpoint`: The URL of the HTTP gateway associated with this deployment

#### OIS

`/data/apis/{apiName}/ois`

Hosts JSON files that contain OIS iterations. Each OIS must be versioned according to [semver](https://semver.org/) and
both the oisTitle and version will be used in the file name. The file will be renamed programmatically on validation of
this repository.

**The OIS title of an API is immutable.**

#### Deployments

`/data/apis/{apiName}/deployments`

- Generated by `generate-deployment-payload`, can be manually edited.

Directories that contain the files used for individual deployments. Each of these directories are named with the
deployment date as `YYYY-MM-DD`, based on when `generate-deployment-payload` was run. If more than one deployment was
done in a day, only include the latest one.

Example `secrets.env.example` and `aws.env.example` files are generated for convenience. Populated versions of these
files will be required for deployment. The populated files (which will contain secrets) should not be included in this
repository.

#### Templates

`/data/apis/{apiName}/templates`

- Initialised during creation of the boilerplate and is manually populated.
- Files can be named arbitrarily as they are renamed according to the `templateName` on `validate`.

Files containing template data and metadata. The files are named to describe what the template is for so that they are
human-browsable. The files contents are:

- `templateId`: Template ID
  - To auto-generate templateIds and set them in the template files, run `yarn derive-template-ids`
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
