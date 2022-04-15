import { mkdirSync, renameSync, rmdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { format } from 'prettier';
import { sanitiseFilename } from './filesystem';
import { OperationsRepository } from '../types';
import { PRETTIER_CONFIG } from '../constants';

export const writeOperationsRepository = (
  payload: OperationsRepository,
  targetBasePath = join(__dirname, '..', '..', 'data')
) => {
  const tmpBasePath = join(__dirname, '..', '..', 'tmpData');

  try {
    rmdirSync(tmpBasePath, { recursive: true });
    mkdirSync(join(tmpBasePath, 'apis'), { recursive: true });
    writeJsonFile(join(tmpBasePath, 'documentation.json'), payload.documentation);

    Object.entries(payload.apis).forEach(([filename, api]) => {
      const apiBasePath = join(tmpBasePath, 'apis', filename);
      const deploymentsBasePath = join(apiBasePath, 'deployments');

      mkdirSync(apiBasePath);
      mkdirSync(join(apiBasePath, 'beacons'));
      mkdirSync(deploymentsBasePath);
      mkdirSync(join(apiBasePath, 'templates'));
      mkdirSync(join(apiBasePath, 'ois'));

      writeJsonFile(join(apiBasePath, 'apiMetadata.json'), api.apiMetadata);

      // TODO abstract this
      Object.entries(api.beacons).forEach(([filename, beacon]) => {
        writeJsonFile(join(apiBasePath, 'beacons', filename), beacon);
      });
      Object.entries(api.templates).forEach(([filename, template]) => {
        writeJsonFile(join(apiBasePath, 'templates', filename), template);
      });
      Object.entries(api.ois).forEach(([filename, ois]) => {
        writeJsonFile(join(apiBasePath, 'ois', filename), ois);
      });

      Object.entries(api.deployments).forEach(([directoryName, deployment]) => {
        const subDeploymentBasePath = join(deploymentsBasePath, directoryName);
        mkdirSync(subDeploymentBasePath);
        Object.entries(deployment).forEach(([filename, configContent]) => {
          writeJsonFile(join(subDeploymentBasePath, filename), configContent);
        });
      });
    });

    const chainsBasePath = join(tmpBasePath, 'chains');
    mkdirSync(join(tmpBasePath, 'chains'), { recursive: true });
    Object.entries(payload.chains).forEach(([_, chain]) => {
      writeJsonFile(join(chainsBasePath, sanitiseFilename(chain.name)), chain);
    });

    const api3BasePath = join(tmpBasePath, 'api3');
    mkdirSync(api3BasePath, { recursive: true });
    const airseekerBasePath = join(api3BasePath, 'airseeker');
    mkdirSync(airseekerBasePath, { recursive: true });

    Object.entries(payload.api3.airseeker).forEach(([filename, airseekerConfigs]) => {
      const airseekerConfigBasePath = join(airseekerBasePath, filename);
      mkdirSync(airseekerConfigBasePath);
      Object.entries(airseekerConfigs).forEach(([filename, airseekerConfig]) => {
        writeJsonFile(join(airseekerConfigBasePath, filename), airseekerConfig);
      });
    });

    rmdirSync(targetBasePath, { recursive: true });
    renameSync(tmpBasePath, targetBasePath);
  } catch (e) {
    console.error('An error occurred while writing the operations repository data structure: ', e);
    console.trace(e);

    rmdirSync(tmpBasePath, { recursive: true });
  }
};

export const writeJsonFile = (path: string, payload: any) => {
  if (payload.filename && payload.content) {
    const extension = payload.filename.split('.').pop();
    writeFileSync(`${path}.${extension}`, payload.content);
    return;
  }

  const extension = path.indexOf('.json') === -1 ? '.json' : '';

  const prettierJson = format(JSON.stringify(payload), { semi: false, parser: 'json', ...PRETTIER_CONFIG });
  writeFileSync(`${path}${extension}`, prettierJson);
};
