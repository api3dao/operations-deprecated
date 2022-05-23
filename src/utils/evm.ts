import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';

export const PROTOCOL_ID_PSP = '2';

// Should artifacts be imported from protocol package instead?

export const DapiServerInterface = () => {
  const dapiServerAbi = JSON.parse(fs.readFileSync(path.resolve('./src/utils/artifacts/DapiServer.json')).toString());
  return new ethers.utils.Interface(dapiServerAbi.abi);
};

export const DapiServerContract = (dapiServerAddress: string, provider: ethers.providers.JsonRpcProvider) => {
  const dapiServerAbi = JSON.parse(fs.readFileSync(path.resolve('./src/utils/artifacts/DapiServer.json')).toString());
  return new ethers.Contract(dapiServerAddress, dapiServerAbi.abi, provider);
};
