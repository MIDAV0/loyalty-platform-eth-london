import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { BusinessCard } from "~~/components/BusinessCard";
import { Card } from "~~/components/Card";
import { CustomerDashboard } from "~~/components/CustomerDashboard";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// Show user data: balance, transaction
// Shop purchases (with rewards)
// For each shop there should be a data for referred people loyalty score

const ProcessPayments: NextPage = () => {
  const { address } = useAccount();

  const { data: deployedLoyaltyContracts } = useScaffoldContractRead({
    contractName: "LoyaltyFactory",
    functionName: "getDeployedLoyaltyContracts",
    watch: true,
  });

  const {
    writeAsync: writeApprove,
    isLoading: loadingApprove,
    isMining: miningApprove,
  } = useScaffoldContractWrite({
    contractName: "StableToken",
    functionName: "approve",
    args: ["", parseEther("100")],
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
  });

  const { data: loyaltyContractAddress } = useScaffoldContractRead({
    contractName: "LoyaltyFactory",
    functionName: "businessToLoyaltyContracts",
    args: [address],
    watch: true,
  });

  const {
    data: purchaseItem,
    writeAsync: writePurchaseItem,
    isLoading: purchaseLoading,
  } = useContractWrite({
    address: loyaltyContractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "purchaseToken",
  });

  const { isSuccess: isSuccessPurchase, isLoading: isPurchaseTxLoading } = useWaitForTransaction({
    hash: purchaseItem?.hash,
  });

  const handlePurchase = async (contractAddress: string) => {
    await writeApprove?.({ args: [contractAddress, parseEther("100")] });
    await writePurchaseItem?.({ args: [100] });
  };

  return (
    <>
      <div className="flex">
        {deployedLoyaltyContracts?.map((dContract, index) => (
          <div key={index} className="card w-96 bg-base-100 shadow-xl">
            <figure></figure>
            <div className="card-body">
              <h2 className="card-title">{dContract.name}</h2>
              <p>{dContract.description}</p>
              <div className="card-actions justify-end">
                <button
                  disabled={loadingApprove || miningApprove}
                  className="btn btn-primary"
                  onClick={() => handlePurchase(dContract.contractAddress)}
                >
                  Purchase Item for 100 USDC
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProcessPayments;
