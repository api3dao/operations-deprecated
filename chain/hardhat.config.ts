require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');

const fs = require('fs');
let credentials = require('./credentials.example.json');
if (fs.existsSync('./credentials.json')) {
  credentials = require('./credentials.json');
}

module.exports = {
  etherscan: credentials.etherscan,
  networks: credentials.networks,
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};
