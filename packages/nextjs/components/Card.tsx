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
  redeemReward = () => {},
}: CardProps) => {
  const imageUrl = baseUrl + image;

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
          <button
            className="btn btn-primary"
            onClick={isBusiness ? editReward(rewardId, isActive) : redeemReward(rewardId)}
          >
            {isBusiness ? (isActive ? "Deactivate" : "Activate") : "Redeem"}
          </button>
        </div>
      </div>
    </div>
  );
};
