# @api3/operations

> A package that houses data and utilities required for API3 operations

**Although this repo is private, do not push sensitive data to it.**

## `/data`

Static data that other applications (e.g., monitoring and visualization services) may need to know about, including:

- Chain integrations
- API integrations
  - OIS
  - Deployment files
- Templates
- Beacons

## `/data/chains.json`

A JSON file that contains data related to the chains. These chains will not necessarily have official support. Each
chain has the following specified:

- `AccessControlRegistry`: AccessControlRegistry contract address
- `AirnodeRrp`: AirnodeRrp contract address
- `RrpBeaconServer`: RrpBeaconServer contract address

## `/data/apis`

Hosts one directory per API, where the directory name is the OIS title.

**The OIS title of an API is immutable.**

### `/data/apis/{oisTitle}`

Hosts API integration, deployment and service-related data about a specific API. The contents of this directory should
refer to the first-party deployment, i.e., do not push your third-party deployment data here. If you really have to, you
can create a separate directory (e.g., `/data/apis/test-{oisTitle}`).

**All files merged to `main` must have been reviewed and tested.**

#### `/data/apis/{oisTitle}/apiMetadata.json`

A JSON file that contains metadata related to the API provider:

- `active`: If the latest deployment under `/data/apis/{oisTitle}/deployments` is active
- `airnode`: Airnode address
- `xpub`: Extended public key of the Airnode wallet
- `contact`: Contact information of the API provider, specifically related to Airnode operation

#### `/data/apis/{oisTitle}/ois`

Hosts JSON files that contain OIS iterations. Each OIS must be versioned according to [semver](https://semver.org/) and
the version will be used in the file name.

#### `/data/apis/{oisTitle}/deployments`

Hosts directories that contain the files used for individual deployments. Each of these directories are named with the
deployment date as `YYYY-MM-DD`. If more than one deployment was done in a day, only push the latest one.

Each of the directories only include the contents of the zip file that is sent to the API provider for deployment. Make
sure to sanitize `aws.env` and `secrets.env` files of all sensitive data, and update their extension to be
`.env.example`.

### `/data/apis/{oisTitle}/templates`

Hosts files containing template data and metadata. The files are named to describe what the template is for so that they
are human-browseable. The files contents are:

- `airnode`: Airnode address (must match the one in `apiMetadata.json`)
- `endpointId`: Endpoint ID (must match one from `config.json`)
- `parameters`: Airnode ABI-encoded parameters
- `templateId`: Template ID (must match `airnode`, `endpointId`, `parameters` encoded and hashed)
- `decodedParameters`: `parameters` decoded to be human-readable
- `chains`: Chains that the template is currently deployed on (must match ones from `chains.json`)

### `/data/apis/{oisTitle}/beacons`

Hosts files containing beacon data and metadata. The files are named to describe what the beacon is for so that they are
human-browseable.

- `templateId`: Template ID (must match one from `/data/apis/{oisTitle}/templates`)
- `parameters`: Airnode ABI-encoded parameters to extend the ones defined by the template
- `beaconId`: Beacon ID (must match `templateId`, `parameters` encoded and hashed)
- `decodedParameters`: `parameters` decoded to be human-readable
- `chains`: Chains that the beacon is currently operational on (must match ones from `chains.json`)
- `apiProviderAirkeeperDeviationPercentage`: Deviation percentage to be used by the API provider-operated Airkeeper
- `api3AirkeeperDeviationPercentage`: Deviation percentage to be used by the API3-operated Airkeeper
- `sponsor`: Sponsor address that will be used while requesting an update (sponsor wallet to be derived from the API
  provider `xpub`). Both the API provider-operated and the API3-operated Airkeepers use the same `sponsor`.
- `apiProviderAirkeeperSponsor`: Airkeeper sponsor address that will be used by the API provider-operated Airkeeper to
  keep the beacon (sponsor wallet to be derived from `xpub` in `apiMetadata.json`)
- `api3AirkeeperSponsor`: Airkeeper sponsor address that will be used by the API3-operated Airkeeper to keep the beacon
  (sponsor wallet to be derived from `xpub` in `api3Metadata.json`)
