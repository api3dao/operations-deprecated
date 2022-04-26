// TODO
// This is a potentially useful scratch script for converting an Airkeeper file to the ops structure
import fs from 'fs';
import * as crypto from 'crypto';
import { z } from 'zod';
import { decode } from '@api3/airnode-abi';
import { ethers } from 'ethers';
import { configSchema as airkeeperConfigSchema } from './utils/airkeeper-validation';
import { readOperationsRepository } from './utils/read-operations';
import { normalize } from './utils/normalization';
import { writeOperationsRepository } from './utils/write-operations';

export declare const PROTOCOL_ID_PSP = '2';
export const deriveWalletPathFromSponsorAddress = (sponsorAddress: string, protocolId = '1') => {
  const sponsorAddressBN = ethers.BigNumber.from(ethers.utils.getAddress(sponsorAddress));
  const paths = [];
  for (let i = 0; i < 6; i++) {
    const shiftedSponsorAddressBN = sponsorAddressBN.shr(31 * i);
    paths.push(shiftedSponsorAddressBN.mask(31).toString());
  }
  return `${protocolId}/${paths.join('/')}`;
};
export const deriveSponsorWalletFromMnemonic = (airnodeMnemonic: string, sponsorAddress: string, protocolId: string) =>
  ethers.Wallet.fromMnemonic(
    airnodeMnemonic,
    `m/44'/60'/0'/${deriveWalletPathFromSponsorAddress(sponsorAddress, protocolId)}`
  );

const main = () => {
  const airkeeper = JSON.parse(
    fs.readFileSync('/home/aquarat/Projects/operations/data/apis/api3/deployments/2022-04-26/airkeeper.json').toString()
  ) as z.infer<typeof airkeeperConfigSchema>;
  const opsData = readOperationsRepository();

  opsData.apis['api3'].beacons = Object.fromEntries(
    Object.values(airkeeper.subscriptions).map((sub) => {
      const coinId = decode(airkeeper.templates[sub.templateId].templateParameters)['coinId'];

      return [
        crypto.randomBytes(6).toString(),
        {
          name: `CoinGecko coinId ${coinId}`,
          airnodeAddress: sub.airnodeAddress,
          description: `CoinGecko coinId ${coinId}`,
          beaconId: 'calculate me', // todo
          templateId: sub.templateId,
          updateConditionPercentage: 0.1,
          chains: [
            {
              active: true,
              name: 'ropsten',
              sponsor: sub.sponsor,
              topUpWallets: [
                {
                  walletType: 'Provider' as const,
                  address: deriveSponsorWalletFromMnemonic(
                    'tube spin artefact salad slab lumber foot bitter wash reward vote cook',
                    sub.sponsor,
                    PROTOCOL_ID_PSP
                  ).address,
                },
              ],
            },
          ],
          airseekerConfig: { deviationThreshold: 0.2, heartbeatInterval: 86400, updateInterval: 30 },
        },
      ];
    })
  );

  opsData.apis['api3'].templates = Object.fromEntries(
    Object.entries(airkeeper.templates).map(([templateId, template]) => {
      const decodedParameters = decode(template.templateParameters);
      return [
        crypto.randomBytes(6).toString(),
        {
          name: `CoinGecko ${decodedParameters['coinId']}`,
          templateId,
          endpointId: template.endpointId,
          parameters: template.templateParameters,
          decodedParameters: decodedParameters as Record<string, string>,
        },
      ];
    })
  );

  const normOps = normalize(opsData);
  writeOperationsRepository(normOps);
};

main();
