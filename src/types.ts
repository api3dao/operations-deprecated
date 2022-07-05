import { z } from 'zod';
import {
  apiMetadataSchema,
  apiSchema,
  apisSchema,
  basePolicySchema,
  beaconSchema,
  beaconsSchema,
  chainDeploymentReferencesSchema,
  chainsMetadataSchema,
  chainsSchema,
  dapisSchema,
  deploymentSetSchema,
  deploymentsSchema,
  explorerSchema,
  extendedChainDescriptionSchema,
  oisesSchema,
  operationsRepositorySchema,
  policiesSchema,
  secretsSchema,
  templateSchema,
  templatesSchema,
  topUpWalletSchema,
  walletTypeSchema,
} from './utils/validation';

export type Beacon = z.infer<typeof beaconSchema>;
export type Beacons = z.infer<typeof beaconsSchema>;
export type DeploymentSet = z.infer<typeof deploymentSetSchema>;
export type Deployments = z.infer<typeof deploymentsSchema>;
export type Template = z.infer<typeof templateSchema>;
export type Templates = z.infer<typeof templatesSchema>;
export type Oises = z.infer<typeof oisesSchema>;
export type ApiMetadata = z.infer<typeof apiMetadataSchema>;
export type Api = z.infer<typeof apiSchema>;
export type Apis = z.infer<typeof apisSchema>;
export type ChainDeploymentReferences = z.infer<typeof chainDeploymentReferencesSchema>;
export type ChainsMetadata = z.infer<typeof chainsMetadataSchema>;
export type Chains = z.infer<typeof chainsSchema>;
export type Dapis = z.infer<typeof dapisSchema>;
export type Secrets = z.infer<typeof secretsSchema>;
export type TopUpWalletSchema = z.infer<typeof topUpWalletSchema>;
export type WalletType = z.infer<typeof walletTypeSchema>;
export type ExtendedChainDescription = z.infer<typeof extendedChainDescriptionSchema>;
export type Explorer = z.infer<typeof explorerSchema>;
export type Policies = z.infer<typeof policiesSchema>;
export type BasePolicy = z.infer<typeof basePolicySchema>;

export type OperationsRepository = z.infer<typeof operationsRepositorySchema>;

export type Policy = BasePolicy & {
  dataFeedId?: string;
  dapiName?: string;
};

/**
 * The output of Zod validation
 */
export type ValidationResult<T> = [true, T] | [false, string[]];
