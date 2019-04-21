const BidProcess = artifacts.require('./BidProcess.sol')
const Ownable = artifacts.require('./Ownable.sol')
const fs = require('fs');

module.exports = function (deployer) {
  deployer.deploy(BidProcess)
    .then(() => {
        let config = {
                        localhost: {
                            url: 'http://localhost:7545',
                            contractAddress: BidProcess.address
                        },
                        rinkeby: {
                          url: 'http://rinkeby.infura.io/v3/2cfe80b9874e44118e7aa2b7a7cc3b96',
                          contractAddress: BidProcess.address
                      }
                     };
          fs.writeFileSync(__dirname + '/../src/dapp/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
      });
}
