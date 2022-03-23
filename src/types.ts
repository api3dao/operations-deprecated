import { Config, ApiCallParameters } from '@api3/airnode-node';
import { OIS } from '@api3/airnode-ois';
import { AirkeeperConfig } from '@api3/airkeeper/src/validator';

export interface TopUpWallet {
  walletType: 'Provider' | 'API3';
  address: string;
}

export interface ExtendedChainDescription {
  active: boolean; // TODO don't include in docs export if false
  name: ChainName;
  sponsor: string;
  topUpWallets: TopUpWallet[];
}

export interface Beacon {
  name: string;
  description: string;
  beaconId: string; // TODO derive this
  airnodeAddress: string; // TODO verify in apiMetadata
  templateId: string; // TODO verify exists in templates
  updateConditionPercentage: number;
  chains: ExtendedChainDescription[];
  signedKeeperConditions: {
    deviationFactorThreshold: number;
    ttlMinutes: number;
  };
}

export type Beacons = Record<string, Beacon>;

export interface DeploymentSet {
  config: Config;
  airkeeper: AirkeeperConfig;
}

export type Deployments = Record<string, DeploymentSet>;

export interface Template {
  name: string;
  templateId: string;
  endpointId: string;
  parameters: string;
  decodedParameters: ApiCallParameters[]; // TODO derive this
}

export type Templates = Record<string, Template>; // TODO key to be derived via sanitise from templateName

export type Oises = Record<string, OIS>; // TODO derive OIS key

export interface ApiMetadata {
  name: string; // Pretty name
  active: boolean; // Do not include in docs if not active
  airnode: string; // TODO these are related, so check
  xpub: string;
}

export interface Api {
  apiMetadata: ApiMetadata;
  beacons: Beacons;
  templates: Templates;
  deployments: Deployments;
  ois: Oises;
}

export interface OperationsRepository {
  apis: Record<string, Api>; // TODO derive key from Api name in metadata
  documentation: Documentation;
}

export interface BeaconDocumentation {
  beaconId: string;
  name: string;
  description: string;
  oisTitle: string;
  decodedParameters: ApiCallParameters[];
  chains: string[];
}

export type ChainName = string;
export type ContractName = string;
export type ContractAddress = string;
export type ApiName = string;

// Only active beacons
export interface Documentation {
  beacons: Record<ApiName, BeaconDocumentation>;
  chains: Record<ChainName, Record<ContractName, ContractAddress>>; // TODO implement
}
