const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

export default async () => {
  const networks = fs
    .readdirSync('deployments', { withFileTypes: true })
    .filter((item: any) => item.isDirectory())
    .map((item: any) => item.name);
  const contractNames = ['DapiServer'];

  const references = {
    chainNames: networks.reduce((acc: any, network: any) => {
      return { ...acc, [hre.config.networks[network].chainId]: network };
    }, {}),
    ...contractNames.reduce((acc, contractName) => {
      return {
        ...acc,
        [contractName]: networks.reduce((acc: any, network: any) => {
          const deployment = JSON.parse(
            fs.readFileSync(path.join('deployments', network, `${contractName}.json`), 'utf8')
          );
          return { ...acc, [hre.config.networks[network].chainId]: deployment.address };
        }, {}),
      };
    }, {}),
  };
  fs.writeFileSync(path.join('deployments', 'references.json'), JSON.stringify(references, null, 2));
};
