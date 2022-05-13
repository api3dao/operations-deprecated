# Development Usage Notes

> How to use operations in other projects

Operations is both a directory hierarchy containing metadata related to beacons and also a set of libraries to read,
validate, normalize, write and manipulate that data.

Common use cases are reading operations as a JSON payload and display that data in a UI in some way.

Below are examples of how to achieve that and a general demonstration of the relationships between data.

### The following commands assume an empty directory and the creation of a project

```shell
# Initialise the new project
yarn init
# You'll be prompted to enter various info about your project

# Install the published operations package
yarn add @api3/operations

# You may also want Typescript
yarn add typescript ts-node @types/node -D
```

Create a demo application file to execute:

```shell
mkdir scripts
touch scripts/export.js
```

Edit scripts/export.js

Import the dependency into your application:

```javascript
const { readOperationsRepository } = require('@api3/operations/dist/utils/read-operations');

// We'll also import two more Node modules for this demo
const fs = require('fs');
const path = require('path');
```

Read the operations repository into a compound object:

```javascript
const operations = readOperationsRepository();
```

Write out the object to a JSON payload: (this file will contain the entirety of operations metadata as a single JSON
file)

```javascript
fs.writeFileSync(path.join(__dirname, '../opsexport.json'), JSON.stringify(operations, null, 2));
```

To list provider names:

```javascript
console.log(Object.keys(operations.apis));
```

To list beacons ids on a provider:

```javascript
console.log(Object.values(operations.apis['amberdata'].beacons).map((beacon) => beacon.beaconId));
```

To find a beacon by it's ID across all providers:

```javascript
const beaconIdToFind = '0xc7d143e56da695e6d63f9c408932378e9130486fbb1c2bb8a8a9f74c9bbdf2d2';

const beaconFull = Object.values(operations.apis)
  .flatMap((api) => Object.values(api.beacons))
  .find((beacon) => beacon.beaconId === beaconIdToFind);

console.log(beaconFull);
```

To get the deviation percentage for Airkeeper for a beaconId for chain RSK:

```javascript
console.log(beaconFull.chains['rsk'].updateConditionPercentage);
```

To get the template for that beacon:

```javascript
const templateIdToFind = beaconFull.templateId;
const templateFull = Object.values(operations.apis)
  .flatMap((api) => Object.values(api.templates))
  .find((template) => template.templateId === templateIdToFind);

console.log(templateFull);
```

EVM chains do not have floating point variable types and therefore all decimal values are stored as whole numbers.
Airnode multiplies a decimal value from an API endpoint with a `_times` factor. `_times` is an Airnode Reserved
Parameter. For more information, refer to the [API3 Docs](https://docs.api3.org/ois/v1.0.0/reserved-parameters.html)

To get the multiplication factor in the associated template:

```javascript
console.log(templateFull.decodedParameters.find((param) => param.name === '_times').value);
```

To get the logo of an API provider:

```javascript
console.log(operations.apis['amberdata'].apiMetadata.logoPath);
```

To get the pretty name of a beacon:

```javascript
console.log(beaconFull.name);
```

and the pretty description:

```javascript
console.log(beaconFull.description);
```

To print a list of chains and their logos:

```javascript
console.log(
  Object.values(operations.chains).map((chain) => ({
    name: chain.name,
    logo: chain.logoPath,
    dapiServer: chain.contracts.DapiServer,
  }))
);
```

Print a list of Dapis (name->beaconId mappings) on Polygon:

```javascript
console.log(Object.entries(operations.dapis));
```
