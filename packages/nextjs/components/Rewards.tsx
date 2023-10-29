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
        <div className="w-full flex flex-row items-center justify-center">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="w-full flex gap-4">
              <button className="btn btn-primary" onClick={() => setIsCreateOpen(false)}>
                Back
              </button>
            </div>
            <div className="p-4">
              <h1 className="text-center text-3xl font-bold text-gray-900 mb-1">Create Reward</h1>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-5">
              <ul>
                <li>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">REWARD NAME</span>
                    </label>
                    <label className="input-group">
                      <span>NAME</span>
                      <input
                        type="text"
                        placeholder="My Shop"
                        className="input input-bordered"
                        onChange={e => setRewardName(e.target.value)}
                      />
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">REWARD URI</span>
                    </label>
                    <label className="input-group">
                      <span>URI</span>
                      <input
                        type="text"
                        placeholder="My Shop"
                        className="input input-bordered"
                        onChange={e => setRewardURI(e.target.value)}
                      />
                    </label>
                  </div>{" "}
                </li>
                <li>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">REWARD COST</span>
                    </label>
                    <label className="input-group">
                      <span>COST {"()"}</span>
                      <input
                        type="number"
                        placeholder="My Shop"
                        className="input input-bordered"
                        min={"0"}
                        onChange={e => setRewardCost(parseInt(e.target.value))}
                      />
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex justify-center p-4">
                    <button
                      disabled={additionLoading || isCreateTxLoading || !rewardName || !rewardURI || !rewardCost}
                      className="btn btn-primary"
                      onClick={handleCreation}
                    >
                      {additionLoading || isCreateTxLoading ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : (
                        <span>Create</span>
                      )}
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-5 w-2/3 h-72">
              <div className="p-4">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-1">Upload Image</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-8 relative items-center">
            <div className="flex flex-row gap-2">
              <span>Rewards</span>
              <span>{allRewards?.length}</span>
            </div>
            <div className="flex gap-4 border-l-2 border-gray-300 pl-4">
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
