import { existsSync } from 'fs';
import path from 'path';

export const sanitiseFilename = (filename: string) => {
  const illegalRe = /[\/?<>\\:*|"]/g;
  // eslint-disable-next-line no-control-regex
  const controlRe = /[\x00-\x1f\x80-\x9f]/g;
  const reservedRe = /^\.+$/;
  const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;

  return filename
    .replace(illegalRe, '_')
    .replace(controlRe, '_')
    .replace(reservedRe, '_')
    .replace(windowsReservedRe, '_')
    .toLowerCase();
};

export const loadCredentials = () => {
  const chainsPath = path.resolve(__dirname, '../../chain');
  if (existsSync(path.join(chainsPath, 'credentials.json'))) {
    return require(path.join(chainsPath, 'credentials.json'));
  }
  return require(path.join(chainsPath, 'credentials.example.json'));
};
