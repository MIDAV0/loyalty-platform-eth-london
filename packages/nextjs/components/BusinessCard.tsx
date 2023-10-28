import { useContractWrite, useWaitForTransaction } from "wagmi";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/` : "/";

type CardProps = {
  contractAddress?: string;
  name?: string;
  description?: string;
  activateShop?: () => void;
};

export const BusinessCard = ({
  contractAddress,
  name = "Scaffold-ETH 2 App",
  description = "Built with 🏗 Scaffold-ETH 2",
  activateShop = () => {},
}: CardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure></figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => activateShop()}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};
