import { Buffer } from 'buffer';
import { defaultAbiCoder, keccak256 } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import { decode } from '@api3/airnode-abi';
import { parse } from 'dotenv';
import { sanitiseFilename } from './filesystem';
import { OperationsRepository } from '../types';

export const normalize = (payload: OperationsRepository) => {
  const apis = Object.fromEntries(
    Object.entries(payload.apis).map(([_key, api]) => {
      const apiKey = sanitiseFilename(api.apiMetadata.name);

      const beacons = Object.fromEntries(
        Object.entries(api.beacons).map(([_key, value]) => {
          const beaconId = keccak256(
            defaultAbiCoder.encode(['address', 'bytes32'], [value.airnodeAddress, value.templateId])
          );

          return [
            sanitiseFilename(value.name),
            {
              ...value,
              beaconId,
            },
          ];
        })
      );

      const templates = Object.fromEntries(
        Object.entries(api.templates).map(([_key, value]) => {
          const templateId = ethers.utils.solidityKeccak256(['bytes32', 'bytes'], [value.endpointId, value.parameters]);

          const decodedParameters = decode(value.parameters);

          return [
            sanitiseFilename(value.name),
            {
              ...value,
              templateId,
              decodedParameters,
            },
          ];
        })
      );

      const ois = Object.fromEntries(
        Object.entries(api.ois).map(([_key, value]) => [sanitiseFilename(`${value.title}-${value.version}`), value])
      );

      const deployments = Object.fromEntries(
        Object.entries(api.deployments).map(([key, value]) => {
          return [
            key,
            Object.fromEntries(
              Object.entries(value).map(([key, value]) => {
                console.log(key);
                if (key.toLowerCase() === 'secrets') {
                  const envBuffer = Buffer.from(value.content);
                  const content = Object.entries(parse(envBuffer))
                    .map(([key, _value]) => key)
                    .concat([''])
                    .join('=""\n');

                  return [key, { ...value, content }];
                }

                return [key, value];
              })
            ),
          ];
        })
      );

      return [
        apiKey,
        {
          beacons,
          templates,
          ois,
          deployments,
          apiMetadata: api.apiMetadata,
        },
      ];
    })
  );

  // TODO break this up
  const documentation = {
    beacons: Object.fromEntries(
      Object.entries(apis)
        .filter(([_key, value]) => value.apiMetadata.active)
        .map(([apiKey, api]) => [
          apiKey,
          Object.entries(api.beacons)
            .filter(([_key, value]) => value.chains.filter((chain) => chain.active).length > 0)
            .map(([_, beacon]) => ({
              beaconId: beacon.beaconId,
              name: beacon.name,
              description: beacon.description,
              chains: beacon.chains.map((chain) => chain.name),
            })),
        ])
        .filter(([_key, value]) => value.length > 0)
    ),
  };

  return { apis, documentation } as OperationsRepository;
};

export const emptyObject = (object: any, preserveValueKeys: string[], ignoreNestedKeys: string[]) => {
  for (const key in object) {
    if (typeof object[key] === 'object' && !ignoreNestedKeys.includes(key)) {
      emptyObject(object[key], preserveValueKeys, ignoreNestedKeys);
    } else {
       /* eslint-disable no-eval */
      object[key] = preserveValueKeys.includes(key) ? object[key] : emptyReturn(object[key]);
    }
  }
  return object;
};

const emptyReturn = (value: any) => {
  switch (typeof value) {
    case 'boolean':
      return false;
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'object':
      return {};
    default:
      return null;
  }
};
