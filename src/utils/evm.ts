import * as protocol from '@api3/airnode-protocol-v1';
import { ethers } from 'ethers';

export const PROTOCOL_ID_PSP = '2';

export const DapiServerInterface = () => {
  return new ethers.utils.Interface(protocol.DapiServer__factory.abi);
};

export const DapiServerContract = (dapiServerAddress: string, provider: ethers.providers.JsonRpcProvider) => {
  return new ethers.Contract(dapiServerAddress, protocol.DapiServer__factory.abi, provider);
};
