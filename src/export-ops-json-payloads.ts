import { join } from 'path';
import fs, { mkdirSync } from 'fs';
import * as child_process from 'child_process';
import { readOperationsRepository } from './utils/read-operations';
import { writeJsonFile } from './utils/write-operations';
import { sanitiseFilename } from './utils/filesystem';

const main = async () => {
  const commitHash = child_process.execSync('git rev-parse HEAD').toString().trim();

  const basePath = join(__dirname, '../json-exports');
  fs.rmdirSync(basePath, { recursive: true });
  fs.mkdirSync(basePath);

  const opsFull = await readOperationsRepository();

  writeJsonFile(join(basePath, 'operations.json'), opsFull);

  Object.entries(opsFull).map(([key, value]) => {
    writeJsonFile(join(basePath, `${key}.json`), value);
  });

  // docs.api3.org Dependency: Generate a compound file with all templates in it
  const allTemplates = Object.fromEntries(
    Object.values(opsFull.apis)
      .flatMap((api) => Object.values(api.templates))
      .map((template) => [template.templateId, template])
  );
  writeJsonFile(join(basePath, `templates.json`), allTemplates);

  // docs.api3.org Dependency: generate a directory with all templates in it
  const templatesBasePath = join(basePath, 'templates');
  fs.mkdirSync(templatesBasePath);

  Object.values(allTemplates).forEach((template) =>
    writeJsonFile(join(templatesBasePath, `${template.templateId}.json`), template)
  );

  const dapisBasePath = join(basePath, 'dapis');
  mkdirSync(dapisBasePath);
  Object.entries(opsFull.dapis).forEach(([key, value]) => writeJsonFile(join(dapisBasePath, `${key}.json`), value));

  const documentation = {
    beacons: Object.fromEntries(
      Object.entries(opsFull.apis)
        .filter(([_key, value]) => value.apiMetadata.active)
        .map(([apiKey, api]) => [
          apiKey,
          Object.entries(api.beacons)
            .filter(([_key, value]) => Object.values(value.chains).filter((chain) => chain.active).length > 0)
            .map(([_, beacon]) => ({
              beaconId: beacon.beaconId,
              name: beacon.name,
              description: beacon.description,
              templateUrl: `https://github.com/api3dao/operations/blob/main/data/apis/${apiKey}/templates/${
                Object.entries(api.templates).find(([_key, template]) => template.templateId === beacon.templateId)![0]
              }.json`,
              chains: Object.entries(beacon.chains).reduce(
                (acc, [chainName, chain]) => ({
                  ...acc,
                  [chainName]: {
                    airkeeperDeviationThreshold: chain.updateConditionPercentage,
                    airseekerDeviationThreshold: chain?.airseekerConfig?.deviationThreshold,
                  },
                }),
                {}
              ),
            })),
        ])
        .filter(([_key, value]) => value.length > 0)
    ),
    chains: opsFull.chains,
  };

  writeJsonFile(join(basePath, 'documentation.json'), documentation);

  const documentationAlternative = {
    providers: Object.fromEntries(
      Object.values(opsFull.apis).map((api) => [
        api.apiMetadata.name,
        {
          homepage: api.apiMetadata.homepage,
          logo: api.apiMetadata.logoPath,
        },
      ])
    ),
    chains: opsFull.chains,
    templates: Object.fromEntries(
      Object.values(opsFull.apis)
        .flatMap((api) =>
          Object.values(api.templates).map((template) => ({
            ...template,
            apiName: api.apiMetadata.name,
          }))
        )
        .map((template) => [
          template.templateId,
          {
            ...template,
            templateUrl: `https://github.com/api3dao/operations/blob/${commitHash}/data/apis/${sanitiseFilename(
              template.apiName
            )}/templates/${template.templateId}.json`,
          },
        ])
    ),
    dataFeeds: Object.fromEntries(
      Object.values(opsFull.apis)
        .flatMap((api) => Object.values(api.beacons))
        .map((beacon) => [beacon.beaconId, beacon])
    ),
  };

  writeJsonFile(join(basePath, 'documentation-alternative.json'), documentationAlternative);
};

try {
  main();
} catch (e) {
  const err = e as Error;

  console.error('An error occurred while writing JSON payloads:', err.message);
  console.error(err.stack);

  process.exit(1);
}
