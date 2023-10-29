import { useEffect, useState } from "react";
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

  useEffect(() => {
    setIsPayToGetEnabled(contractPaymentReward);
  }, [contractPaymentReward]);

  useEffect(() => {
    setIsReferralEnabled(contractReferralReward);
  }, [contractReferralReward]);

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
            <div className="p-4">
              <h1 className="text-center text-3xl font-bold text-gray-900 mb-1">Shop Info</h1>
            </div>
            <div className="w-full flex justify-center">
              <div className="w-full flex flex-row">
                <div className="bg-white shadow-lg rounded-lg p-5">
                  <ul className="space-y-4">
                    <li>
                      <div className="flex items-start">
                        <svg className="w-6 h-6 flex-shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                          <path
                            className="text-indigo-500"
                            d="M20 16h-3.3c.166.658.255 1.333.266 2.011a1 1 0 0 1-1 .989H8a1 1 0 0 1 0-2h7a4 4 0 0 0-4-4H7c-1.2-1.711-3.695-2-4.9-2H0v8.5l8.192 3.763a4.388 4.388 0 0 0 3.248.268L24 19.667S23.208 16 20 16Z"
                          />
                          <path
                            className="text-indigo-300"
                            d="m21.515 3.143-5-3a1 1 0 0 0-1.03 0l-5 3A1 1 0 0 0 10 4v6a1 1 0 0 0 1 1h3V7h4v4h3a1 1 0 0 0 1-1V4a1 1 0 0 0-.485-.857Z"
                          />
                        </svg>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">Shop Data</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">Name: {contractTokenName}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">Description: {shopDescription}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">Token Symbol: {contractTokenSymbol}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start">
                        <svg className="w-6 h-6 flex-shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                          <path
                            className="text-indigo-500"
                            d="m13.371 14.749-3.742-1.5A1 1 0 0 1 9 12.323v-.451a7.18 7.18 0 0 0 3.248-1.115.988.988 0 0 0 .181-1.416A5.991 5.991 0 0 1 11 6.038a3.879 3.879 0 0 0-1.9-3.5A4.046 4.046 0 0 0 3 6a5.943 5.943 0 0 1-1.429 3.342.987.987 0 0 0 .181 1.415A7.18 7.18 0 0 0 5 11.872v.451a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z"
                          />
                          <path
                            className="text-indigo-300"
                            d="m23.371 12.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 21 6V4.172A4.116 4.116 0 0 0 17.393.019 4 4 0 0 0 13 4v2a3.982 3.982 0 0 0 2 3.445v.878a4.737 4.737 0 0 1-1.6 2.065c-.068.044-.134.093-.2.138l.911.365A2.988 2.988 0 0 1 16 15.677V18c-.003.341-.066.68-.184 1H23a1 1 0 0 0 1-1v-4.323a1 1 0 0 0-.629-.928Z"
                          />
                        </svg>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">Contracts</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">Loyalty Contract: {contractAddress}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">Loyalty Token: {loyaltyTokenAddress}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">Loyalty NFT: {}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-row gap-4">
                <div className="bg-white shadow-lg rounded-lg p-5">
                  <ul className="space-y-4">
                    <li>
                      <h2>Contract Settings</h2>
                    </li>
                    <li>
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
                              disabled={!isEditing}
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
                              placeholder={Number(tokenToPointsRatio).toString()}
                              className="input input-bordered"
                              disabled={!isEditing}
                              min="0"
                              onChange={e => setTokenRatio(parseInt(e.target.value))}
                            />
                          </label>
                        </div>
                      </div>
                    </li>
                    <li>
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
                              disabled={!isEditing}
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
                    </li>
                    <li>
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
                          <p>In development</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex justify-center gap-4">
                        <button
                          className="btn btn-primary"
                          onClick={isEditing ? () => setIsEditing(false) : () => setIsEditing(true)}
                        >
                          {isEditing ? <span>Cancel</span> : <span>Edit</span>}
                        </button>
                        {isEditing && (
                          <button
                            disabled={
                              (isPayToGetEnabled && !tokenRatio) ||
                              (isReferralEnabled && (!spendAmount || !rewardAmount))
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
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <div className="p-4">
              <h1 className="text-center text-3xl font-bold text-gray-900 mb-1">Deploy Contract</h1>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-5">
              <ul className="space-y-4">
                <li>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">BUSINESS NAME</span>
                    </label>
                    <label className="input-group">
                      <span>NAME</span>
                      <input
                        type="text"
                        placeholder="My Shop"
                        className="input input-bordered"
                        onChange={e => setTokenName(e.target.value)}
                      />
                    </label>
                  </div>
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
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
                      <p>In development</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-center gap-4">
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
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
