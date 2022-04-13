import { Choice, PromptObject } from 'prompts';
import { AirnodeRrpAddresses } from '@api3/airnode-protocol';
import { Api, Beacon, OperationsRepository } from './types';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';
import { runAndHandleErrors } from './utils/cli';
import { chainNameToChainId } from './utils/evm';
import { Beacons, Gateways, Templates, Triggers } from './utils/airseeker-validation';
import { sanitiseFilename } from './utils/filesystem';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'text',
      name: 'name',
      message: ['What is the Airseeker configuration name?'].join('\n'),
      initial: 'global',
    },
    {
      type: 'autocompleteMultiselect',
      name: 'selectedBeacons',
      message: 'What are the beacons you want to include in the configuration?',
      choices: choices,
    },
    //TODO: Add BeaconSet question
  ];
};

const main = async () => {
  const operationsRepository = readOperationsRepository();
  const documentation = operationsRepository.documentation;
  const beaconChoices = Object.values(operationsRepository.apis).flatMap((api) =>
    Object.values(api.beacons).map((beacon) => ({
      title: `${api.apiMetadata.name}\t${beacon.name}`,
      value: { api: api, beacon: beacon },
      selected: true,
    }))
  );

  const response = await promptQuestions(questions(beaconChoices));
  const selectedBeacons = response.selectedBeacons as { api: Api; beacon: Beacon }[];
  const beacons = selectedBeacons.map((beacon) => beacon.beacon);
  const apis = selectedBeacons
    .map((beacon) => beacon.api)
    .filter((api, index, apis) => apis.findIndex((find) => find.apiMetadata.name === api.apiMetadata.name) === index);

  // Get all the chains the API will be deployed on
  const apiChains = [...new Set(beacons.flatMap((beacon) => beacon.chains.map((chain) => chain.name)))];

  //// Build airseeker.json ////
  const airseekerBeacons = beacons.reduce(
    (beaconObj, beacon) => ({
      ...beaconObj,
      [beacon.beaconId]: {
        airnode: beacon.airnodeAddress,
        templateId: beacon.templateId,
        fetchInterval: beacon.airseekerConfig.updateInterval,
      },
    }),
    {} as Beacons
  );

  const airseekerChains = apiChains
    .map((chainName) => ({
      [chainNameToChainId[chainName]]: {
        contracts: {
          AirnodeRrp: AirnodeRrpAddresses[chainNameToChainId[chainName]] || '',
          DapiServer: documentation.chains[chainName].contracts.DapiServer || '',
        },
        providers: {
          provider1: {
            url: `\${${chainName}_PROVIDER_URL}`.toUpperCase(),
          },
        },
        options: {
          txType: 'eip1559' as const,
          priorityFee: {
            value: 3.12,
            unit: 'gwei' as const,
          },
          baseFeeMultiplier: 2,
        },
      },
    }))
    .reduce((chainsObject, chain) => ({ ...chainsObject, ...chain }), {});

  const airseekerGateways = apis.reduce(
    (gatewaysObject, api) => ({
      ...gatewaysObject,
      [api.apiMetadata.airnode]: [
        ...(gatewaysObject?.[api.apiMetadata.airnode] || []),
        {
          apiKey: `\${HTTP_SIGNED_DATA_GATEWAY_KEY_${sanitiseFilename(api.apiMetadata.name).toUpperCase()}_AWS}`,
          url: `\${HTTP_SIGNED_DATA_GATEWAY_URL_${sanitiseFilename(api.apiMetadata.name).toUpperCase()}_AWS}`,
        },
      ],
    }),
    {} as Gateways
  );

  const aiseekerTemplates = apis
    .map((api) =>
      Object.values(api.templates).reduce(
        (templateObj, template) => ({
          ...templateObj,
          [template.templateId]: {
            endpointId: template.endpointId,
            parameters: template.parameters,
          },
        }),
        {} as Templates
      )
    )
    .reduce((templatesObject, template) => ({ ...templatesObject, ...template }), {});

  const airseekerTriggers = beacons.reduce(
    (curr1, beacon) =>
      beacon.chains.reduce(
        (curr2, chain) => ({
          ...curr2,
          beaconUpdates: {
            ...curr2.beaconUpdates,
            [`${chainNameToChainId[chain.name]}`]: {
              ...curr2?.beaconUpdates?.[`${chainNameToChainId[chain.name]}`],
              [chain.sponsor]: {
                beacons: [
                  ...(curr2?.beaconUpdates?.[`${chainNameToChainId[chain.name]}`]?.[chain.sponsor]?.beacons || []),
                  {
                    beaconId: beacon.beaconId,
                    deviationThreshold: beacon.airseekerConfig.deviationThreshold,
                    heartbeatInterval: beacon.airseekerConfig.heartbeatInterval,
                  },
                ],
                updateInterval: beacon.airseekerConfig.updateInterval,
              },
            },
          },
          beaconSetUpdates: {},
        }),
        curr1
      ),
    {} as Triggers
  );

  const config = {
    beacons: airseekerBeacons,
    beaconSets: {},
    chains: airseekerChains,
    gateways: airseekerGateways,
    templates: aiseekerTemplates,
    triggers: airseekerTriggers,
  };

  //// Build secrets.env ////

  const gatewaySecrets = apis.flatMap((api) => [
    `HTTP_SIGNED_DATA_GATEWAY_KEY_${sanitiseFilename(api.apiMetadata.name).toUpperCase()}_AWS=`,
    `HTTP_SIGNED_DATA_GATEWAY_URL_${sanitiseFilename(api.apiMetadata.name).toUpperCase()}_AWS=`,
  ]);

  const secretsArray = [...gatewaySecrets, ...apiChains.map((chainName) => `${chainName}_PROVIDER_URL=`.toUpperCase())];

  const secrets = {
    filename: '.env',
    content: secretsArray.join('\n'),
  };

  //// Create the deployment directory ////
  const updatedOpsData: OperationsRepository = {
    ...operationsRepository,
    api3: {
      ...operationsRepository.api3,
      airseeker: {
        ...operationsRepository.api3?.airseeker,
        [response.name]: {
          config,
          secrets,
        },
      },
    },
  };

  writeOperationsRepository(updatedOpsData);
};

runAndHandleErrors(main);
