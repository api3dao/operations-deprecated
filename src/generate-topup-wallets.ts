import { ethers } from 'ethers';
import { Choice, PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';
import { runAndHandleErrors } from './utils/cli';
import { PROTOCOL_ID_PSP } from './utils/evm';
import { deriveWalletPathFromSponsorAddress } from '@api3/airnode-node/dist/src/evm';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'What is the name of the API Integration?',
      choices: choices,
    },
  ];
};

const main = async () => {
  const operationsRepository = readOperationsRepository();
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })) as Choice[];
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];

  const beacons = Object.fromEntries(
    Object.entries(apiData.beacons).map(([_key, beacon]) => {
      const chains = Object.fromEntries(
        Object.entries(beacon.chains).map(([chainName, chain]) => {
          const airnodeHdNode = ethers.utils.HDNode.fromExtendedKey(apiData.apiMetadata.xpub);
          const providerTopUpWallet = airnodeHdNode.derivePath(
            deriveWalletPathFromSponsorAddress(chain.sponsor, PROTOCOL_ID_PSP)
          ).address;
          return [
            chainName,
            {
              ...chain,
              topUpWallets: [
                ...chain.topUpWallets,
                {
                  walletType: 'Provider',
                  address: providerTopUpWallet,
                },
              ],
            },
          ];
        })
      );

      return [
        _key,
        {
          ...beacon,
          chains,
        },
      ];
    })
  );

  //// Create the deployment directory ////
  const updatedOpsData: OperationsRepository = {
    ...operationsRepository,
    apis: {
      ...operationsRepository.apis,
      [response.apiName]: {
        ...operationsRepository.apis[response.apiName],
        beacons,
      },
    },
  };

  writeOperationsRepository(updatedOpsData);
};

runAndHandleErrors(main);
