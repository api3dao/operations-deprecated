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

export const topUpWalletSchema = z
  .object({
    walletType: walletTypeSchema,
    address: evmAddressSchema.optional(),
  })
  .strict();

export const extendedChainDescriptionSchema = z
  .object({
    active: z.boolean(),
    sponsor: z.string(),
    topUpWallets: z.array(topUpWalletSchema),
    updateConditionPercentage: z.number().optional(),
    airseekerConfig: z
      .object({
        deviationThreshold: z.number(),
        heartbeatInterval: z.number(),
        updateInterval: z.number(),
      })
      .optional(),
  })
  .strict();

export const beaconSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    logoPath: z.string().optional(),
    beaconId: evmBeaconIdSchema,
    airnodeAddress: evmAddressSchema,
    templateId: evmTemplateIdSchema,
    chains: z.record(extendedChainDescriptionSchema),
  })
  .strict();

export const beaconsSchema = z.record(beaconSchema);

export const secretsSchema = z.object({ filename: z.string(), content: z.string() }).strict();

export const airnodeDeploymentSchema = z
  .object({
    config: airnodeConfigSchema,
    secrets: secretsSchema,
    aws: secretsSchema.optional(),
  })
  .strict();

export const airkeeperDeploymentSchema = z
  .object({
    config: airnodeConfigSchema,
    airkeeper: airkeeperConfigSchema,
    secrets: secretsSchema,
    aws: secretsSchema.optional(),
  })
  .strict();

export const deploymentSetSchema = z
  .object({
    airnode: airnodeDeploymentSchema,
    airkeeper: airkeeperDeploymentSchema,
  })
  .strict();

export const deploymentsSchema = z.record(deploymentSetSchema);

export const templateDecodedParametersSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string(),
});

export const templateSchema = z
  .object({
    name: z.string(),
    templateId: evmTemplateIdSchema,
    endpointId: evmEndpointIdSchema,
    parameters: z.string(),
    decodedParameters: z.array(templateDecodedParametersSchema),
  })
  .strict();

export const templatesSchema = z.record(templateSchema);

export const oisesSchema = z.record(oisSchema);

export const apiMetadataSchema = z
  .object({
    name: z.string(),
    active: z.boolean(),
    description: z.string(),
    homepage: z.string(),
    airnode: evmAddressSchema,
    xpub: evmXpubSchema,
    logoPath: z.string(),
    maxSubscriptionPeriod: z.number(),
  })
  .strict();

export const apiSchema = z
  .object({
    apiMetadata: apiMetadataSchema,
    beacons: beaconsSchema,
    templates: templatesSchema,
    deployments: deploymentsSchema,
    ois: oisesSchema,
  })
  .strict();

export const chainsMetadataSchema = z
  .object({
    name: z.string(),
    id: z.string(),
    contracts: z.record(z.string()),
    nativeToken: z.string().optional(),
    blockTime: z.number().optional(),
    logoPath: z.string().optional(),
    explorerUrl: z.string().optional(),
  })
  .strict();

const airseekerDeploymentSetSchema = z
  .object({
    airseeker: airseekerConfigSchema,
    secrets: secretsSchema,
  })
  .strict();

const airseekerDeploymentsSchema = z.record(airseekerDeploymentSetSchema);

//TODO: Flesh out the airseeker schema
export const api3Schema = z
  .object({
    airseeker: airseekerDeploymentsSchema,
  })
  .strict();

export const beaconSetSchema = z.record(z.array(z.string()));

export const explorerSchema = z
  .object({
    beaconMetadata: z.record(
      z.object({
        category: z.string(),
        pricingCoverage: z.string(), // must be present in pricingCoverage
      })
    ),
    pricingCoverage: z.record(
      z.array(
        z.object({
          subscriptionFee: z.number(),
          coverage: z.number(),
        })
      )
    ),
    beaconSets: beaconSetSchema,
  })
  .strict();

export const chainDeploymentReferencesSchema = z
  .object({
    chainNames: z.record(z.string()),
    contracts: z.record(z.record(z.string())),
  })
  .strict();

export const subscriptionsSchema = z.record(
  z
    .object({
      paymentTxHash: z.string(),
      resourceId: evmBeaconIdSchema,
      claimaintAddress: evmAddressSchema,
      beneficiaryAddress: evmAddressSchema,
      whitelistAddress: evmAddressSchema,
      coverageAmount: z.string(),
      startDate: z.number(),
      endDate: z.number(),
      ipfsPolicyHash: z.string(),
      ipfsServicePolicyHash: z.string(),
    })
    .strict()
);

export const operationsRepositorySchema = z
  .object({
    apis: z.record(apiSchema),
    chains: z.record(chainsMetadataSchema),
    api3: api3Schema.optional(),
    dapis: z.record(z.record(z.string())),
    explorer: explorerSchema,
    subscriptions: z.record(subscriptionsSchema).optional(),
  })
  .strict();

export const replaceInterpolatedVariables = (object: any): any => {
  if (object instanceof Array) {
    return object.map(replaceInterpolatedVariables);
  }

  if (object instanceof Object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, replaceInterpolatedVariables(value)]));
  }

  // TODO why is this sometimes null. Edit: because of api3 being included when optional and/or unset
  if (!object) {
    return object;
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
