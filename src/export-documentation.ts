import { join } from 'path';
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';

// TODO from the telemetry apps
interface BeaconDescriptor {
  readonly templateId: string;
  readonly parameters: string;
  readonly beaconId: string;
  readonly decodedParameters: { type: string; name: string; value: string }[];
  readonly templateName: string;
  readonly description: string;
  readonly chains: ChainDescriptor[];
}

export interface ChainDescriptor {
  readonly name: string;
}

export const readJsonFile = (filePath: string) => JSON.parse(readFileSync(filePath).toString('utf8'));

export const readJsonDirectoryAsArray = (directoryPath: string): Partial<FilePayload[]> =>
  readdirSync(directoryPath).map((filename) => ({
    ...readJsonFile(join(directoryPath, filename)),
    filename,
  }));

interface FilePayload {
  readonly filename: string;
}

const toTitleCase = (phrase: string) =>
  phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const exportDocumentation = () => {
  const dataBasePath = join(__dirname, '..', 'data');
  const apisBasePath = join(dataBasePath, 'apis');

  const beacons = readdirSync(apisBasePath).flatMap((apiName) => {
    const beacons = readJsonDirectoryAsArray(join(apisBasePath, apiName, 'beacons')) as unknown as BeaconDescriptor[];

    return beacons.map((beacon) => {
      return {
        ...beacon,
        apiName,
        chains: beacon.chains.map((chain) => chain.name),
        templateName: toTitleCase(beacon.templateName),
        filename: undefined,
        parameters: undefined,
      };
    });
  });

  const chains = readJsonFile(join(dataBasePath, 'chains.json'));

  const documentationOutput = {
    beacons,
    chains,
  };

  const documentationPath = join(dataBasePath, 'documentation_metadata.json');
  rmSync(documentationPath, { force: true });
  writeFileSync(documentationPath, JSON.stringify(documentationOutput, null, 2));
};

try {
  exportDocumentation();
} catch (e) {
  console.error(`An error occurred, please investigate and fix before committing:`);
  console.trace(e);
}
