# api3/operations/src

> A directory that contains the scripts used to validate, normalize, write and manipulate operations data.

For development usage refer to the [development usage guide](../DEVELOPMENT_USAGE.md)

# Directory and file structure

`/src` houses scripts in the following directory structure:

## market

scripts that perform operations on the api3 market content

### add-missing-beacon-metadata

- used to add missing beacon metadata to the explorer

## inspect

scripts that inspect/check the information in operations with on-chain values

### check-dapi-name

- used to check if the dapi name is registered on chain (DapiServer.sol)

### check-subscriptions

- used to check if the beacon subscriptions are registered on chain (DapiServer.sol)

## register

scripts used to perform on-chain transactions

### register-subscriptions

- used to register the beacon subscriptions on chain (DapiServer.sol)

## utils

contains read, write, import, export, cli and evm scripts

## validation

scripts that validate and normalize operations data
