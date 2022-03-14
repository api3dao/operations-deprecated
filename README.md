# @api3/operations

> A package that houses data and utilities required for API3 operations

## `/data`

Static data that other applications (e.g., monitoring and visualization services) may need to know about, including:

- Chain integrations
- API integrations
  - OIS
  - Deployment files
- Templates
- Beacons

Subdirectories represent different protocols, namely : `rrp-psp` and `proto-psp`

## Common files

#### `/data/chains.json`

A JSON file that contains data related to operational chains. These chains will not necessarily have official support.
Each chain's contracts are versioned. Contract deployments have the following specified at minimum:

- `AccessControlRegistry`: AccessControlRegistry contract address
- `AirnodeRrp`: AirnodeRrp contract address

and optionally:

- `RrpBeaconServer`: RrpBeaconServer contract address
- `DapiServer`: The DapiServer contract address

### `/data/api3Metadata.json`

A file containing metadata related to api3 operations around an on-chain resource, mostly used for backup services.

### `/data/documentationMetadata.json`

Contains documentation-appropriate metadata for on-chain services.

### `/data/{protocol}/{oisTitle}`

Hosts one directory per API, where the directory name is the OIS title.

**The OIS title of an API is immutable.**

Hosts API integration, deployment and service-related data about a specific API. The contents of this directory should
refer to the first-party deployment, i.e., do not push your third-party deployment data here. If you really have to, you
can create a separate directory (e.g., `/data/apis/test-{oisTitle}`).

**All files merged to `main` must have been reviewed and tested.**

#### `/data/{protocol}/{oisTitle}/apiMetadata.json`

A JSON file that contains metadata related to the API provider:

- `active`: If the latest deployment under `/data/*/{oisTitle}/deployments` is active
- `airnode`: Airnode address
- `xpub`: Extended public key of the Airnode wallet
- `contact`: Contact information of the API provider, specifically related to Airnode operation

#### `/data/{protocol}/{oisTitle}/ois`

Hosts JSON files that contain OIS iterations. Each OIS must be versioned according to [semver](https://semver.org/) and
the version will be used in the file name.

#### `/data/{protocol}/{oisTitle}/deployments`

Hosts directories that contain the files used for individual deployments. Each of these directories are named with the
deployment date as `YYYY-MM-DD`. If more than one deployment was done in a day, only push the latest one.

Each of the directories only include the contents of the zip file that is sent to the API provider for deployment. Make
sure to sanitize `aws.env` and `secrets.env` files of all sensitive data, and update their extension to be
`.env.example`.

### `/data/{protocol/{oisTitle}/templates`

Hosts files containing template data and metadata. The files are named to describe what the template is for so that they
are human-browsable. The files contents are:

- `airnode`: Airnode address (must match the one in `apiMetadata.json`)
- `endpointId`: Endpoint ID (must match one from `config.json`)
- `parameters`: Airnode ABI-encoded parameters
- `templateId`: Template ID (must match `airnode`, `endpointId`, `parameters` encoded and hashed)
- `decodedParameters`: `parameters` decoded to be human-readable
- `versionedChains`: Chains that the template is currently deployed on (must match ones from `chains.json`), with
  deployment versioning.

---

### `/data/proto-psp/{oisTitle}/beacons`

Files containing subscription data and metadata. The files are named to describe what the subscription is for so that
they are human-browsable.

- `beaconId`: A subscription ID, eg. "0x168194af62ab1b621eff3be1df9646f198dcef36f9eace0474fd19d47b2e0039"
- `name`: A descriptive name for human reference, eg. "Coingecko USD/BTC"
- `description`: An extended description of the subscription, eg. "Price of BTC in USD"
- `airnodeAddress`: "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace"
- `templateId`: An associated template ID, eg. "0xea30f92923ece1a97af69d450a8418db31be5a26a886540a13c09c739ba8eaaa"
- `parameters`: Override parameters"0x"
- `conditions`: ABI Encoded condition inputs, eg. "0x316242..."
- `conditionsDescription`: A human-readable description of the `conditions` configuration directive
- `relayer`: The relayer address, eg. "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace"
- `sponsor`: The sponsor address, eg. "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
- `requester`: The requester address, eg. "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
- `fulfillFunctionId`: "0x206b48f4",
- `chains`: [...] Chains that the beacon is currently operational on
  - `namedVersion`: Name of the chain (must match one from `chains.json`) (from `chains.json`, eg. `["ropsten", "v1"]`)
  - `topUpWallets`: [...]

---

### `/data/rrp-psp/{oisTitle}/beacons`

Files containing beacon data and metadata. The files are named to describe what the beacon is for so that they are
human-browsable.

- `templateId`: Template ID (must match one from `/data/apis/{oisTitle}/templates`)
- `name`: A human-readable name for the template, suitable for documentation use.
- `description`: A human-readable description for the template, suitable for documentation use (optional).
- `parameters`: Airnode ABI-encoded parameters to extend the ones defined by the template
- `beaconId`: Beacon ID (must match `templateId`, `parameters` encoded and hashed)
- `decodedParameters`: `parameters` decoded to be human-readable
- `chains`: Chains that the beacon is currently operational on
  - `namedVersion`: Name of the chain (must match one from `chains.json`)
  - `apiProviderAirkeeperDeviationPercentage`: Deviation percentage to be used by the API provider-operated Airkeeper
  - `api3AirkeeperDeviationPercentage`: Deviation percentage to be used by the API3-operated Airkeeper
  - `sponsor`: Sponsor address that will be used while requesting an update (sponsor wallet to be derived from the API
    provider `xpub`). Both the API provider-operated and the API3-operated Airkeepers use the same `sponsor`.
  - `apiProviderAirkeeperSponsor`: Airkeeper sponsor address that will be used by the API provider-operated Airkeeper to
    keep the beacon (sponsor wallet to be derived from `xpub` in `apiMetadata.json`)
  - `api3AirkeeperSponsor`: Airkeeper sponsor address that will be used by the API3-operated Airkeeper to keep the
    beacon (sponsor wallet to be derived from `xpub` in `api3Metadata.json`)
  - `apiProviderAirkeeperSponsorWalletBalanceAlertThreshold`: If the sponsor wallet used by the API provider-operated
    Airkeeper falls below this amount, an alert should be raised
    - `amount`: Balance amount in numbers
    - `units`: One of the [ETH units](https://docs.ethers.io/v5/api/utils/display-logic/#display-logic--named-units)
  - `api3AirkeeperSponsorWalletBalanceAlertThreshold`: If the sponsor wallet used by the API3-operated Airkeeper falls
    below this amount, an alert should be raised
    - `amount`: Balance amount in numbers
    - `units`: One of the [ETH units](https://docs.ethers.io/v5/api/utils/display-logic/#display-logic--named-units)
