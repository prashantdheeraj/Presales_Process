const BidProcess = artifacts.require('./BidProcess.sol')
const Ownable = artifacts.require('./Ownable.sol')

module.exports = function (deployer) {
  deployer.deploy(BidProcess);
  //deployer.deploy(Ownable);

}
