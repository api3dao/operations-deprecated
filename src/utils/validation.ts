import { z } from 'zod';
import { oisSchema, configSchema as airnodeConfigSchema } from '@api3/airnode-validator';
import { configSchema as airkeeperConfigSchema } from '@api3/airkeeper/dist/src';
import { OperationsRepository } from '../types';

export const evmAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const evmBeaconIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmTemplateIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmEndpointIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmXpubSchema = z.string().regex(/^xpub[a-zA-Z0-9]{107}$/);

export const topUpWalletSchema = z.object({
  walletType: z.enum(['Provider', 'API3']),
  address: evmAddressSchema,
});

export const extendedChainDescriptionSchema = z.object({
  active: z.boolean(),
  name: z.string(),
  sponsor: z.string(),
  topUpWallets: z.array(topUpWalletSchema),
});

export const beaconSchema = z.object({
  name: z.string(),
  description: z.string(),
  beaconId: evmBeaconIdSchema,
  airnodeAddress: evmAddressSchema,
  templateId: evmTemplateIdSchema,
  updateConditionPercentage: z.number(),
  chains: z.array(extendedChainDescriptionSchema),
  signedKeeperConditions: z.object({
    deviationFactorThreshold: z.number(),
    ttlMinutes: z.number(),
  }),
});

export const beaconsSchema = z.record(beaconSchema);

export const deploymentSetSchema = z.object({
  config: airnodeConfigSchema,
  airkeeper: airkeeperConfigSchema,
  secrets: z.object({ content: z.string() }),
});

export const deploymentsSchema = z.record(deploymentSetSchema);

export const templateSchema = z.object({
  name: z.string(),
  templateId: evmTemplateIdSchema,
  endpointId: evmEndpointIdSchema,
  parameters: z.string(),
  decodedParameters: z.record(z.string()),
});

export const templatesSchema = z.record(templateSchema);

export const oisesSchema = z.record(oisSchema);

export const apiMetadataSchema = z.object({
  name: z.string(),
  active: z.boolean(),
  airnode: evmAddressSchema,
  xpub: evmXpubSchema,
});

export const apiSchema = z.object({
  apiMetadata: apiMetadataSchema,
  beacons: beaconsSchema,
  templates: templatesSchema,
  deployments: deploymentsSchema,
  ois: oisesSchema,
});

export const beaconDocumentationSchema = z.object({
  beaconId: evmBeaconIdSchema,
  name: z.string(),
  description: z.string(),
  chains: z.array(z.string()),
});

export const documentationSchema = z.object({
  beacons: z.record(z.array(beaconDocumentationSchema)),
  // TODO Implement chains
  // chains: z.record(z.record(evmAddressSchema)),
});

export const operationsRepositorySchema = z.object({
  apis: z.record(apiSchema),
  documentation: documentationSchema,
});

export const validate = (payload: OperationsRepository) => {
  const result = operationsRepositorySchema.safeParse(payload);
  if (!result.success) {
    return [false, result];
  }

  return [true, undefined];
};
