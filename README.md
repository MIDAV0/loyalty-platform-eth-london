# Loyalty Program Platform

Abstract: The core idea is to digitalize loyalty programs to make them more convenient and sustainable for both businesses and consumers. My platform will provide merchants with quick and easy way to create and customize their loyalty programs. Customers on the other hand will be provided with dashboard where they can view their spending, loyalty points earned, as well as redeem this loyalty points. For example, a coffee shop can set up a program such as for every 1$ spent customer receives a token that is associated with this coffee shop. Customer then can redeem this tokens on the platform to get goods/services.

Created by [Vadzim Mahilny]()

⚙️ Built using [Scaffold-ETH 2](https://scaffoldeth.io/)

⚙️ Contracts deployed on [Flare](https://flare.network/)

## Contents

- [Overview](#overview)
  - [Loyalty programs for SMEs (Small and Medium Enterprises)](#loyalty-programs-for-smes-small-and-medium-enterprises)
  - [Project](#project)
  - [Available programs](#available-programs)
  - [Deployed Contracts](#deployed-contracts)
  - [Demo](#demo)
    - [Merchant](#merchant)
    - [Customer](#customer)

## Overview

### Loyalty programs for SMEs (Small and Medium Enterprises)
Loyalty programs for SMEs (Small and Medium Enterprises)
**Loyalty programs are a great way to increase customer retention rates. However, they are not widely used by small and medium businesses. The main reason for this is that it is hard to set up and maintain a loyalty program.

### Project

I created an on-chain digital loyalty program platform where merchants can create and customize their loyalty programs and customers can earn loyalty points and redeem rewards. A set of smart contracts is used to store data about active loyalty programs.

Structure of the platform:
Merchant deploys a contract through the contract factory and can manage their loyalty program using this contract. This loyalty contract deploys ERC20 token that represents loyalty points earned by customers and ERC721 token that represents rewards that can be redeemed by customers. Customers can earn loyalty points by making purchases from merchants and redeem rewards by spending their loyalty points.
![Alt text](<ETHLondon-Merchant Flow.png>)

When customers make purchases from merchants, they can earn loyalty points (depending on loyalty programs activated by merchant). These loyalty points are represented by ERC20 tokens. Customers can then redeem these loyalty points for rewards. These rewards are represented by ERC721 tokens, which will be managed by merchant further (customer can send an NFT of coffee reward to merchant to get a real coffee).
![Alt text](<ETHLondon-Customer Flow.png>)

It's assumed that merchants will direct customers to pay directly to the Loyalty Contact to receive rewards. This can be done by integrating the platform with the merchant's website. 

## Available programs

Available loyalty programs:
- **Pay To Get** - for every 1$ spent customer receives loyalty points in proportion set by merchant.
- **Refferal** - customer receives loyalty points for every new customer they refer to the merchant. Merchant can set the min spend amount for the reffered person to refferal to be able to receive refferal reward.
- **Buy Some Get Some** - every time customer purchases something it goes into customer count. For instance you can purchase coffee 5 times and get 1 free. Merchant can set the number of purchases required to get a reward.

## Deployed Contracts

Platform uses 5 contracts deployed on [Flare](https://flare.network/) network:
- **LoyaltyProgramFactory** - (0x75f665fE78aD93aFBC9D159C7b48F66Fd0E8B970) - contract that allows merchants to deploy Loyalty Contracts and keeps track of all deployed contracts and their owners.
- **LoyaltyContract** - contract that represents a loyalty program by specific merchant. It provides functionality to customise loyalty programs, create and manage and redeem rewards, as well as keeps track of all customers and their loyalty points.
- **LoyaltyToken** - ERC20 token that represents loyalty points earned by customers. It is deployed by LoyaltyContract.
- **LoyaltyNFT** - ERC721 token that represents rewards that can be redeemed by customers. It is deployed by LoyaltyContract.
- **StableToken** - (0xd776e7452353b643bc125D6A06417B7762bD4bb2) -  ERC20 token which represents USDC stable token for payments.

## Demo

User starts at the landing page where they should choose whether they are a merchant or a customer.

![Alt text](<Screenshot 2023-10-29 at 04.43.18.png>)

### Merchant
User logs in as Merchant and they are prompted directly to contract setup in settings. It includes setting the loyalty programs.

![Alt text](<Screenshot 2023-10-29 at 04.47.44.png>)

After user sets up the contract, they can see the data they set and contract deployed. User also cna edit their loyalty programs in settings.

![Alt text](<Screenshot 2023-10-29 at 04.51.02.png>)

Then user can create a reward on the rewards page.

![Alt text](<Screenshot 2023-10-29 at 04.53.20.png>)
![Alt text](<Screenshot 2023-10-29 at 04.53.55.png>)

Reward can be viewd at the rewards page. Merchant can decide to deactivate or acticate the reward.

![Alt text](<Screenshot 2023-10-29 at 04.55.43.png>)

On the dashboard merchant can veiw the data about their loyalty program and customers. (In development)

![Alt text](<Screenshot 2023-10-29 at 04.56.31.png>)

### Customer

User logs in as Customer and they are prompted to the page where they can see all available shops.

![Alt text](<Screenshot 2023-10-29 at 04.58.14.png>)

When user clicks on the shop, they are prompted to the page where they can see the shop info as well as their loyalty data for this shop. First users should join the loyalty program by clicking on the button.

![Alt text](<Screenshot 2023-10-29 at 05.00.14.png>)

After user joins the loyalty program, thir data is loaded on the page and they can also redeem rewards.

![Alt text](<Screenshot 2023-10-29 at 05.02.27.png>)
![Alt text](<Screenshot 2023-10-29 at 05.02.53.png>)

After purchasing something from the shop, user can see their loyalty points updated. After redeeming a reward, user can see their reward as NFT in the wallet.
