const fs = require('fs');
const path = require('path');
const hre = require('hardhat');
const airnodeProtocol = require('@api3/airnode-protocol');
const airnodeProtocolV1References = require('@api3/airnode-protocol-v1/deployments/references.json');

export default async ({ deployments, getUnnamedAccounts }: any) => {
  const { deploy, log } = deployments;
  const accounts = await getUnnamedAccounts();

  const accessControlRegistryAddress =
    airnodeProtocol.AccessControlRegistryAddresses[hre.network.config.chainId.toString()];
  const adminRoleDescription = 'DapiServer admin';
  const managerAddress = JSON.parse(fs.readFileSync(path.join('manager-multisig', 'deployments', 'references.json')))[
    hre.network.name
  ].manager;
  const airnodeProtocolAddress = airnodeProtocolV1References.AirnodeProtocol[hre.network.config.chainId.toString()];

  const dapiServer = await deploy('DapiServer', {
    args: [accessControlRegistryAddress, adminRoleDescription, managerAddress, airnodeProtocolAddress],
    from: accounts[0],
    log: true,
  });
  log(`Deployed DapiServer at ${dapiServer.address}.`);
};
