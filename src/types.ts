// Trimmed from Telemetry Apps
export interface ChainDescriptor {
  readonly name: string;
}

export interface BeaconDescriptor {
  readonly templateId: string;
  readonly templateName: string;
  readonly description?: string;
  readonly parameters: string;
  readonly beaconId: string;
  readonly decodedParameters: { type: string; name: string; value: string }[];
  readonly chains: ChainDescriptor[];
  readonly filename?: string;
}

export interface TemplateDescriptor {
  readonly templateId: string;
  readonly endpointId: string;
  readonly airnode: string;
  readonly parameters: { name: string; type: string; value; string }[];
  readonly chains: string[];
}
