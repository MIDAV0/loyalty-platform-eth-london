import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { BusinessCard } from "~~/components/BusinessCard";
import { Card } from "~~/components/Card";
import { CustomerDashboard } from "~~/components/CustomerDashboard";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// Show user data: balance, transaction
// Shop purchases (with rewards)
// For each shop there should be a data for referred people loyalty score

type ShopData = {
  contractAddress: string;
  name: string;
  description: string;
};

const Customer: NextPage = () => {
  const [showShop, setShowShop] = useState<ShopData | undefined>();

  const { data: deployedLoyaltyContracts } = useScaffoldContractRead({
    contractName: "LoyaltyFactory",
    functionName: "getDeployedLoyaltyContracts",
    watch: true,
  });

  return (
    <>
      <div className="flex">
        {/* Main Content */}
        {showShop ? (
          <>
            <CustomerDashboard shopData={showShop} deactivateShop={() => setShowShop(undefined)} />
          </>
        ) : (
          <div className="w-full p-6">
            <div className="flex flex-col gap-6">
              <div className="p-1">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-1">Explore Rewards</h1>
              </div>
              <div className="flex gap-28 relative items-center">
                <div className="flex">Shops {deployedLoyaltyContracts?.length}</div>
                <input
                  type="text"
                  className="w-1/2 px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Search..."
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Cards */}
                {deployedLoyaltyContracts?.map((dContract, index) => (
                  <BusinessCard
                    key={index}
                    contractAddress={dContract.contractAddress}
                    name={dContract.name}
                    description={dContract.description}
                    activateShop={() =>
                      setShowShop({
                        contractAddress: dContract.contractAddress,
                        name: dContract.name,
                        description: dContract.description,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Customer;
