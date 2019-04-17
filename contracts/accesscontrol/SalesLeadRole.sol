pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'SalesLeadRole' to manage this role - add, remove, check
contract SalesLeadRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing

  //PD: Event: Added SalesLead
  event SalesLeadAdded(address _address);

  //PD: Event: Removed SalesLead
  event SalesLeadRemoved(address _address);


  // Define a struct 'SalesLead' by inheriting from 'Roles' library, struct Role
  Roles.Role private salesLead ;  

  // In the constructor make the address that deploys this contract the 1st SalesLead
  constructor() public {
    _addSalesLead(msg.sender);
    
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlySalesLead() {
    require(isSalesLead(msg.sender),"Only Sales Lead is alllowed to perform this function");
    _;
  }

  // Define a function 'isSalesLead' to check this role
  function isSalesLead(address _address) public view returns (bool) {
    return salesLead.has(_address);
  }

  // Define a function 'addSalesLead' that adds this role
  function addSalesLead(address _address) public onlySalesLead {
    _addSalesLead(_address);
  }

  // Define a function 'renounceSalesLead' to renounce this role
  function renounceSalesLead() public {
    _removeSalesLead(msg.sender);
  }

  // Define an internal function '_addSalesLead' to add this role, called by 'addSalesLead'
  function _addSalesLead(address _address) internal {
    salesLead.add(_address);
    emit SalesLeadAdded(_address);
  }

  // Define an internal function '_removeSalesLead' to remove this role, called by 'removeSalesLead'
  function _removeSalesLead(address _address) internal {
    salesLead.remove(_address);
    emit SalesLeadRemoved(_address);
  }
}