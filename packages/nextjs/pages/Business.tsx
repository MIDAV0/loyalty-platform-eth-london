import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { Bar } from "react-chartjs-2";
import { useAccount } from "wagmi";
import {
  ArrowCircleDownIcon,
  ArrowCircleUpIcon,
  BellIcon,
  CalendarIcon,
  ChartBarSquareIcon,
  CogIcon,
  FilterIcon,
  HomeIcon,
  LogoutIcon,
  MenuAlt1Icon,
  MoonIcon,
  SearchIcon,
  TrendingUpIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/24/outline";
import { BSettings } from "~~/components/BSettings";
import { Card } from "~~/components/Card";
import { Rewards } from "~~/components/Rewards";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import useLoyaltyContractData from "~~/hooks/useLoyaltyContractData";

// Show user data: balance, transaction
// Shop purchases (with rewards)
// For each shop there should be a data for referred people loyalty score

const Business: NextPage = () => {
  const [showTab, setShowTab] = useState<"dashboard" | "rewards" | "settings">("settings");

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
    totalRewards,
  } = useLoyaltyContractData({ contractAddress: loyaltyContractAddress });

  const sideBarElement = (
    <div className="relative z-30 flex h-full flex-col bg-layer-2 shadow">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="mt-5 space-y-1 px-1 sm:px-2">
          <a
            onClick={() => setShowTab("dashboard")}
            className={`${
              showTab === "dashboard" ? "bg-layer-5 text-heading" : "text-text hover:bg-layer-3 hover:text-heading"
            } group relative flex items-center rounded-xl px-2 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-heading/80`}
          >
            <HomeIcon className="mr-3 h-6 w-6 flex-shrink-0" />
            <span className="flex-1 font-semibold">Dashboard</span>
          </a>
          <a
            onClick={() => setShowTab("rewards")}
            className={`${
              showTab === "rewards" ? "bg-layer-3 text-heading" : "text-text hover:bg-layer-3 hover:text-heading"
            } group relative flex items-center rounded-xl px-2 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-heading/80`}
          >
            <UsersIcon className="mr-3 h-6 w-6 flex-shrink-0" />
            <span className="flex-1 font-semibold">Rewards</span>
          </a>
          <a
            onClick={() => setShowTab("settings")}
            className={`${
              showTab === "settings" ? "bg-layer-3 text-heading" : "text-text hover:bg-layer-3 hover:text-heading"
            } group relative flex items-center rounded-xl px-2 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-heading/80`}
          >
            <ChartBarSquareIcon className="mr-3 h-6 w-6 flex-shrink-0" />
            <span className="flex-1 font-semibold">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-64 flex-shrink-0 md:block">{sideBarElement}</div>

        {/* Main Content */}
        <div className="w-4/5 p-4">
          <header className="mt-6 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <h1 className="text-3xl font-semibold text-heading">{showTab === "dashboard" && "Dashboard"}</h1>
          </header>
          {showTab === "dashboard" && (
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              {/* Smaller Block 1 */}
              <div className="col-span-1 row-span-1 bg-green-500 rounded-md h-80">
                <div className="p-2 h-full flex flex-col items-center justify-center align-middle gap-3">
                  <h1 className="text-3xl font-semibold text-heading">{Number(totalRewards)}</h1>
                  <h1 className="text-2xl font-semibold text-heading">Rewards</h1>
                </div>
              </div>

              {/* Smaller Block 2 */}
              <div className="col-span-1 row-span-1 bg-white shadow-lg rounded-lg p-5">
                <div className="p-2 h-full flex flex-col items-center justify-center gap-3">
                  <h1 className="text-3xl font-semibold text-heading">{Number(totalPointsRedeemed)}</h1>
                  <h1 className="text-2xl font-semibold text-heading">Points redeemed</h1>
                </div>
              </div>

              {/* Bigger Block (List) */}
              <div className="col-span-1 row-span-2 bg-orange-400 rounded-md">
                <div className="p-4 flex flex-col items-center justify-center gap-3">
                  <h1 className="text-3xl font-semibold text-heading">Customers</h1>
                </div>
              </div>

              {/* Data Table Block */}
              <div className="col-span-2 row-span-1 bg-blue-500 rounded-md">
                <div className="p-4 flex flex-col items-center justify-center gap-3">
                  <h1 className="text-3xl font-semibold text-heading">Analitycs Dashboard</h1>
                </div>
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
