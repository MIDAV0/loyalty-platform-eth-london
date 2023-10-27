import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { Card } from "~~/components/Card";
import { BSettings } from "~~/components/BSettings";

// Show user data: balance, transaction
// Shop purchases (with rewards)
// For each shop there should be a data for referred people loyalty score
/*
        bool _paymentReward,
        bool _referralReward,
        bool _buySomeGetSome,
        address ERC20Token,
        uint256 tokenToPointsRatio,
        uint256 refferalTokensToSpend,
        uint256 refferalReward,
        string memory _tokenName,
        string memory _tokenSymbol
*/

const Business: NextPage = () => {
  const [showTab, setShowTab] = useState<"dashboard" | "rewards" | "settings">("dashboard");

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
            <div className="flex flex-col gap-6">
              <div className="flex gap-8 relative items-center">
                <div>Items</div>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Search..."
                />
                <button className="absolute right-0 top-0 mt-3 mr-4">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 10.293a1 1 0 01-1.414 1.414l-2.5-2.5a1 1 0 010-1.414l2.5-2.5a1 1 0 111.414 1.414L9.414 8l2.293 2.293z" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 14a7 7 0 100-14A7 7 0 007 14zm0-1A6 6 0 107 2a6 6 0 000 11z"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Cards */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} />
                ))}
              </div>
            </div>
          )}
          {showTab === "settings" && (
            <>
              <BSettings />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Business;
