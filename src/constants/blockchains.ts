import { toHex } from "../libs/common";
import IBlockchain from "../interfaces/iblockchain";

export const Blockchains = class {
  static Avax: IBlockchain = {
    chainId: "0xa86a",
    key: "Avax",
    chainName: "Avalanche Network",
    nativeCurrency: {
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: [ "https://api.avax.network/ext/bc/C/rpc" ],
    blockExplorerUrls: [ "https://cchain.explorer.avax.network/" ],
    isTestnet: false,
  };
  static BSC: IBlockchain = {
    chainId: "0x38",
    key: "BSC",
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [ "https://bsc-dataseed.binance.org/" ],
    blockExplorerUrls: [ "https://bscscan.com/" ],
    isTestnet: false,
  };
  static BSCTestnet: IBlockchain = {
    chainId: "0x61",
    key: "BSCTestnet",
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [ "https://data-seed-prebsc-1-s1.binance.org:8545/" ],
    blockExplorerUrls: [ "https://testnet.bscscan.com" ],
    isTestnet: true,
  };
  static Ethereum: IBlockchain = {
    chainId: "0x1",
    key: "Ethereum",
    chainName: "Ethereum",
    nativeCurrency: {
      symbol: "ETH",
      decimals: 18,
    },
    isTestnet: false
  };
  static AvaxTestnet: IBlockchain = {
    chainId: "0xa869",
    key: "AvaxTestnet",
    chainName: "Avalanche Testnet FUJI",
    nativeCurrency: {
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: [ "https://api.avax-test.network/ext/bc/C/rpc" ],
    blockExplorerUrls: [ "https://cchain.explorer.avax-test.network" ],
    isTestnet: true,
  };
  static Huobi: IBlockchain = {
    chainId: "0x80",
    key: "Huobi",
    chainName: "HuobiChain",
    nativeCurrency: {
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: [ "https://http-mainnet-node.huobichain.com/" ],
    blockExplorerUrls: [ "https://hecoinfo.com/" ],
    isTestnet: false,
  };
  static HuobiTestnet: IBlockchain = {
    chainId: "0x100",
    key: "HuobiTestnet",
    chainName: "HuobiChain Testnet",
    nativeCurrency: {
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: [ "https://http-testnet.hecochain.com/" ],
    blockExplorerUrls: [ "https://scan-testnet.hecochain.com" ],
    isTestnet: true,
  }
  static Polygon: IBlockchain = {
    chainId: "0x89",
    key: "Polygon",
    chainName: "Polygon",
    nativeCurrency: {
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [ "https://rpc-mainnet.maticvigil.com/" ],
    blockExplorerUrls: [ "https://explorer.matic.network/" ],
    isTestnet: false,
  };
  static PolygonTestnet: IBlockchain = {
    chainId: "0x13881",
    key: "PolygonTestnet",
    chainName: "Polygon Testnet Mumbai",
    nativeCurrency: {
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [ "https://rpc-mumbai.maticvigil.com/" ],
    blockExplorerUrls: [ "https://mumbai-explorer.matic.today/" ],
    isTestnet: true,
  }
  static EthereumTestnet: IBlockchain = {
    chainId: "0x3",
    key: "EthereumTestnet",
    chainName: "ETH testnet Ropsten",
    nativeCurrency: {
      symbol: "ETH",
      decimals: 18,
    },
    isTestnet: true,
  };
  static iSunCoin: IBlockchain = {
    chainId: "0x1f51",
    key: "iSunCoin",
    chainName: "iSunCoin",
    nativeCurrency: {
      name: "iSunCoin",
      symbol: "ISC",
      decimals: 18,
    },
    rpcUrls: [ "https://isuncoin.baifa.io" ],
    blockExplorerUrls: [ "https://baifa.io/app/chains/8017" ],
    iconUrls: [ "https://blotchain.io/icon.png" ],
    isTestnet: false,
  };
  static xDAI: IBlockchain = {
    chainId: "0x64",
    key: "xDAI",
    chainName: "xDai",
    nativeCurrency: {
      symbol: "xDAI",
      decimals: 18,
    },
    rpcUrls: [ "https://rpc.xdaichain.com/" ],
    blockExplorerUrls: [ "https://blockscout.com/xdai/mainnet" ],
    isTestnet: false,
  };

  static get keys() {
    return Object.keys(this);
  }
  static list(isTestnet?: boolean): IBlockchain[] {
    const result = Object.values(Blockchains)
      .filter((v) => {
        const rs = (isTestnet === v.isTestnet) || isTestnet === undefined;
        return rs;
      })

    return result;
  }
  static findByChainId(chainId: string = "0x1") {
    return Object.values(Blockchains)
      .find((v) => {
        return v.chainId === chainId;
      })
  }
}

export default Blockchains;