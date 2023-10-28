import { useContractWrite, useWaitForTransaction } from "wagmi";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";

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
}: CardProps) => {
  const imageUrl = baseUrl + image;

  // Redeem TX
  const {
    data: redeemRewardData,
    writeAsync: writeRedeemReward,
    isLoading: redeemLoading,
  } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "redeemReward",
  });

  const { isSuccess: isSucessRedeem, isLoading: isRedeemTxLoading } = useWaitForTransaction({
    hash: redeemRewardData?.hash,
  });

  const redeemRewardwithID = async (rewardId: number) => {
    await writeRedeemReward?.({
      args: [Number(rewardId)],
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        {image && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta name="twitter:image" content={imageUrl} />
          </>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <span className={`badge badge-secondary ${isActive ? "bg-green-500" : "bg-red-500"}`}>
            {isActive ? "Active" : "Deactivated"}
          </span>
          <span className="badge badge-secondary">{Number(points)} points</span>
          {canRedeem && !isBusiness && (
            <button className="btn btn-primary" onClick={() => redeemRewardwithID(rewardId)}>
              {isBusiness ? (isActive ? "Deactivate" : "Activate") : "Redeem"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
