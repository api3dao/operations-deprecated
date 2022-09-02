import * as protocol from '@api3/airnode-protocol-v1';
import { ethers } from 'ethers';

export const getDapiServerInterface = () => {
  return new ethers.utils.Interface(protocol.DapiServer__factory.abi);
};

export const getDapiServerContract = (dapiServerAddress: string, provider: ethers.providers.JsonRpcProvider) => {
  return new ethers.Contract(dapiServerAddress, protocol.DapiServer__factory.abi, provider);
};

export const getDapiNameHash = (dapiName: any): any => {
  return ethers.utils.solidityKeccak256(['bytes32'], [ethers.utils.formatBytes32String(dapiName)]);
};
