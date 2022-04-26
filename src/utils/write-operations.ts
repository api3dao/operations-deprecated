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

    {
      const chainsBasePath = join(tmpBasePath, 'chains');
      mkdirSync(join(tmpBasePath, 'chains'), { recursive: true });
      Object.entries(payload.chains).forEach(([_, chain]) => {
        writeJsonFile(join(chainsBasePath, sanitiseFilename(chain.name)), chain);
      });
    }

    const api3BasePath = join(tmpBasePath, 'api3');
    mkdirSync(api3BasePath, { recursive: true });

    {
      payload.api3 &&
        Object.entries(payload.api3).forEach(([filename, api3directory]) => {
          const api3directoryBasePath = join(api3BasePath, filename);
          mkdirSync(api3directoryBasePath, { recursive: true });

          Object.entries(api3directory).forEach(([filename, api3config]) => {
            const api3configBasePath = join(api3directoryBasePath, filename);
            mkdirSync(api3configBasePath);
            Object.entries(api3config).forEach(([filename, api3configs]) => {
              writeJsonFile(join(api3configBasePath, filename), api3configs);
            });
          });
        });
    }

    if (payload.explorer) {
      const explorerBasePath = join(tmpBasePath, 'explorer');
      mkdirSync(join(tmpBasePath, 'explorer'), { recursive: true });
      Object.entries(payload.explorer).forEach(([name, explorer]) => {
        writeJsonFile(join(explorerBasePath, name), explorer);
      });
    }

    if (payload.dapis) {
      const dapisBasePath = join(tmpBasePath, 'dapis');
      mkdirSync(join(tmpBasePath, 'dapis'), { recursive: true });
      Object.entries(payload.dapis).forEach(([name, dapi]) => {
        writeJsonFile(join(dapisBasePath, name), dapi);
      });
    }

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
