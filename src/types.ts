import { Config, ApiCallParameters } from '@api3/airnode-node';
import { OIS } from '@api3/airnode-ois';
import { Config as AirkeeperConfig } from '@api3/airkeeper/dist/src/types';

export type WalletType = 'Provider' | 'API3';

export interface TopUpWallet {
  walletType: WalletType;
  address: string;
}

export interface ExtendedChainDescription {
  active: boolean;
  name: ChainName; // TODO check that the chain is available in the top level chains object
  sponsor: string;
  topUpWallets: TopUpWallet[];
}

export interface Beacon {
  name: string;
  description: string;
  beaconId: string;
  airnodeAddress: string; // TODO verify in apiMetadata
  templateId: string; // TODO verify exists in templates
  updateConditionPercentage: number;
  chains: ExtendedChainDescription[];
  signedKeeperConditions: {
    updateConditionPercentage: number;
  };
}

export type Beacons = Record<string, Beacon>;

export interface DeploymentSet {
  config: Config;
  airkeeper: AirkeeperConfig;
  secrets: { content: string };
}
export type Deployments = Record<string, DeploymentSet>;

export interface Template {
  name: string;
  templateId: string;
  endpointId: string;
  parameters: string;
  decodedParameters: Record<string, string>;
}

export type Templates = Record<string, Template>;

export type Oises = Record<string, OIS>;

export interface ApiMetadata {
  name: string;
  contact?: string;
  description?: string;
  active: boolean;
  airnode: string; // TODO these are related, so check
  xpub: string; // TODO these are related, so check
  logoPath: string;
}

export interface Api {
  apiMetadata: ApiMetadata;
  beacons: Beacons;
  templates: Templates;
  deployments: Deployments;
  ois: Oises;
}

export type ChainName = string;
export type ContractName = string;
export type ContractAddress = string;
export type ApiName = string;

export interface BeaconDocumentation {
  beaconId: string;
  name: string;
  description: string;
  oisTitle: string;
  decodedParameters: ApiCallParameters[];
  templateUrl: string;
  chains: string[];
}

export interface ChainMetadata {
  name: string;
  id: string;
  contracts: Record<ContractName, ContractAddress>;
  nativeToken: string;
  blockTime: number;
  logoPath?: string;
}

export interface Documentation {
  beacons: Record<ApiName, BeaconDocumentation[]>;
  chains: Record<ChainName, ChainMetadata>;
}

export interface OperationsRepository {
  apis: Record<string, Api>;
  documentation: Documentation;
  chains: Record<ChainName, ChainMetadata>;
}
