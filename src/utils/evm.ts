import * as protocol from '@api3/airnode-protocol-v1';
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
  'polygon-testnet': 80001,
  'avalanche-testnet': 43113,
};

export const DapiServerInterface = () => {
  return new ethers.utils.Interface(protocol.DapiServer__factory.abi);
};

export const DapiServerContract = (dapiServerAddress: string, provider: ethers.providers.JsonRpcProvider) => {
  return new ethers.Contract(dapiServerAddress, protocol.DapiServer__factory.abi, provider);
};
