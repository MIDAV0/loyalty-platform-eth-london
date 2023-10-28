import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BSettings } from "~~/components/BSettings";
import { Card } from "~~/components/Card";
import { Rewards } from "~~/components/Rewards";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import useLoyaltyContractData from "~~/hooks/useLoyaltyContractData";

// Show user data: balance, transaction
// Shop purchases (with rewards)
// For each shop there should be a data for referred people loyalty score

const Business: NextPage = () => {
  const [showTab, setShowTab] = useState<"dashboard" | "rewards" | "settings">("dashboard");

  const { address } = useAccount();

  const { data: loyaltyContractAddress } = useScaffoldContractRead({
    contractName: "LoyaltyFactory",
    functionName: "businessToLoyaltyContracts",
    args: [address],
    watch: true,
  });

  const {
    contractTokenName,
    contractTokenSymbol,
    loyaltyTokenAddress,
    tokenToPointsRatio,
    totalPointsRedeemed,
    refferalTokensToSpend,
    refferalReward,
    allRewards,
    contractPaymentReward,
    contractReferralReward,
    contractBuySomeGetSome,
  } = useLoyaltyContractData({ contractAddress: loyaltyContractAddress });

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 p-4 bg-gray-100 flex flex-col gap-5 items-center">
          <button onClick={() => setShowTab("dashboard")} className="btn btn-primary">
            Dashboard
          </button>
          <button onClick={() => setShowTab("rewards")} className="btn btn-primary">
            Rewards
          </button>
          <button onClick={() => setShowTab("settings")} className="btn btn-primary">
            Settings
          </button>
        </div>

        {/* Main Content */}
        <div className="w-4/5 p-4">
          {showTab === "dashboard" && (
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              {/* Smaller Block 1 */}
              <div className="col-span-1 row-span-1 bg-green-500 rounded-md h-80">
                <div className="p-4">Number 1</div>
              </div>

              {/* Smaller Block 2 */}
              <div className="col-span-1 row-span-1 bg-green-500 rounded-md">
                <div className="p-4">Number 2</div>
              </div>

              {/* Bigger Block (List) */}
              <div className="col-span-1 row-span-2 bg-orange-400 rounded-md">
                <div className="p-4">List</div>
              </div>

              {/* Data Table Block */}
              <div className="col-span-2 row-span-1 bg-blue-500 rounded-md">
                <div className="p-4">Data Table</div>
              </div>
            </div>
          )}
          {showTab === "rewards" && (
            <>
              <Rewards
                contractAddress={loyaltyContractAddress}
                contractTokenName={contractTokenName}
                contractTokenSymbol={contractTokenSymbol}
                loyaltyTokenAddress={loyaltyTokenAddress}
                tokenToPointsRatio={tokenToPointsRatio}
                refferalTokensToSpend={refferalTokensToSpend}
                refferalReward={refferalReward}
                contractPaymentReward={contractPaymentReward}
                contractReferralReward={contractReferralReward}
                contractBuySomeGetSome={contractBuySomeGetSome}
                allRewards={allRewards}
              />
            </>
          )}
          {showTab === "settings" && (
            <>
              <BSettings
                contractAddress={loyaltyContractAddress}
                contractTokenName={contractTokenName}
                contractTokenSymbol={contractTokenSymbol}
                loyaltyTokenAddress={loyaltyTokenAddress}
                tokenToPointsRatio={tokenToPointsRatio}
                refferalTokensToSpend={refferalTokensToSpend}
                refferalReward={refferalReward}
                contractPaymentReward={contractPaymentReward}
                contractReferralReward={contractReferralReward}
                contractBuySomeGetSome={contractBuySomeGetSome}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Business;
