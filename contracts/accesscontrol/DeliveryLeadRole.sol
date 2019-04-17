pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'DeliveryLeadRole' to manage this role - add, remove, check
contract DeliveryLeadRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event DeliveryLeadAdded (address _address);
  event DeliveryLeadRemoved (address _address);
  
  // Define a struct 'DeliveryLead' by inheriting from 'Roles' library, struct Role
  Roles.Role private deliveryLead ;

  // In the constructor make the address that deploys this contract the 1st DeliveryLead
  constructor() public {
    _addDeliveryLead(msg.sender);
    
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyDeliveryLead() {
    require(isDeliveryLead(msg.sender),"Only Delivery Lead is alllowed to perform this function");
    _;
  }

  // Define a function 'isDeliveryLead' to check this role
  function isDeliveryLead(address _address) public view returns (bool) {
    return deliveryLead.has(_address);
  }

  // Define a function 'addDeliveryLead' that adds this role
  function addDeliveryLead(address _address) public onlyDeliveryLead {
    _addDeliveryLead(_address);
  }

  // Define a function 'renounceDeliveryLead' to renounce this role
  function renounceDeliveryLead() public {
    _removeDeliveryLead(msg.sender);
  }

  // Define an internal function '_addDeliveryLead' to add this role, called by 'addDeliveryLead'
  function _addDeliveryLead(address _address) internal {
    deliveryLead.add(_address);
    emit DeliveryLeadAdded(_address);
  }

  // Define an internal function '_removeDeliveryLead' to remove this role, called by 'removeDeliveryLead'
  function _removeDeliveryLead(address _address) internal {
    deliveryLead.remove(_address);
    emit DeliveryLeadRemoved(_address);
  }
}