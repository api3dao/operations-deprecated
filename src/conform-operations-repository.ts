import { defaultAbiCoder, keccak256 } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import { decode } from '@api3/airnode-abi';
import { OperationsRepository } from './types';
import { sanitiseFilename } from './utils';

export const conformOperationsRepository = (payload: OperationsRepository) => {
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

      return [
        apiKey,
        {
          beacons,
          templates,
          ois,
          deployments: api.deployments,
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
