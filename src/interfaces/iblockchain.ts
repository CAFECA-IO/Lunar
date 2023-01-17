interface IBlockchain {
  chainId: number,
  key: string,
  chainName: string,
  nativeCurrency: {
    name?: string,
    symbol: string,
    decimals: number
  },
  rpcUrls?: string[],
  blockExplorerUrls?: string[],
  iconUrls?: string[],
  isTestnet: boolean
};

export default IBlockchain;