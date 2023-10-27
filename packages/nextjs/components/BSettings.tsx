import { useState } from "react";

export const BSettings = () => {
  const [isPayToGetEnabled, setIsPayToGetEnabled] = useState(false);
  const [isReferralEnabled, setIsReferralEnabled] = useState(false);
  const [isBuySomeGetSomeEnabled, setIsBuySomeGetSomeEnabled] = useState(false);
  const [tokenRatio, setTokenRatio] = useState(0);
  const [spendAmount, setSpendAmount] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  return (
    <>
      <div>
        <h1>Settings</h1>
        <div>
          <h2>Deploy Loyalty Contract</h2>
          <div className="border-1 border-solid border-b-border-cyan-400 bg-slate-400 flex flex-col gap-5 items-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text">TOKEN NAME</span>
              </label>
              <label className="input-group">
                <span>NAME</span>
                <input
                  type="text"
                  placeholder="My Token"
                  className="input input-bordered"
                  onChange={e => setTokenName(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control">
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
            <div
              tabIndex={0}
              className={`collapse collapse-${
                isPayToGetEnabled ? "open" : "close"
              } border border-base-300 bg-base-200 w-auto`}
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
              } border border-base-300 bg-base-200 w-auto`}
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
            <div
              tabIndex={3}
              className={`collapse collapse-${
                isBuySomeGetSomeEnabled ? "open" : "close"
              } border border-base-300 bg-base-200 w-auto`}
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
                  (isReferralEnabled && (!spendAmount || !rewardAmount))
                }
                className="btn btn-primary"
              >
                Deploy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
