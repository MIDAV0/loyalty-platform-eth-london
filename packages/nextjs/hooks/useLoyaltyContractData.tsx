import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { useContractRead } from "wagmi";
import { LOYALTY_CONTRACT_ABI } from "~~/contracts/loyaltyContract";

export const useLoyaltyContractData = ({ contractAddress }: { contractAddress?: string }) => {
  const [allRewards, setAllRewards] = useState<any[]>([]);

  const { data: contractTokenName } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "tokenName",
  }) as { data: any[] };

  const { data: contractTokenSymbol } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "tokenSymbol",
  }) as { data: any[] };

  const { data: loyaltyTokenAddress } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "loyaltyTokenAddress",
  }) as { data: any[] };

  const { data: tokenToPointsRatio } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "tokenToPointsRatio",
    watch: true,
  }) as { data: number };

  const { data: totalPointsRedeemed } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "totalPointsRedeemed",
    watch: true,
  }) as { data: bigint };

  const { data: refferalTokensToSpend } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "refferalTokensToSpend",
    watch: true,
  }) as { data: number };

  const { data: refferalReward } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "refferalReward",
    watch: true,
  }) as { data: number };

  const { data: totalRewards } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "totalRewards",
    watch: true,
  }) as { data: number };

  const { data: contractPaymentReward } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "paymentReward",
    watch: true,
  }) as { data: boolean };

  const { data: contractReferralReward } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "referralReward",
    watch: true,
  }) as { data: boolean };

  const { data: contractBuySomeGetSome } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: LOYALTY_CONTRACT_ABI,
    functionName: "buySomeGetSome",
    watch: true,
  }) as { data: boolean };

  const loadAllRewards = async () => {
    if (contractAddress === undefined) return;
    if (!totalRewards || Number(totalRewards) === 0) {
      setAllRewards([]);
    } else {
      const result: Promise<any>[] = [];
      for (let i = 1; i <= Number(totalRewards); i += 1) {
        const data = readContract({
          address: contractAddress as `0x${string}`,
          abi: LOYALTY_CONTRACT_ABI,
          functionName: "rewards",
          args: [i],
        }) as Promise<any>;
        result.push(data);
      }
      setAllRewards(await Promise.all(result));
    }
  };

  useEffect(() => {
    loadAllRewards();
  }, [totalRewards]);

  return {
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
  };
};

export default useLoyaltyContractData;
