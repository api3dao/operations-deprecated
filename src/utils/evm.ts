import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';

export const PROTOCOL_ID_PSP = '2';

export const chainNameToChainId: { [chainName: string]: number } = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  kovan: 42,
  goerli: 5,
  polygon: 137,
  bsc: 56,
  avalanche: 43114,
  rsk: 30,
  fantom: 250,
  polygonMumbai: 80001,
};

export const generateChainSponsorAddress = (chainName: string, xpub: string) => {
  const chainId = chainNameToChainId[chainName];
  const airnodeHdNode = ethers.utils.HDNode.fromExtendedKey(xpub);
  const chainSponsor = airnodeHdNode.derivePath(`${PROTOCOL_ID_PSP}/${chainId}`).address;
  return chainSponsor;
};

export const DapiServerInterface = () => {
  const dapiServerAbi = JSON.parse(fs.readFileSync(path.resolve('./src/utils/artifacts/DapiServer.json')).toString());
  return new ethers.utils.Interface(dapiServerAbi.abi);
};

export const DapiServerContract = (dapiServerAddress: string, provider: ethers.providers.JsonRpcProvider) => {
  const dapiServerAbi = JSON.parse(fs.readFileSync(path.resolve('./src/utils/artifacts/DapiServer.json')).toString());
  return new ethers.Contract(dapiServerAddress, dapiServerAbi.abi, provider);
};
