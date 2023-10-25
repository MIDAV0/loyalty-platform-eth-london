//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/**
    * @title LoyaltyContract
    * @dev This contract is used for the loyalty program
    * @author Vadzim Mahilny
 */

 /**
    Also create a factory contract that will store all deployed shops data

    Each shop will deploy a new contract through the factory
    The contract will be used to track the loyalty points of the customers

    Functions which business can specify in their contract while deploying:

    - Send points to a customer when contract recieves a payment
    - Refer a friend to get points
    - Do social quests to get points

  */
 contract LoyaltyContract is Ownable {

    // Receive currencies ETH, USDT
    address ERC20Token;

    uint256 public tokenToPointsRatio;

    struct Customer {
        address customerAddress;
        uint256 joinedAt;
        uint256 loyaltyRank;
        uint256 points;
    }

    mapping(address => Customer) public customers;

    constructor(uint256 _tokenToPointsRatio, address _ERC20Token) {
        tokenToPointsRatio = _tokenToPointsRatio;
        ERC20Token = _ERC20Token;
    }

    function setTokenToPointsRatio(uint256 _tokenToPointsRatio) public onlyOwner {
        tokenToPointsRatio = _tokenToPointsRatio;
    }

    function joinLoyaltyProgram() public {
        // Check if customer is already in the loyalty program
        require(customers[msg.sender].customerAddress == address(0), "Customer is already in the loyalty program");

        // Add customer to the loyalty program
        customers[msg.sender] = Customer(msg.sender, block.timestamp, 0, 0);
    }

    function checkIfUserJoined() public view returns (bool) {
        return customers[msg.sender].customerAddress != address(0);
    }

    function purchaseNative(uint256 amount) external payable {
        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Check if customer sent enough tokens
        require(msg.value >= amount, "Not enough tokens sent");

        // Calculate points
        uint256 points = amount * tokenToPointsRatio;

        // Add points to the customer
        customers[msg.sender].points += points;
    }

    function purchaseToken(uint256 amount) external {
        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Transfer tokens from customer to contract
        require(IERC20(ERC20Token).transferFrom(msg.sender, address(this), amount), "Tokens transfer failed");

        // Calculate points
        uint256 points = amount * tokenToPointsRatio;

        // Add points to the customer
        customers[msg.sender].points += points;
    }

 }