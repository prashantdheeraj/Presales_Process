pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'BidManagerRole' to manage this role - add, remove, check
contract BidManagerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event BidManagerAdded (address _address);
  event BidManagerRemoved (address _address);
  
  // Define a struct 'BidManager' by inheriting from 'Roles' library, struct Role
  Roles.Role private bidManager;
 

  // In the constructor make the address that deploys this contract the 1st BidManager
  constructor() public {
    _addBidManager(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyBidManager() {
    require(isBidManager(msg.sender));
    _;
  }

  // Define a function 'isBidManager' to check this role
  function isBidManager(address _address) public view returns (bool) {
   return bidManager.has(_address);
    
  }

  // Define a function 'addBidManager' that adds this role
  function addBidManager(address _address) public onlyBidManager {
      _addBidManager(_address);
    
  }

  // Define a function 'renounceBidManager' to renounce this role
  function renounceBidManager() public {
     _removeBidManager(msg.sender);
  }

  // Define an internal function '_addBidManager' to add this role, called by 'addBidManager'
  function _addBidManager(address _address) internal {
    bidManager.add(_address);
    emit BidManagerAdded(_address); 
  }

  // Define an internal function '_removeBidManager' to remove this role, called by 'removeBidManager'
  function _removeBidManager(address _address) internal {
    bidManager.remove(_address);
    emit BidManagerRemoved(_address);
    
  }
}