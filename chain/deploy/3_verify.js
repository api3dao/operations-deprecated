const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
const airnodeProtocol = require('@api3/airnode-protocol');
const airnodeProtocolV1References = require('@api3/airnode-protocol-v1/deployments/references.json');

module.exports = async ({ deployments }) => {
  const DapiServer = await deployments.get('DapiServer');

  const accessControlRegistryAddress =
    airnodeProtocol.AccessControlRegistryAddresses[hre.network.config.chainId.toString()];
  const adminRoleDescription = 'DapiServer admin';
  const managerAddress = JSON.parse(fs.readFileSync(path.join('manager-multisig', 'deployments', 'references.json')))[
    hre.network.name
  ].manager;
  const airnodeProtocolAddress = airnodeProtocolV1References.AirnodeProtocol[hre.network.config.chainId.toString()];

  await hre.run('verify:verify', {
    address: DapiServer.address,
    constructorArguments: [accessControlRegistryAddress, adminRoleDescription, managerAddress, airnodeProtocolAddress],
  });
};
module.exports.tags = ['verify'];
