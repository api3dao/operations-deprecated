import { z } from 'zod';
import { oisSchema, configSchema as airnodeConfigSchema } from '@api3/airnode-validator';
import { configSchema as airkeeperConfigSchema } from './airkeeper-validation';
import { configSchema as airseekerConfigSchema } from './airseeker-validation';
import { OperationsRepository } from '../types';

export const evmAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const evmBeaconIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmTemplateIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmEndpointIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmXpubSchema = z.string().regex(/^xpub[a-zA-Z0-9]{107}$/);

export const walletTypeSchema = z.enum(['Provider', 'API3', 'Provider-Sponsor', 'API3-Sponsor']);

export const topUpWalletSchema = z.object({
  walletType: walletTypeSchema,
  address: evmAddressSchema.optional(),
});

export const extendedChainDescriptionSchema = z.object({
  active: z.boolean(),
  sponsor: z.string(),
  topUpWallets: z.array(topUpWalletSchema),
  updateConditionPercentage: z.number(),
  airseekerConfig: z.object({
    deviationThreshold: z.number(),
    heartbeatInterval: z.number(),
    updateInterval: z.number(),
  }),
});

export const beaconSchema = z.object({
  name: z.string(),
  description: z.string(),
  beaconId: evmBeaconIdSchema,
  airnodeAddress: evmAddressSchema,
  templateId: evmTemplateIdSchema,
  chains: z.record(extendedChainDescriptionSchema),
});

export const beaconsSchema = z.record(beaconSchema);

export const secretsSchema = z.object({ filename: z.string(), content: z.string() });

export const airnodeDeploymentSchema = z.object({
  config: airnodeConfigSchema,
  secrets: secretsSchema,
  aws: secretsSchema.optional(),
});

export const airkeeperDeploymentSchema = z.object({
  config: airnodeConfigSchema,
  airkeeper: airkeeperConfigSchema,
  secrets: secretsSchema,
  aws: secretsSchema.optional(),
});

export const deploymentSetSchema = z.object({
  airnode: airnodeDeploymentSchema,
  airkeeper: airkeeperDeploymentSchema,
});

export const deploymentsSchema = z.record(deploymentSetSchema);

export const templateDecodedParametersSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string(),
});

export const templateSchema = z.object({
  name: z.string(),
  templateId: evmTemplateIdSchema,
  endpointId: evmEndpointIdSchema,
  parameters: z.string(),
  decodedParameters: z.array(templateDecodedParametersSchema),
});

export const templatesSchema = z.record(templateSchema);

export const oisesSchema = z.record(oisSchema);

export const apiMetadataSchema = z.object({
  name: z.string(),
  active: z.boolean(),
  airnode: evmAddressSchema,
  xpub: evmXpubSchema,
  logoPath: z.string(),
});

export const apiSchema = z.object({
  apiMetadata: apiMetadataSchema,
  beacons: beaconsSchema,
  templates: templatesSchema,
  deployments: deploymentsSchema,
  ois: oisesSchema,
});

export const beaconChainDocumentationSchema = z.object({
  airkeeperDeviationThreshold: z.number(),
  airseekerDeviationThreshold: z.number(),
});

export const beaconDocumentationSchema = z.object({
  beaconId: evmBeaconIdSchema,
  name: z.string(),
  description: z.string(),
  chains: z.record(beaconChainDocumentationSchema),
});

export const chainsMetadataSchema = z.object({
  name: z.string(),
  id: z.string(),
  contracts: z.record(z.string()),
  nativeToken: z.string(),
  blockTime: z.number(),
  logoPath: z.string(),
});

export const documentationSchema = z.object({
  beacons: z.record(z.array(beaconDocumentationSchema)),
  chains: z.record(chainsMetadataSchema),
});

const airseekerDeploymentSetSchema = z.object({
  airseeker: airseekerConfigSchema,
  secrets: secretsSchema,
});

const airseekerDeploymentsSchema = z.record(airseekerDeploymentSetSchema);

//TODO: Flesh out the airseeker schema
export const api3Schema = z.object({
  airseeker: airseekerDeploymentsSchema,
});

export const operationsRepositorySchema = z.object({
  apis: z.record(apiSchema),
  documentation: documentationSchema,
  chains: z.record(chainsMetadataSchema),
  api3: api3Schema.optional(),
});

export const replaceInterpolatedVariables = (object: any): any => {
  if (object instanceof Array) {
    return object.map(replaceInterpolatedVariables);
  }

  if (object instanceof Object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, replaceInterpolatedVariables(value)]));
  }

  const stringObject = object.toString().toLowerCase();
  if (stringObject.includes('${') && stringObject.includes('url')) {
    return 'https://blank.url';
  }

  return object;
};

export const validate = (payload: OperationsRepository) => {
  const result = operationsRepositorySchema.safeParse(replaceInterpolatedVariables(payload));
  if (!result.success) {
    return [false, result];
  }

  return [true, undefined];
};
