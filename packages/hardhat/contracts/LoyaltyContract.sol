//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./LoyaltyToken.sol";
import "./LoyaltyNFT.sol";
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
    address LoyaltyToken;
    address LoyaltyNFT;

    uint256 public totalRewards = 1;

    uint256 public tokenToPointsRatio;
    uint256 private contractNativeBalance;
    uint256 private contractTokenBalance;

    uint256 public totalPointsRedeemed = 0;

    struct Customer {
        address customerAddress;
        uint256 joinedAt;
        uint256 loyaltyRank;
        uint256 points;
    }

    struct Reward {
        bool isActive;
        uint256 rewardId;
        uint256 rewardCost;
        string rewardName;
        string rewardURI;
    }

    struct Shop {
        bool paymentReward;
        bool referralReward;
        address owner;
    }

    Shop public shop;

    mapping(address => Customer) public customers;
    mapping(uint256 => Reward) public rewards;

    constructor(
            bool _paymentReward,
            bool _referralReward,
            address _ERC20Token,
            uint256 _tokenToPointsRatio,
            string memory _tokenName,
            string memory _tokenSymbol
        )
    {
        tokenToPointsRatio = _tokenToPointsRatio;
        ERC20Token = _ERC20Token;
        LoyaltyToken = new LoyaltyToken(msg.sender, _tokenName, _tokenSymbol);
        LoyaltyNFT = new LoyaltyNFT(msg.sender, _tokenName, _tokenSymbol);
        shop = Shop(_paymentReward, _referralReward, msg.sender);
    }

    function setActivatedRewards(bool _paymentReward, bool _referralReward) public onlyOwner {
        shop.paymentReward = _paymentReward;
        shop.referralReward = _referralReward;
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
        // Check if rewards are activated
        require(shop.paymentReward, "Payment rewards are not activated");

        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Check if customer sent enough tokens
        require(msg.value >= amount, "Not enough tokens sent");

        // Calculate points
        uint256 points = amount * tokenToPointsRatio;

        // Add points to the customer
        require(LoyaltyToken.mint(msg.sender, points), "Minting failed");

        // Add points to the customer
        customers[msg.sender].points += points;
    }

    function purchaseToken(uint256 amount) external {
        // Check if rewards are activated
        require(shop.paymentReward, "Payment rewards are not activated");

        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Transfer tokens from customer to contract
        require(IERC20(ERC20Token).transferFrom(msg.sender, address(this), amount), "Tokens transfer failed");

        // Calculate points
        uint256 points = amount * tokenToPointsRatio;

        // Add points to the customer
        require(LoyaltyToken.mint(msg.sender, points), "Minting failed");

        // Add points to the customer
        customers[msg.sender].points += points;
    }

    function addReward(uint256 rewardCost, string memory rewardName, string memory rewardURI) public onlyOwner {
        // Add reward to the contract
        rewards[totalRewards] = Reward(true, totalRewards, rewardCost, rewardName, rewardURI);

        // Increment total rewards
        totalRewards++;
    }

    function deactivateReward(uint256 rewardId) public onlyOwner {
        // Check if reward exists
        require(rewards[rewardId].rewardId != 0, "Reward does not exist");

        // Deactivate reward
        rewards[rewardId].isActive = false;
    }

    function activateReward(uint256 rewardId) public onlyOwner {
        // Check if reward exists
        require(rewards[rewardId].rewardId != 0, "Reward does not exist");

        // Activate reward
        rewards[rewardId].isActive = true;
    }

    function redeemReward(uint256 rewardId, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Check if reward exists
        require(rewards[rewardId].rewardId != 0 && rewards[rewardId].isActive, "Reward does not exist");

        uint256 amount = rewards[rewardId].rewardCost;

        // Check if customer has enough points
        require(customers[msg.sender].points >= amount, "Not enough points");

        // Issue reward NFT to the customer
        LoyaltyToken.permit(msg.sender, address(this), amount, deadline, v, r, s);
        LoyaltyToken.transferFrom(msg.sender, address(this), amount);
        totalPointsRedeemed += rewards[rewardId].rewardCost;

        // Issue reward NFT to the customer
        LoyaltyNFT.safeMint(msg.sender, rewards[rewardId].rewardURI);

        // Subtract points from the customer
        customers[msg.sender].points -= amount;
    }
 }