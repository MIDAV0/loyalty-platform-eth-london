import { expect } from "chai";
import { ethers } from "hardhat";
import { LoyaltyFactory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("LoyaltyFactory", function () {
  // We define a fixture to reuse the same setup in every test.

  let loyaltyFactory: LoyaltyFactory;
  let owner: SignerWithAddress;

  before(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    const loyaltyFactoryFactory = await ethers.getContractFactory("LoyaltyFactory");
    loyaltyFactory = (await loyaltyFactoryFactory.deploy()) as LoyaltyFactory;
    await loyaltyFactory.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy Loyalty contract", async function () {
      await loyaltyFactory.createLoyaltyContract(
        true,
        true,
        true,
        "0xeEE27662c2B8EBa3CD936A23F039F3189633e4C8",
        1,
        10,
        10,
        "Starbucks",
        "SBUX",
        "Coffee shop",
      );

      const loyaltyContractAddress = await loyaltyFactory.businessToLoyaltyContracts(owner.address);
      expect(loyaltyContractAddress).to.not.equal(ethers.constants.AddressZero);
    });
  });
});
