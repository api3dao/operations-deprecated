// Trimmed from Telemetry Apps
export interface ChainDescriptor {
  name: ChainName;
  version: ContractDeploymentVersion;
}

export interface ChainMetadata {
  namedVersion: ChainDescriptor;
  sponsor?: string;
  apiProviderAirkeeperDeviationPercentage?: number;
  apiProviderAirkeeperSponsor?: number;
}

export interface RrpPspBeaconDescriptor {
  templateId: string;
  name: string;
  description?: string;
  parameters: string;
  beaconId: string;
  decodedParameters: { type: string; name: string; value: string }[];
  chains: ChainDescriptor[];
  filename?: string;
}

export interface TemplateDescriptor {
  templateId: string;
  endpointId: string;
  airnode: string;
  parameters: string;
  decodedParameters: { name: string; type: string; value; string }[];
  chains: ChainMetadata[];
}

export interface ProtoPspBeaconDescriptor {
  beaconId: string;
  name: string;
  description: string;
  apiName: string;
  templateId: string;

  conditions: {
    description: string; // 'A deviation of 5%'
    _conditionFunctionId: string; // ideally the documentation should link to the contract via Etherscan so
    _conditionParameters: string; // users can read the condition fn code
  };
  chains: ChainMetadata[];
}

export type ChainName = string;
export type ContractName = string;
export type ContractDeploymentVersion = string;
export type ContractAddress = string;

export type ContractInstanceSet = Record<ContractName, ContractAddress>;
export type VersionedContractDeployment = Record<ContractDeploymentVersion, ContractInstanceSet>;

export interface Documentation {
  protoPsp: ProtoPspBeaconDescriptor[];
  rrpPsp: RrpPspBeaconDescriptor[];
  contracts: Record<ChainName, VersionedContractDeployment>;
}
