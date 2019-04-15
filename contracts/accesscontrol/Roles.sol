
pragma solidity ^0.5.0;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
 
library Roles {
	
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an account access to this role
   */

  function add(Role storage role, address account) internal {
    require(account != address(0));       //account is not the contract owner
    require(!has(role, account));         //account does'nt hold this role

    role.bearer[account] = true;          //provide the account with this role
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    require(account != address(0));         //account is not the contract owner
    require(has(role, account));            //account is not the contract owner

    role.bearer[account] = false;           //take away the role from the account
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0));     //account is not the contract owner
    return role.bearer[account];        // checks if the account holds the role
  }
}