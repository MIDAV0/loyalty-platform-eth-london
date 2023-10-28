import { expect } from "chai";
import { ethers } from "hardhat";
import { LoyaltyContract, LoyaltyFactory, StableToken } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("LoyaltyContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let loyaltyFactory: LoyaltyFactory;
  let loyaltyContract: LoyaltyContract;
  let stableToken: StableToken;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  before(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    user = signers[1];
    console.log("User Aaddress: ", user.address);

    // Deploy the stable token USDC
    const stableTokenFactory = await ethers.getContractFactory("StableToken");
    stableToken = (await stableTokenFactory.deploy()) as StableToken;
    await stableToken.deployed();

    // Mint some tokens for the user
    await stableToken.mint(user.address, ethers.utils.parseEther("10000"));

    const loyaltyFactoryFactory = await ethers.getContractFactory("LoyaltyFactory");
    loyaltyFactory = (await loyaltyFactoryFactory.deploy()) as LoyaltyFactory;
    await loyaltyFactory.deployed();

    await loyaltyFactory.createLoyaltyContract(true, true, true, stableToken.address, 1, 10, 10, "Starbucks", "SBUX");

    const loyaltyContractAddress = await loyaltyFactory.businessToLoyaltyContracts(owner.address);

    loyaltyContract = await ethers.getContractAt("LoyaltyContract", loyaltyContractAddress);
  });

  describe("Deployment", function () {
    it("should get correct store data", async function () {
      const paymentReward = await loyaltyContract.paymentReward();
      const referralReward = await loyaltyContract.referralReward();
      const buySomeGetSome = await loyaltyContract.buySomeGetSome();

      expect(paymentReward).to.equal(true);
      expect(referralReward).to.equal(true);
      expect(buySomeGetSome).to.equal(true);

      const shopOwner = await loyaltyContract.owner();
      expect(shopOwner).to.equal(owner.address);
    });

    it("should create the reward", async function () {
      await loyaltyContract.addReward(5, "Coffee", "URI");
      const reward = await loyaltyContract.rewards(1);
      expect(reward.rewardName).to.equal("Coffee");
      expect(reward.rewardURI).to.equal("URI");
      expect(reward.rewardCost).to.equal(5);
      expect(reward.isActive).to.equal(true);
    });

    it("should add user without referal to the loyalty program and purchase a reward", async function () {
      await loyaltyContract.connect(user).joinLoyaltyProgram(ethers.constants.AddressZero);

      const userData = await loyaltyContract.customers(user.address);
      expect(userData.points).to.equal(0);
      expect(userData.customerAddress).to.equal(user.address);

      const USDC_SEND_AMOUNT = 100;
      // Approve user USDC to be spent
      await stableToken
        .connect(user)
        .approve(loyaltyContract.address, ethers.utils.parseEther(USDC_SEND_AMOUNT.toString()));
      await loyaltyContract.connect(user).purchaseToken(USDC_SEND_AMOUNT);

      const userBalance = await loyaltyContract.customers(user.address);
      expect(userBalance.points).to.equal(USDC_SEND_AMOUNT);

      const loyaltyTokenAddress = await loyaltyContract.loyaltyTokenAddress();
      const loyaltyToken = await ethers.getContractAt("LoyaltyToken", loyaltyTokenAddress);

      // Approve tokens
      await loyaltyToken.connect(user).approve(loyaltyContract.address, ethers.utils.parseEther("5"));

      // Purchase reward
      await loyaltyContract.connect(user).redeemReward(1);

      const userDataAfterPurchase = await loyaltyContract.customers(user.address);
      expect(userDataAfterPurchase.points).to.equal(95);
    });
  });
});
