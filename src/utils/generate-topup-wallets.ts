import { ethers } from 'ethers';
import { deriveWalletPathFromSponsorAddress } from '@api3/airnode-node/dist/src/evm';
import { Choice, PromptObject } from 'prompts';
import { promptQuestions } from './prompts';
import { readOperationsRepository } from './read-operations';
import { writeOperationsRepository } from './write-operations';
import { runAndHandleErrors } from './cli';
import { PROTOCOL_ID_PSP } from './evm';
import { OperationsRepository } from '../validation/types';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'What is the name of the API Integration?',
      choices: choices,
    },
    {
      type: 'text',
      name: 'api3TopUpWallet',
      message: 'What is the wallet address of API3 Top Up Wallet? (leave empty to skip)',
    },
  ];
};

const main = async (operationRepositoryTarget?: string) => {
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);
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
                {
                  walletType: 'Provider-Sponsor',
                  address: providerTopUpWallet,
                },
                ...(response.api3TopUpWallet
                  ? [
                      {
                        walletType: 'API3',
                        address: response.api3TopUpWallet,
                      },
                    ]
                  : []),
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

  writeOperationsRepository(updatedOpsData, operationRepositoryTarget);
};

if (require.main === module) runAndHandleErrors(main);

export { main as generateTopupWallets };
