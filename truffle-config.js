const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "./client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    }, 
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          "",
          "https://ropsten.infura.io/v3/d5a734e233914fd883397f754561d61e"
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3
    }
  }
};
