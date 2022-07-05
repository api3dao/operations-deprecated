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
import { BasePolicy } from '../dist/types';

/*
TypeDoc doesn't work well with Zod, but a workaround is to extend inferred types from the underlying Zod types.
In these instances the underlying schema comments propagate to the parent, which works reasonably well with TypeDoc.

More information can be found here:
https://lorefnon.me/2022/06/25/generating-api-docs-for-zod-types/
 */

export interface Beacon extends z.infer<typeof beaconSchema> {
}

export interface Beacons extends z.infer<typeof beaconsSchema> {
}

export interface DeploymentSet extends z.infer<typeof deploymentSetSchema> {
}

export interface Deployments extends z.infer<typeof deploymentsSchema> {
}

export interface Template extends z.infer<typeof templateSchema> {
}

export interface Templates extends z.infer<typeof templatesSchema> {
}

export interface Oises extends z.infer<typeof oisesSchema> {
}

export interface ApiMetadata extends z.infer<typeof apiMetadataSchema> {
}

export interface Api extends z.infer<typeof apiSchema> {
}

export interface Apis extends z.infer<typeof apisSchema> {
}

export interface ChainDeploymentReferences extends z.infer<typeof chainDeploymentReferencesSchema> {
}

export interface ChainsMetadata extends z.infer<typeof chainsMetadataSchema> {
}

export interface Chains extends z.infer<typeof chainsSchema> {
}

export interface Dapis extends z.infer<typeof dapisSchema> {
}

export interface Secrets extends z.infer<typeof secretsSchema> {
}

export interface TopUpWalletSchema extends z.infer<typeof topUpWalletSchema> {
}

export type WalletType = z.infer<typeof walletTypeSchema>;


export interface ExtendedChainDescription extends z.infer<typeof extendedChainDescriptionSchema> {
}

export type Policy = BasePolicy & {
  dataFeedId?: string;
  dapiName?: string;
}

/**
 * The output of Zod validation
 */
export type ValidationResult<T> = [true, T] | [false, string[]];
