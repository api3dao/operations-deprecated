# api3/operations/src

> A directory that contains the scripts used to validate, normalize, write and manipulate operations data.

For development usage refer to the [development usage guide](../DEVELOPMENT_USAGE.md)

# Directory and file structure

`/src` houses scripts in the following directory structure:

## deployment

scripts that deal with creating the configs and deployment for airnode, airkeeper, airseeker

### create-airseeker-config

- Creates the airseeker configuration file for the deployment

### create-boilerplate:

- Creates the boilerplate directory for the API provider

### create-config:

- Creates the configuration files for the airnode and airkeeper deployments in `operations/src/deployment`

### deploy-airkeeper:

- Deploys an airkeeper deployment specified by `operations/src/deployment/airkeeper/<DEPLOYMENT_DATE>`

### deploy-airnode:

- Deploys an airnode deployment specified by the `operations/src/deployment/airnode/<DEPLOYMENT_DATE>`

### remove-airnode:

- Removes an airnode deployment specified by the `operations/src/deployment/airnode/<DEPLOYMENT_DATE>`

### test-deployment:

- Tests the deployment specified by the `operations/src/deployment/airnode/<DEPLOYMENT_DATE>`

## explorer

scripts that perform operations on the api3 explorer content

### add-missing-beacon-metadata

- used to add missing beacon metadata to the explorer

## inspect

scripts that inspect/check the information in operations with on-chain values

### check-dapi-name

- used to check if the dapi name is registered on chain (DapiServer.sol)

### check-policy-readers

- used to check if the policy readers are correctly registered on chain (DapiServer.sol)

### check-subscriptions

- used to check if the beacon subscriptions are registered on chain (DapiServer.sol)

## register

scripts used to perform on-chain transactions

### enable-policy-readers

- used to enable the policy readers on chain by extending the whitelisting expiration of the readers address on chain (DapiServer.sol)

### register-subscriptions

- used to register the beacon subscriptions on chain (DapiServer.sol)

## utils

contians read, write, import, export, cli and evm scripts

## validation

scripts that validate and normalize operations data
