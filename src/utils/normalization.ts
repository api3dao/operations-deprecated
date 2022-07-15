import { Buffer } from 'buffer';
import { join } from 'path';
import { ethers } from 'ethers';
import { encode } from '@api3/airnode-abi';
import { parse } from 'dotenv';
import { sanitiseFilename } from './filesystem';
import { readJsonFile } from './read-operations';
import { OperationsRepository, Secrets, ChainDeploymentReferences } from '../types';

export const normalize = (payload: OperationsRepository) => {
  const apis = Object.fromEntries(
    Object.entries(payload.apis).map(([_key, api]) => {
      const apiKey = sanitiseFilename(api.apiMetadata.name);

      const beacons = Object.fromEntries(
        Object.entries(api.beacons).map(([_key, beacon]) => {
          const beaconId = ethers.utils.keccak256(
            ethers.utils.solidityPack(['address', 'bytes32'], [beacon.airnodeAddress, beacon.templateId])
          );

          return [
            sanitiseFilename(beacon.name),
            {
              ...beacon,
              beaconId,
            },
          ];
        })
      );

      const templates = Object.fromEntries(
        Object.entries(api.templates).map(([_key, value]) => {
          const parameters = encode(value.decodedParameters);
          const templateId = ethers.utils.solidityKeccak256(['bytes32', 'bytes'], [value.endpointId, parameters]);

          return [
            sanitiseFilename(value.name),
            {
              ...value,
              templateId,
              parameters,
            },
          ];
        })
      );

      const ois = Object.fromEntries(
        Object.entries(api.ois).map(([_key, value]) => [sanitiseFilename(`${value.title}-${value.version}`), value])
      );

      const deployments = Object.fromEntries(
        Object.entries(api.deployments).map(([key, value]) => {
          const airnodeAWS =
            value.airnode.aws &&
            Object.fromEntries(
              Object.entries(value.airnode.aws).map(([key, value]) => {
                if (key === 'secrets') {
                  const envBuffer = Buffer.from((value as Secrets).content);
                  const content = Object.entries(parse(envBuffer))
                    .map(([key, _value]) => key)
                    .concat([''])
                    .join('=\n')
                    .trim();

                  return [key, { ...value, content }];
                }

                return [key, value];
              })
            );

          const airnodeGCP =
            value.airnode.gcp &&
            Object.fromEntries(
              Object.entries(value.airnode.gcp).map(([key, value]) => {
                if (key === 'gcp') {
                  const content = Object.fromEntries(Object.entries(value).map(([key, _value]) => [key, '']));
                  return [key, { ...content }];
                }
                return [key, value];
              })
            );

          const airkeeperAWS = value?.airkeeper?.aws
            ? Object.fromEntries(
                Object.entries(value.airkeeper.aws).map(([key, value]) => {
                  if (key === 'secrets') {
                    const envBuffer = Buffer.from((value as Secrets).content);
                    const content = Object.entries(parse(envBuffer))
                      .map(([key, _value]) => key)
                      .concat([''])
                      .join('=\n')
                      .trim();

                    return [key, { ...value, content }];
                  }

                  return [key, value];
                })
              )
            : undefined;
          return [
            key,
            {
              ...value,
              airnode: { ...(value.airnode.aws && { aws: airnodeAWS }), ...(value.airnode.gcp && { gcp: airnodeGCP }) },
              airkeeper: { aws: airkeeperAWS },
            },
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

  const chainDeploymentReferences = readJsonFile(
    join(__dirname, '..', '..', 'chain', 'deployments', 'references.json')
  ) as ChainDeploymentReferences;

  const chains = Object.fromEntries(
    Object.entries(chainDeploymentReferences.chainNames).map(([chainId, chainName]) => {
      return [
        chainName,
        {
          ...payload.chains[chainName],
          name: chainName,
          id: chainId,
          contracts: Object.entries(chainDeploymentReferences.contracts).reduce(
            (acc, [contractName, contractChains]) => ({
              ...acc,
              [contractName]: contractChains[chainId],
            }),
            {}
          ),
        },
      ];
    })
  );

  const explorer = {
    ...payload.explorer,
    beaconSets: Object.fromEntries(
      Object.values(payload.explorer.beaconSets).map((set) => {
        const beaconSetId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['bytes32[]'], [set]));
        return [beaconSetId, set];
      })
    ),
  };

  const policies = payload.policies
    ? Object.fromEntries(
        Object.entries(payload.policies).map(([chain, policies]) => {
          return [
            chain,
            {
              dapis: policies.dapis
                ? Object.fromEntries(
                    Object.values(policies.dapis).map((policy) => [
                      `${policy.readerAddress}-${policy.dapiName}`,
                      policy,
                    ])
                  )
                : undefined,
              dataFeeds: policies.dataFeeds
                ? Object.fromEntries(
                    Object.values(policies.dataFeeds).map((policy) => [
                      `${policy.paymentTxHash}-${policy.dataFeedId}`,
                      policy,
                    ])
                  )
                : undefined,
            },
          ];
        })
      )
    : {};

  return { ...payload, apis, chains, explorer, policies } as OperationsRepository;
};

export const emptyObject = (object: any, preserveValueKeys: string[], ignoreNestedKeys: string[]): any => {
  if (Array.isArray(object)) {
    return object.map((value) => {
      if (typeof value === 'object' && !ignoreNestedKeys.includes(value)) {
        return emptyObject(value, preserveValueKeys, ignoreNestedKeys);
      }

      return preserveValueKeys.includes(value) ? object[value] : emptyReturn(object[value]);
    });
  }
  const processedTuples = Object.entries(object).map(([key, value]) => {
    if (typeof value === 'object' && !ignoreNestedKeys.includes(key)) {
      return [key, emptyObject(value, preserveValueKeys, ignoreNestedKeys)];
    }

    return [key, preserveValueKeys.includes(key) ? object[key] : emptyReturn(object[key])];
  });

  return Object.fromEntries(processedTuples);
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
      if (Array.isArray(value)) return [];
      return {};
    default:
      return null;
  }
};
