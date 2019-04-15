pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'SolutionArchitectRole' to manage this role - add, remove, check
contract SolutionArchitectRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event SolutionArchitectAdded(address _address);
  event SolutionArchitectRemoved(address _address);

  
  // Define a struct 'SolutionArchitect' by inheriting from 'Roles' library, struct Role
  Roles.Role private solutionArchitect ;

  // In the constructor make the address that deploys this contract the 1st SolutionArchitect
  constructor() public {
    _addSolutionArchitect(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlySolutionArchitect() {
    require(isSolutionArchitect(msg.sender));
    _;
  }

  // Define a function 'isSolutionArchitect' to check this role
  function isSolutionArchitect(address _address) public view returns (bool) {
    return solutionArchitect.has(_address);
  }

  // Define a function 'addSolutionArchitect' that adds this role
  function addSolutionArchitect(address _address) public onlySolutionArchitect {
    _addSolutionArchitect(_address);
  }

  // Define a function 'renounceSolutionArchitect' to renounce this role
  function renounceSolutionArchitect() public {
    _removeSolutionArchitect(msg.sender);
  }

  // Define an internal function '_addSolutionArchitect' to add this role, called by 'addSolutionArchitect'
  function _addSolutionArchitect(address _address) internal {
    solutionArchitect.add(_address);
    emit SolutionArchitectAdded(_address);
  }

  // Define an internal function '_removeSolutionArchitect' to remove this role, called by 'removeSolutionArchitect'
  function _removeSolutionArchitect(address _address) internal {
    solutionArchitect.remove(_address);
    emit SolutionArchitectRemoved(_address);
  }
}