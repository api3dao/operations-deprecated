import { mkdirSync, renameSync, rmdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { format } from 'prettier';
import { OperationsRepository } from '../types';
import { PRETTIER_CONFIG } from '../constants';

const writeBaseDirectory = (basePath: string, payload: any, name: string) => {
  if (payload[name]) {
    const thisBasePath = join(basePath, name);

    mkdirSync(thisBasePath, { recursive: true });
    Object.entries(payload[name]).forEach(([name, value]) =>
      writeJsonFile(join(thisBasePath, name), value)
    );
  }
};

export const writeOperationsRepository = (
  payload: OperationsRepository,
  targetBasePath = join(__dirname, '..', '..', 'data')
) => {
  const tmpBasePath = join(__dirname, '..', '..', 'tmpData');

  try {
    rmdirSync(tmpBasePath, { recursive: true });
    mkdirSync(join(tmpBasePath, 'apis'), { recursive: true });

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

      Object.entries(api.deployments).forEach(([directoryName, deployments]) => {
        const subDeploymentBasePath = join(deploymentsBasePath, directoryName);
        mkdirSync(subDeploymentBasePath);
        Object.entries(deployments).forEach(([deploymentName, deployment]) => {
          const deploymentBasePath = join(subDeploymentBasePath, deploymentName);
          mkdirSync(deploymentBasePath);
          Object.entries(deployment).forEach(([filename, configContent]) => {
            writeJsonFile(join(deploymentBasePath, filename), configContent);
          });
        });
      });
    });

    const api3BasePath = join(tmpBasePath, 'api3');

    if (payload.api3) {
      mkdirSync(api3BasePath, { recursive: true });
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

    writeBaseDirectory(tmpBasePath, payload, 'chains');
    writeBaseDirectory(tmpBasePath, payload, 'dapis');
    writeBaseDirectory(tmpBasePath, payload, 'explorer');
    writeBaseDirectory(tmpBasePath, payload, 'subscriptions');

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
