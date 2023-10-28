import { useState } from "react";
import { Card } from "./Card";
import { useContractWrite } from "wagmi";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";

type RewardData = {
  isActive: boolean;
  rewardId: number;
  rewardCost: number;
  rewardName: string;
  rewardURI: string;
};

export const Rewards = ({
  contractAddress,
  contractTokenName,
  contractTokenSymbol,
  loyaltyTokenAddress,
  tokenToPointsRatio,
  refferalTokensToSpend,
  refferalReward,
  contractPaymentReward,
  contractReferralReward,
  contractBuySomeGetSome,
  allRewards,
}: {
  contractAddress: string | undefined;
  contractTokenName: any[] | undefined;
  contractTokenSymbol: any[] | undefined;
  loyaltyTokenAddress: any[] | undefined;
  tokenToPointsRatio: number | undefined;
  refferalTokensToSpend: number | undefined;
  refferalReward: number | undefined;
  contractPaymentReward: boolean | undefined;
  contractReferralReward: boolean | undefined;
  contractBuySomeGetSome: boolean | undefined;
  allRewards: RewardData[] | undefined;
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [rewardName, setRewardName] = useState("");
  const [rewardURI, setRewardURI] = useState("");
  const [rewardCost, setRewardCost] = useState(0);

  const {
    data: purchaseCredits,
    write: writeAddReward,
    isLoading: purchaseLoading,
  } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "addReward",
  });

  const { isSuccess: isSuccessCreate, isLoading: isApproveTxLoading } = useWaitForTransaction({
    hash: approveTokens?.hash,
  });

  const handleCreation = () => {
    writeAddReward?.({ args: [rewardCost, rewardName, rewardURI] });
  };

  return (
    <>
      {isCreateOpen ? (
        <div className="flex flex-col gap-6">
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(false)}>
            Back
          </button>
          <div className="flex gap-8 relative items-center">
            <div>Create Reward</div>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Reward Name"
              onChange={e => setRewardName(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Reward URI"
              onChange={e => setRewardURI(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Reward Cost"
              onChange={e => setRewardCost(parseInt(e.target.value))}
            />
            <button className="btn btn-primary" onClick={() => setIsCreateOpen(false)}>
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex gap-8 relative items-center">
            <div>Rewards {allRewards?.length}</div>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Search..."
            />
            <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
              Create Reward
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Cards */}
            {allRewards?.map((rewardData, index) => (
              <Card
                key={index}
                title={rewardData.rewardName}
                description={rewardData.rewardURI}
                points={rewardData.rewardCost}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
