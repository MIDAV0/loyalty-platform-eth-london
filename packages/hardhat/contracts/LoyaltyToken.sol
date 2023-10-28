// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner, string memory _tokenName, string memory _tokenSymbol)
        ERC20(_tokenName, _tokenSymbol)
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
