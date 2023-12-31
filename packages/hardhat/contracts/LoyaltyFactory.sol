//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0 <0.9.0;

import "./LoyaltyContract.sol";

contract LoyaltyFactory {

    struct ShopInfo {
        string name;
        string description;
        address contractAddress;
    }

    ShopInfo[] public deployedLoyaltyContracts;
    mapping(address => address) public businessToLoyaltyContracts;

    function createLoyaltyContract(
        bool _paymentReward,
        bool _referralReward,
        bool _buySomeGetSome,
        address ERC20Token,
        uint256 tokenToPointsRatio,
        uint256 refferalTokensToSpend,
        uint256 refferalReward,
        string memory _tokenName,
        string memory _tokenSymbol,
        string memory _shopDescription
    ) public {
        // One business can only have one loyalty contract
        require(
            businessToLoyaltyContracts[msg.sender] == address(0),
            "Business already has a loyalty contract"
        );

        address newLoyaltyContract =
            address(
                new LoyaltyContract(
                    _paymentReward,
                    _referralReward,
                    _buySomeGetSome,
                    msg.sender,
                    ERC20Token,
                    tokenToPointsRatio,
                    refferalTokensToSpend,
                    refferalReward,
                    _tokenName,
                    _tokenSymbol
                )
            );

        deployedLoyaltyContracts.push(
            ShopInfo({
                name: _tokenName,
                description: _shopDescription,
                contractAddress: newLoyaltyContract
            })
        );
        businessToLoyaltyContracts[msg.sender] = newLoyaltyContract;
    }

    function getDeployedLoyaltyContracts()
        public
        view
        returns (ShopInfo[] memory)
    {
        return deployedLoyaltyContracts;
    }
}