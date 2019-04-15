const BidProcess = artifacts.require('./BidProcess.sol')

module.exports = function (deployer) {
  deployer.deploy(BidProcess)
}
