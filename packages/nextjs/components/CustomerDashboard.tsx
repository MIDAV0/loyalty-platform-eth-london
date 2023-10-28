import useLoyaltyContractData from "~~/hooks/useLoyaltyContractData";
import { Card } from "./Card";
import { useAccount } from "wagmi";

type ShopData = {
  contractAddress: string;
  name: string;
  description: string;
};

type CustomerRearwardsProps = {
  shopData?: ShopData;
  deactivateShop?: () => void;
};

export const CustomerDashboard = ({ shopData, deactivateShop = () => {} }: CustomerRearwardsProps) => {

    const { address } = useAccount();

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
  } = useLoyaltyContractData({ contractAddress: shopData?.contractAddress });


  



  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {/* Data Table Block */}
        <div className="col-span-2 row-span-1 bg-blue-500 rounded-md">
          <button className="btn btn-primary" onClick={() => deactivateShop()}>
            Back
          </button>
          <div className="p-4">Shop Preview</div>
          <div className="p-4">{shopData?.name}</div>
          <div className="p-4">{shopData?.description}</div>
        </div>
        {/* Bigger Block (List) */}
        <div className="col-span-1 row-span-2 bg-orange-400 rounded-md">
          <div className="p-4">Reward settings</div>
          {contractPaymentReward && <div className="p-4">Token to points ratio: {Number(tokenToPointsRatio)}</div>}
          {contractReferralReward && <div className="p-4">Reward for referrals: {Number(refferalReward)}</div>}
          {contractBuySomeGetSome && <div className="p-4">Buy some get some: {contractBuySomeGetSome}</div>}
        </div>

        {/* Smaller Block 1 */}
        <div className="col-span-1 row-span-1 bg-green-500 rounded-md h-80">
          <div className="p-4">Points</div>
        </div>

        {/* Smaller Block 2 */}
        <div className="col-span-1 row-span-1 bg-green-500 rounded-md">
          <div className="p-4">Loyalty rank</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Cards */}
        {allRewards
          ?.filter(rewardData => rewardData[0])
          .map((rewardData, index) => (
            <Card
              key={index}
              contractAddress={shopData?.contractAddress}
              title={rewardData[3]}
              description={rewardData[4]}
              points={rewardData[2]}
              isActive={rewardData[0]}
              rewardId={rewardData[1]}
              isBusiness={false}
            />
          ))}
      </div>
    </div>
  );
};
