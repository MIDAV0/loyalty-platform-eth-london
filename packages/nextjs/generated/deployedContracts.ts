const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        LoyaltyFactory: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "businessToLoyaltyContracts",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bool",
                  name: "_paymentReward",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "_referralReward",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "_buySomeGetSome",
                  type: "bool",
                },
                {
                  internalType: "address",
                  name: "ERC20Token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenToPointsRatio",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "refferalTokensToSpend",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "refferalReward",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_tokenName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_tokenSymbol",
                  type: "string",
                },
              ],
              name: "createLoyaltyContract",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "deployedLoyaltyContracts",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getDeployedLoyaltyContracts",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
