import { runAndHandleErrors } from '../utils/cli';
import { readOperationsRepository } from '../utils/read-operations';
import { writeOperationsRepository } from '../utils/write-operations';

/**
 * Adds beacons that are present in data/apis/** to data/market/beaconMetadata.
 *
 * Be sure to fix after running this script.
 */
const main = async () => {
  const operations = readOperationsRepository();

  const missingBeacons = Object.values(operations.apis)
    .flatMap((api) => Object.values(api.beacons))
    .filter((beacon) => !Object.keys(operations.market.beaconMetadata).includes(beacon.beaconId))
    .map((beacon) => [
      beacon.beaconId,
      {
        category: 'Cryptocurrency',
        pricingCoverage: 'freshly-added-please-fix',
      },
    ]);

  const revisedOperations = {
    ...operations,
    market: {
      ...operations.market,
      beaconMetadata: {
        ...operations.market.beaconMetadata,
        ...Object.fromEntries(missingBeacons),
      },
    },
  };

  writeOperationsRepository(revisedOperations);
};

if (require.main === module) runAndHandleErrors(main);

export { main as addMissingBeaconMetadata };
