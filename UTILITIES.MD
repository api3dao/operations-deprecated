# Utilities

> Utilities for integrating and deploying Beacon systems

Before you begin, run `yarn install`.

## API integration

_TODO: `generate-deployment-payload`_

The following utilities, in deployment order, are available:

- `create-boilerplate`: Prompts for various API metadata and creates a set of folders with examples. These folders must
  be populated with real data and the example files removed prior to running the next step.
  - The files that must be supplied and/or edited will be:
    - `templates/*`
    - `beacons/*`
    - `ois/*`
      - Note that the above files can have any name initially as the validator will name them according to their
        `templateName`, `beaconName` and `oisTitle-oisVersion`.
    - `deployments/secrets.env`:
      - This is a boilerplate file which contains a programmatically generated HTTP gateway endpoint secret.
- `validate`: Validates and conforms the entire repository - any errors must be fixed prior to continuing.
- `create-config`: Creates a set of config files:
  - `config.json`: The Airnode config file, should not require editing.
  - `airkeeper.json`: The Airkeeper config file, should not require editing.
  - `secrets.env`: This file will need to be populated prior to executing the next step and ultimately deployment.
    - The file will require an HTTP gateway secret, this secret will be generated and populated in the next deployment
      step on the API provider's machine.
    - Important: Once the deployment is complete, copy and submit the `operations-export.secret` to the API3 secrets
      service.

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

## Documentation

`/data/documentation.json` is generated programmatically pre-commit by `export-documentation` and contains
documentation-appropriate metadata for live beacon services.

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
