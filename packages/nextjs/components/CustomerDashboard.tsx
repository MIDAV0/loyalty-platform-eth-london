import { useState } from "react";
import { Card } from "./Card";
import { Address } from "./scaffold-eth";
import { formatUnits } from "viem";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";
import useLoyaltyContractData from "~~/hooks/useLoyaltyContractData";

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
  const [referral, setReferral] = useState("0x0000000000000000000000000000000000000000");

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

  // Get user data
  const { data: userData } = useContractRead({
    address: shopData?.contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "customers",
    args: [address],
    watch: true,
  }) as { data: any };

  const isJoined = userData && userData[0] !== "0x0000000000000000000000000000000000000000";

  // Join TX
  const {
    data: joinProgram,
    writeAsync: writeJoinProgram,
    isLoading: joinLoading,
  } = useContractWrite({
    address: shopData?.contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "joinLoyaltyProgram",
  });

  const { isSuccess: isSucessJoin, isLoading: isJoinTxLoading } = useWaitForTransaction({
    hash: joinProgram?.hash,
  });

  const joinLoyaltyProgram = async () => {
    console.log("joinLoyaltyProgram");
    await writeJoinProgram?.({
      args: [referral.length === 0 ? "0x0000000000000000000000000000000000000000" : referral],
    });
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {/* Data Table Block */}
        <div className="col-span-2 row-span-1 bg-blue-500 rounded-md">
          <button className="btn btn-primary" onClick={() => deactivateShop()}>
            Back
          </button>
          <div className="p-4">Shop Preview</div>
          <div className="p-4">{shopData?.contractAddress}</div>
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
        <div className="col-span-1 row-span-1 bg-green-500 rounded-md h-80 p-4">
          {isJoined ? (
            <div>Points: {Number(userData[3])}</div>
          ) : (
            <div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">ADD REFERRAL ADDRESS</span>
                </label>
                <label className="input-group">
                  <span>ADDRESS</span>
                  <input
                    type="text"
                    placeholder="0x1ff...12fS"
                    className="input input-bordered w-full"
                    minLength={0 || 42}
                    maxLength={42}
                    onChange={e => setReferral(e.target.value)}
                  />
                </label>
              </div>
              {referral.length !== 0 && (
                <div>
                  <h1>Your referral</h1>
                  <Address address={referral} />
                </div>
              )}
              <button
                className="btn btn-primary"
                onClick={joinLoyaltyProgram}
                disabled={referral.length !== 0 && referral.length !== 42}
              >
                Join
              </button>
            </div>
          )}
        </div>

        {/* Smaller Block 2 */}
        <div className="col-span-1 row-span-1 bg-green-500 rounded-md">
          {isJoined ? (
            <div className="p-4">Loyalty rank: {Number(userData[2])}</div>
          ) : (
            <div className="p-4">Join to get loyalty rank</div>
          )}
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
              canRedeem={isJoined}
              loyaltyTokenAddress={loyaltyTokenAddress}
            />
          ))}
      </div>
    </div>
  );
};
