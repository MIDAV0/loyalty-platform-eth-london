import { useState } from "react";
import { EtherscanProvider } from "@ethersproject/providers";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import useLoyaltyContractData from "~~/hooks/useLoyaltyContractData";

export const BSettings = ({
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
}) => {
  const [isPayToGetEnabled, setIsPayToGetEnabled] = useState(false);
  const [isReferralEnabled, setIsReferralEnabled] = useState(false);
  const [isBuySomeGetSomeEnabled, setIsBuySomeGetSomeEnabled] = useState(false);
  const [tokenRatio, setTokenRatio] = useState(0);
  const [spendAmount, setSpendAmount] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // ContractName: name of the deployed contract
  const { data: deployedContractData } = useDeployedContractInfo("StableToken");

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "LoyaltyFactory",
    functionName: "createLoyaltyContract",
    args: [
      isPayToGetEnabled,
      isReferralEnabled,
      isBuySomeGetSomeEnabled,
      deployedContractData?.address as string,
      tokenRatio,
      spendAmount,
      rewardAmount,
      tokenName,
      tokenSymbol,
      shopDescription,
    ],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("txnReceipt", txnReceipt);
    },
  });

  const deployContract = async () => {
    setIsPayToGetEnabled(false);
    setIsReferralEnabled(false);
    setIsBuySomeGetSomeEnabled(false);
    setTokenRatio(0);
    setSpendAmount(0);
    setRewardAmount(0);
    await writeAsync();
  };

  return (
    <>
      <div>
        {contractAddress !== "0x0000000000000000000000000000000000000000" ? (
          <div className="w-full justify-center gap-4">
            <h1 className="text-center">Contract Info</h1>
            <div className="w-full flex flex-row gap-4">
              <div className="w-1/2 h-96 flex flex-col align-middle gap-4 pad-4 bg-slate-400 rounded-md">
                <span>Contract Address: {contractAddress}</span>
                <div>Token Name: {contractTokenName}</div>
                <div>Token Symbol: {contractTokenSymbol}</div>
                <div>Loyalty Token Address: {loyaltyTokenAddress}</div>
                <div>paymentReward: {contractPaymentReward ? "data" : "no data"}</div>
                <div>Token Ratio: {Number(tokenToPointsRatio)}</div>
              </div>
              <div className="w-1/2 flex flex-col gap-4 pad-4 bg-slate-400 rounded-md">
                <h2>Contract Settings</h2>
                <div
                  tabIndex={0}
                  className={`collapse collapse-${
                    isPayToGetEnabled || contractPaymentReward ? "open" : "close"
                  } border border-base-300 bg-base-200`}
                >
                  <div className="collapse-title text-xl font-medium">
                    <label className="cursor-pointer label">
                      <span className="label-text">Enable pay to get</span>
                      <input
                        type="checkbox"
                        disabled={!isEditing}
                        className="toggle toggle-primary"
                        checked={isPayToGetEnabled || contractPaymentReward}
                        onChange={() => setIsPayToGetEnabled(prev => !prev)}
                      />
                    </label>
                  </div>
                  <div className="collapse-content">
                    <label className="input-group">
                      <span>Token Ratio</span>
                      <input
                        type="number"
                        placeholder={Number(tokenToPointsRatio).toString()}
                        className="input input-bordered"
                        disabled={!isEditing}
                        min="0"
                        onChange={e => setTokenRatio(parseInt(e.target.value))}
                      />
                    </label>
                  </div>
                </div>
                <div
                  tabIndex={1}
                  className={`collapse collapse-${
                    isReferralEnabled || contractReferralReward ? "open" : "close"
                  } border border-base-300 bg-base-200`}
                >
                  <div className="collapse-title text-xl font-medium">
                    <label className="cursor-pointer label">
                      <span className="label-text">Enable referals</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        disabled={!isEditing}
                        checked={isReferralEnabled || contractReferralReward}
                        onChange={() => setIsReferralEnabled(prev => !prev)}
                      />
                    </label>
                  </div>
                  <div className="collapse-content">
                    <div className="">
                      <label className="input-group">
                        <span>Spend Amount</span>
                        <input
                          type="number"
                          placeholder={Number(refferalTokensToSpend).toString()}
                          disabled={!isEditing}
                          className="input input-bordered"
                          min="0"
                          onChange={e => setSpendAmount(parseInt(e.target.value))}
                        />
                      </label>
                      <label className="input-group">
                        <span>Reward Amount</span>
                        <input
                          type="number"
                          placeholder={Number(refferalReward).toString()}
                          disabled={!isEditing}
                          className="input input-bordered"
                          min="0"
                          onChange={e => setRewardAmount(parseInt(e.target.value))}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  tabIndex={3}
                  className={`collapse collapse-${
                    isBuySomeGetSomeEnabled ? "open" : "close"
                  } border border-base-300 bg-base-200`}
                >
                  <div className="collapse-title text-xl font-medium">
                    <label className="cursor-pointer label">
                      <span className="label-text">Enable buy some get one</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={isBuySomeGetSomeEnabled}
                        onChange={() => setIsBuySomeGetSomeEnabled(prev => !prev)}
                      />
                    </label>
                  </div>
                  <div className="collapse-content">
                    <p>tabIndex={3} attribute is necessary to make the div focusable</p>
                  </div>
                </div>
                <div>
                  <button
                    disabled={
                      (isPayToGetEnabled && !tokenRatio) || (isReferralEnabled && (!spendAmount || !rewardAmount))
                    }
                    className="btn btn-primary"
                    onClick={isEditing ? () => setIsEditing(false) : () => setIsEditing(true)}
                  >
                    {isEditing ? <span>Cancel</span> : <span>Edit</span>}
                  </button>
                  {isEditing && (
                    <button
                      disabled={
                        (isPayToGetEnabled && !tokenRatio) || (isReferralEnabled && (!spendAmount || !rewardAmount))
                      }
                      className="btn btn-primary"
                      onClick={deployContract}
                    >
                      {isLoading || isMining ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : (
                        <span>Apply</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-1/2 flex flex-col items-center">
            <h2 className="">Deploy Loyalty Contract</h2>
            <div className="border-1 border-solid rounded-md p-4 bg-slate-400 flex flex-col gap-5 items-center">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">BUSINESS NAME</span>
                </label>
                <label className="input-group">
                  <span>NAME</span>
                  <input
                    type="text"
                    placeholder="Breakfast"
                    className="input input-bordered"
                    onChange={e => setTokenName(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">TOKEN SYMBOL</span>
                </label>
                <label className="input-group">
                  <span>SYMBOL</span>
                  <input
                    type="text"
                    placeholder="MTK"
                    className="input input-bordered"
                    minLength={2}
                    maxLength={4}
                    onChange={e => setTokenSymbol(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">BUSINESS DESCRIPTION</span>
                </label>
                <label className="input-group">
                  <span>DESCRIPTION</span>
                  <input
                    type="text"
                    placeholder="Nice place"
                    className="input input-bordered"
                    onChange={e => setShopDescription(e.target.value)}
                  />
                </label>
              </div>
              <div
                tabIndex={0}
                className={`collapse collapse-${
                  isPayToGetEnabled ? "open" : "close"
                } border border-base-300 bg-base-200`}
              >
                <div className="collapse-title text-xl font-medium">
                  <label className="cursor-pointer label">
                    <span className="label-text">Enable pay to get</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={isPayToGetEnabled}
                      onChange={() => setIsPayToGetEnabled(prev => !prev)}
                    />
                  </label>
                </div>
                <div className="collapse-content">
                  <label className="input-group">
                    <span>Token Ratio</span>
                    <input
                      type="number"
                      placeholder="0"
                      className="input input-bordered"
                      min="0"
                      onChange={e => setTokenRatio(parseInt(e.target.value))}
                    />
                  </label>
                </div>
              </div>
              <div
                tabIndex={1}
                className={`collapse collapse-${
                  isReferralEnabled ? "open" : "close"
                } border border-base-300 bg-base-200`}
              >
                <div className="collapse-title text-xl font-medium">
                  <label className="cursor-pointer label">
                    <span className="label-text">Enable referals</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={isReferralEnabled}
                      onChange={() => setIsReferralEnabled(prev => !prev)}
                    />
                  </label>
                </div>
                <div className="collapse-content">
                  <div className="">
                    <label className="input-group">
                      <span>Spend Amount</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="input input-bordered"
                        min="0"
                        onChange={e => setSpendAmount(parseInt(e.target.value))}
                      />
                    </label>
                    <label className="input-group">
                      <span>Reward Amount</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="input input-bordered"
                        min="0"
                        onChange={e => setRewardAmount(parseInt(e.target.value))}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div
                tabIndex={3}
                className={`collapse collapse-${
                  isBuySomeGetSomeEnabled ? "open" : "close"
                } border border-base-300 bg-base-200`}
              >
                <div className="collapse-title text-xl font-medium">
                  <label className="cursor-pointer label">
                    <span className="label-text">Enable buy some get one</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={isBuySomeGetSomeEnabled}
                      onChange={() => setIsBuySomeGetSomeEnabled(prev => !prev)}
                    />
                  </label>
                </div>
                <div className="collapse-content">
                  <p>tabIndex={3} attribute is necessary to make the div focusable</p>
                </div>
              </div>
              <div>
                <button
                  disabled={
                    !tokenName ||
                    !tokenSymbol ||
                    (isPayToGetEnabled && !tokenRatio) ||
                    (isReferralEnabled && (!spendAmount || !rewardAmount)) ||
                    isLoading ||
                    isMining
                  }
                  className="btn btn-primary"
                  onClick={deployContract}
                >
                  {isLoading || isMining ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    <span>Deploy Contract</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
