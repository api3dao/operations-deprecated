import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';

export const chainNameToChainId: { [chainName: string]: number } = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  kovan: 42,
  goerli: 5,
  polygon: 137,
  polygonMumbai: 80001,
  fantom: 250,
};

export const chainNameToPublicRPCUrl: { [chainName: string]: string } = {
  mainnet: 'https://rpc.ankr.com/eth',
  ropsten: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  rinkeby: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  kovan: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  goerli: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  polygon: 'https://polygon-rpc.com/',
  polygonMumbai: 'https://rpc-mumbai.matic.today',
  fantom: 'https://rpc.ftm.tools/',
};

export const DapiServerInterface = () => {
  const dapiServerAbi = JSON.parse(fs.readFileSync(path.resolve('./src/utils/artifacts/DapiServer.json')).toString());
  return new ethers.utils.Interface(dapiServerAbi.abi);
};

export const DapiServerContract = (dapiServerAddress: string, provider: ethers.providers.JsonRpcProvider) => {
  const dapiServerAbi = JSON.parse(fs.readFileSync(path.resolve('./src/utils/artifacts/DapiServer.json')).toString());
  return new ethers.Contract(dapiServerAddress, dapiServerAbi.abi, provider);
};
