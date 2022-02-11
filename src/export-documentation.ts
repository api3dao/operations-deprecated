import { join } from 'path';
import { readdirSync, rmSync, writeFileSync } from 'fs';
import { readJsonDirectoryAsArray, readJsonFile } from './utils';
import { BeaconDescriptor, TemplateDescriptor } from './types';

const exportDocumentation = () => {
  const dataBasePath = join(__dirname, '..', 'data');
  const apisBasePath = join(dataBasePath, 'apis');

  const beacons = readdirSync(apisBasePath).flatMap((apiName) => {
    const templates = readJsonDirectoryAsArray(
      join(apisBasePath, apiName, 'templates')
    ) as unknown as TemplateDescriptor[];
    const beacons = readJsonDirectoryAsArray(join(apisBasePath, apiName, 'beacons')) as unknown as BeaconDescriptor[];

    return beacons.map((beacon) => {
      return {
        ...beacon,
        apiName,
        chains: beacon.chains.map((chain) => chain.name),
        templateName: beacon.templateName,
        filename: undefined,
        parameters: undefined,
        decodedParameters: templates.find((template) => template.templateId === beacon.templateId).parameters,
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
