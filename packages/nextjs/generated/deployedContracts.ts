const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        LoyaltyFactory: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
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
                {
                  internalType: "string",
                  name: "_shopDescription",
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
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "contractAddress",
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
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "contractAddress",
                      type: "address",
                    },
                  ],
                  internalType: "struct LoyaltyFactory.ShopInfo[]",
                  name: "",
                  type: "tuple[]",
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
