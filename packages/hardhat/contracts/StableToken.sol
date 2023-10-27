//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @author Murat Saglam, Rordigo Pavezi, Ben Dumoulin
 * @title The FLOCK Token used to incentivise contributions to the FL Models
 *        and to pay for FL Model preidctions.
 */

contract StableToken is ERC20 {
    constructor() ERC20("USDC", "USDC") {
        _mint(msg.sender, 1000000 * 1e18);
    }

    function mint(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }

    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
    }
}