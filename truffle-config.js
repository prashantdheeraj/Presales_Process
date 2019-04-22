const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require("web3");
var mnemonic = "";
var mnemonicRinkeby = "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
     // provider: () => new HDWalletProvider(mnemonic, `https://127.0.0.1`),
      port: 7545,
      network_id: '*',
      gas: 6500000
    },

    rinkeby: {
      provider:  () => new HDWalletProvider(mnemonicRinkeby, `https://rinkeby.infura.io/v3/`),
      //from: '0x1213eA0da8B016978E37Bf93CECF66eA2f155A74',
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }

  },
  compilers: {
    solc: {
      version: "^0.5.0"
    }
  }
};

