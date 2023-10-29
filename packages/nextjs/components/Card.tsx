import { parseEther } from "viem";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";
import { LOYALTY_TOKEN_ABI } from "~~/contracts/loyaltyToken";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/` : "/";

type CardProps = {
  contractAddress?: string;
  title?: string;
  description?: string;
  image?: string;
  points?: number;
  isActive?: boolean;
  rewardId?: number;
  isBusiness?: boolean;
  editReward?: (rewardId: number, isActive: boolean) => void;
  redeemReward?: (rewardId: number) => void;
  canRedeem?: boolean;
  loyaltyTokenAddress?: any[];
};

export const Card = ({
  contractAddress,
  title = "Scaffold-ETH 2 App",
  description = "Built with 🏗 Scaffold-ETH 2",
  image = "thumbnail.jpg",
  points = 0,
  isActive = true,
  rewardId = 0,
  isBusiness = true,
  editReward = () => {},
  canRedeem = true,
  loyaltyTokenAddress = [],
}: CardProps) => {
  const imageUrl = baseUrl + image;

  // Approve Loyalty Token
  const {
    data: approveLoyaltyToken,
    writeAsync: writeApprove,
    isLoading: approveLoading,
  } = useContractWrite({
    address: loyaltyTokenAddress as `0x${string}`,
    abi: LOYALTY_TOKEN_ABI,
    functionName: "approve",
  });

  const { isSuccess: isSucessApprove, isLoading: isApproveTxLoading } = useWaitForTransaction({
    hash: approveLoyaltyToken?.hash,
  });

  // Redeem TX
  const {
    data: redeemRewardData,
    writeAsync: writeRedeemReward,
    isLoading: redeemLoading,
  } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "getReward",
  });

  const { isSuccess: isSucessRedeem, isLoading: isRedeemTxLoading } = useWaitForTransaction({
    hash: redeemRewardData?.hash,
  });

  const redeemRewardwithID = async (rewardId: number) => {
    await writeApprove?.({
      args: [contractAddress, parseEther(`${Number(points)}`)],
    });

    await writeRedeemReward?.({
      args: [rewardId],
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex flex-row card-actions justify-between">
          <div className="gap-4 flex flex-row">
            <span className={`badge badge-secondary ${isActive ? "bg-green-500" : "bg-red-500"}`}>
              {isActive ? "Active" : "Deactivated"}
            </span>
            <span className="badge badge-secondary">{Number(points)} points</span>
          </div>

          {canRedeem && !isBusiness && (
            <button className="btn btn-primary" onClick={() => redeemRewardwithID(rewardId)}>
              {isBusiness ? (isActive ? "Deactivate" : "Activate") : "Redeem"}
            </button>
          )}
          {isBusiness && (
            <button className="btn btn-primary" onClick={() => editReward(rewardId, isActive)}>
              {isActive ? "Deactivate" : "Activate"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
