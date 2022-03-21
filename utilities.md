## Utilities

Utilities rely on `yarn` and various dependencies and therefore these should be installed before utilising any utilities
with the command `yarn install`. The following utilities, in deployment order, are available:

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
