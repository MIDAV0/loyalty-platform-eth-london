//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

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
    LoyaltyToken loyaltyToken;
    LoyaltyNFT loyaltyNFT;

    bool public paymentReward;
    bool public referralReward;
    bool public buySomeGetSome;

    address public loyaltyTokenAddress;

    uint256 public totalRewards = 0;

    uint256 public tokenToPointsRatio;
    uint256 private contractNativeBalance;
    uint256 private contractTokenBalance;

    uint256 public totalPointsRedeemed = 0;

    // Points earned by refferal required to get a reward
    // If person you referred spends X tokens then you get Y points
    uint256 public refferalTokensToSpend;
    uint256 public refferalReward;

    string public tokenName;
    string public tokenSymbol;

    struct Referral {
        bool isClaimed;
        address referrer;
        uint256 amountSpent;
    }

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

    mapping(address => Customer) public customers;
    mapping(address => Referral) public referrals;
    mapping(uint256 => Reward) public rewards;

    constructor(
            bool _paymentReward,
            bool _referralReward,
            bool _buySomeGetSome,
            address initialOwner,
            address _ERC20Token,
            uint256 _tokenToPointsRatio,
            uint256 _refferalTokensToSpend,
            uint256 _refferalReward,
            string memory _tokenName,
            string memory _tokenSymbol
        )
        Ownable(initialOwner)
    {
        tokenToPointsRatio = _tokenToPointsRatio;
        refferalTokensToSpend = _refferalTokensToSpend;
        refferalReward = _refferalReward;
        ERC20Token = _ERC20Token;
        loyaltyToken = new LoyaltyToken(address(this), _tokenName, _tokenSymbol);
        loyaltyTokenAddress = address(loyaltyToken);
        loyaltyNFT = new LoyaltyNFT(address(this), _tokenName, _tokenSymbol);
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        paymentReward = _paymentReward;
        referralReward = _referralReward;
        buySomeGetSome = _buySomeGetSome;
    }

    // Set activated rewards
    function setActivatedRewards(
            bool _paymentReward,
            bool _referralReward,
            bool _buySomeGetSome,
            uint256 _tokenRatio,
            uint256 _refferalTokensToSpend,
            uint256 _refferalReward
        ) public onlyOwner {
        paymentReward = _paymentReward;
        referralReward = _referralReward;
        buySomeGetSome = _buySomeGetSome;
        if (_referralReward) {
            refferalTokensToSpend = _refferalTokensToSpend;
            refferalReward = _refferalReward;
        }
        if (_paymentReward) {
            tokenToPointsRatio = _tokenRatio;
        }
    }

    // Set token to points ratio
    function setTokenToPointsRatio(uint256 _tokenToPointsRatio) public onlyOwner {
        tokenToPointsRatio = _tokenToPointsRatio;
    }

    // Set referral rewards
    function setRefferalPoints(
        uint256 _refferalTokensToSpend,
        uint256 _refferalReward    
    ) public onlyOwner {
        refferalTokensToSpend = _refferalTokensToSpend;
        refferalReward = _refferalReward;
    }

    function joinLoyaltyProgram(address _referrer) public {
        // Check if customer is already in the loyalty program
        require(customers[msg.sender].customerAddress == address(0), "Customer is already in the loyalty program");

        // Check if customer is referred
        if (
            _referrer != address(0)
            && customers[_referrer].customerAddress != address(0)
            && _referrer != msg.sender
        ) {
            // Add referral to the contract
            referrals[msg.sender] = Referral(false, _referrer, 0);

            // Increase referrer loyalty rank
            customers[_referrer].loyaltyRank++;
        }

        // Add customer to the loyalty program
        customers[msg.sender] = Customer(msg.sender, block.timestamp, 1, 0);
    }

    function checkIfUserJoined() public view returns (bool) {
        return customers[msg.sender].customerAddress != address(0);
    }

    function addReferalRewards(uint256 amount) internal {
        // Check referal
        if (referralReward && referrals[msg.sender].referrer != address(0) && !referrals[msg.sender].isClaimed) {
            // Check if customer spent enough tokens
            if (referrals[msg.sender].amountSpent + amount >= refferalTokensToSpend) {
                // Add points to the referrer
                loyaltyToken.mint(referrals[msg.sender].referrer, refferalReward);

                // Mark referral as claimed
                referrals[msg.sender].isClaimed = true;
            }

            // Add spent tokens to the referral
            referrals[msg.sender].amountSpent += amount;
        }
    }

    function purchaseNative(uint256 amount) external payable {
        // Check if rewards are activated
        require(paymentReward, "Payment rewards are not activated");

        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Check if customer sent enough tokens
        require(msg.value >= amount, "Not enough tokens sent");

        addReferalRewards(amount);

        // Calculate points
        uint256 points = amount * tokenToPointsRatio;

        // Add points to the customer
        loyaltyToken.mint(msg.sender, points);

        // Add points to the customer
        customers[msg.sender].points += points;
    }

    function purchaseToken(uint256 amount) external {
        // Check if rewards are activated
        require(paymentReward, "Payment rewards are not activated");

        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Transfer tokens from customer to contract
        require(IERC20(ERC20Token).transferFrom(msg.sender, address(this), amount), "Tokens transfer failed");

        addReferalRewards(amount);

        // Calculate points
        uint256 points = amount * tokenToPointsRatio;

        // Add points to the customer
        loyaltyToken.mint(msg.sender, points);

        // Add points to the customer
        customers[msg.sender].points += points;
    }

    function addReward(uint256 rewardCost, string memory rewardName, string memory rewardURI) public onlyOwner {
        totalRewards++;
        // Add reward to the contract
        rewards[totalRewards] = Reward(true, totalRewards, rewardCost, rewardName, rewardURI);
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

    function getReward(uint256 rewardId) external {
        // Check if customer is in the loyalty program
        require(checkIfUserJoined(), "Customer is not in the loyalty program");

        // Check if reward exists
        require(rewards[rewardId].rewardId != 0 && rewards[rewardId].isActive, "Reward does not exist");

        uint256 amount = rewards[rewardId].rewardCost;

        // Check if customer has enough points
        require(customers[msg.sender].points >= amount, "Not enough points");

        // Issue reward NFT to the customer
        // loyaltyToken.permit(msg.sender, address(this), amount, deadline, v, r, s);
        loyaltyToken.transferFrom(msg.sender, address(this), amount);
        totalPointsRedeemed += rewards[rewardId].rewardCost;

        // Issue reward NFT to the customer
        loyaltyNFT.safeMint(msg.sender, rewards[rewardId].rewardURI);

        // Subtract points from the customer
        customers[msg.sender].points -= amount;
    }

    function withdrawTokens() public onlyOwner {
        // Transfer tokens from contract to owner
        require(IERC20(ERC20Token).transfer(owner(), IERC20(ERC20Token).balanceOf(address(this))), "Tokens transfer failed");
    }
 }