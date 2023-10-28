import { useState } from "react";
import { Card } from "./Card";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";

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
  allRewards: any[] | undefined;
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [rewardName, setRewardName] = useState("");
  const [rewardURI, setRewardURI] = useState("");
  const [rewardCost, setRewardCost] = useState(0);
  const [showAll, setShowAll] = useState(true);

  const {
    data: addRewards,
    writeAsync: writeAddReward,
    isLoading: additionLoading,
  } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "addReward",
  });

  const { isSuccess: isSuccessCreate, isLoading: isCreateTxLoading } = useWaitForTransaction({
    hash: addRewards?.hash,
  });

  const handleCreation = async () => {
    console.log("handleCreation");
    await writeAddReward?.({ args: [rewardCost, rewardName, rewardURI] });
    if (isSuccessCreate) setIsCreateOpen(false);
  };

//   const {
//     data: activateReward,
//     writeAsync: writeActivateReward,
//     isLoading: activateLoading,
//   } = useContractWrite({
//     address: contractAddress as `0x${string}`,
//     abi: LOYALTY_CONTRACT_ABI,
//     functionName: "activateReward",
//   });

//   const { isLoading: isActivateTxLoading } = useWaitForTransaction({
//     hash: activateReward?.hash,
//   });

//   const {
//     data: deactivateReward,
//     writeAsync: writeDeactivateReward,
//     isLoading: deactivateLoading,
//   } = useContractWrite({
//     address: contractAddress as `0x${string}`,
//     abi: LOYALTY_CONTRACT_ABI,
//     functionName: "deactivateReward",
//   });

//   const { isLoading: isDeactivateTxLoading } = useWaitForTransaction({
//     hash: deactivateReward?.hash,
//   });

  const editReward = async (rewardId: number, isActive: boolean) => {
    // if (isActive) {
    //   await writeActivateReward?.({ args: [Number(rewardId)] });
    // } else {
    //   await writeDeactivateReward?.({ args: [Number(rewardId)] });
    // }
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
              type="number"
              className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Reward Cost"
              onChange={e => setRewardCost(parseInt(e.target.value))}
            />
            <button
              disabled={additionLoading || isCreateTxLoading || !rewardName || !rewardURI || !rewardCost}
              className="btn btn-primary"
              onClick={handleCreation}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex gap-8 relative items-center">
            <div>Rewards {allRewards?.length}</div>
            <div>
              <span>Active</span>
              <input type="checkbox" className="toggle" checked={showAll} onChange={() => setShowAll(prev => !prev)} />
              <span>All</span>
            </div>
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
            {allRewards
              ?.filter(rewardData => (showAll ? true : rewardData[0]))
              .map((rewardData, index) => (
                <Card
                  key={index}
                  contractAddress={contractAddress}
                  title={rewardData[3]}
                  description={rewardData[4]}
                  points={rewardData[2]}
                  isActive={rewardData[0]}
                  rewardId={rewardData[1]}
                  isBusiness={true}
                  editReward={editReward}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};
