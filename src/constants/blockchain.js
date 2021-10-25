class Blockchains {
  static Avax = {
    chainId: "0xa86a",
    chainName: "Avalanche Network",
    nativeCurrency: {
      symbol: "AVAX",
    },
    rpcUrls: [ "https://api.avax.network/ext/bc/C/rpc" ],
    blockExplorerUrls: [ "https://cchain.explorer.avax.network/" ],
  };
  static BSC = {
    chainId: "0x38",
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      symbol: "BNB",
    },
    rpcUrls: [ "https://bsc-dataseed.binance.org/" ],
    blockExplorerUrls: [ "https://bscscan.com/" ],
  };
  static BSCTestnet = {
    chainId: "0x61",
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      symbol: "BNB",
    },
    rpcUrls: [ "https://data-seed-prebsc-1-s1.binance.org:8545/" ],
    blockExplorerUrls: [ "https://testnet.bscscan.com" ],
  };
  static Ethereum = {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      symbol: "ETH",
      decimals: 18,
    },
  };
  static FUJI = {
    chainId: "0xa869",
    chainName: "Avalanche Network",
    nativeCurrency: {
      symbol: "AVAX",
    },
    rpcUrls: [ "https://api.avax-test.network/ext/bc/C/rpc" ],
    blockExplorerUrls: [ "https://cchain.explorer.avax-test.network" ],
  };
  static Huobi = {
    chainId: "0x80",
    chainName: "HuobiChain",
    nativeCurrency: {
      symbol: "HT",
    },
    rpcUrls: [ "https://http-mainnet-node.huobichain.com/" ],
    blockExplorerUrls: [ "https://hecoinfo.com/" ],
  };
  static HuobiTestnet = {
    chainId: "0x100",
    chainName: "HuobiChain Testnet",
    nativeCurrency: {
      symbol: "HT",
    },
    rpcUrls: [ "https://http-testnet.hecochain.com/" ],
    blockExplorerUrls: [ "https://scan-testnet.hecochain.com" ],
  }
  static Matic = {
    chainId: "0x89",
    chainName: "Polygon",
    nativeCurrency: {
      symbol: "MATIC",
    },
    rpcUrls: [ "https://rpc-mainnet.maticvigil.com/" ],
    blockExplorerUrls: [ "https://explorer.matic.network/" ],
  };
  static Mumbai = {
    chainId: "0x13881",
    chainName: "Polygon Testnet",
    nativeCurrency: {
      symbol: "MATIC",
    },
    rpcUrls: [ "https://rpc-mumbai.maticvigil.com/" ],
    blockExplorerUrls: [ "https://mumbai-explorer.matic.today/" ],
  }
  static Ropsten = {
    chainId: "0x3",
    chainName: "ETH testnet Ropsten",
    nativeCurrency: {
      symbol: "ETH",
      decimals: 18,
    },
  };
  static Tidetime = {
    chainId: "0x1f51",
    chainName: "Tidetime",
    nativeCurrency: {
      name: "Tidetime Token",
      symbol: "TTT",
      decimals: 18,
    },
    rpcUrls: [ "https://rpc.tidebit.network" ],
    blockExplorerUrls: [ "https://explorer.tidebit.network" ],
    iconUrls: [ "https://iconape.com/wp-content/png_logo_vector/tidebit.png" ]
  };
  static xDAI = {
    chainId: "0x64",
    chainName: "xDai",
    nativeCurrency: {
      symbol: "xDAI",
    },
    rpcUrls: [ "https://rpc.xdaichain.com/" ],
    blockExplorerUrls: [ "https://blockscout.com/xdai/mainnet" ],
  };

  static AvaxTestnet = this.FUJI;
  static EthereumTestnet = this.Ropsten;
  static Polygon = this.Matic;

  static get keys() {
    return Object.keys(this);
  }
  static findByChainId(chainId = '') {
    let searchKey = chainId.toString(16);
    if(searchKey.indexOf('0x') != 0) searchKey = '0x'.concat(searchKey);

    return this.keys
      .map((v) => {
        return this[v];
      })
      .find((v) => {
        return parseInt(v.chainId) == parseInt(searchKey);
      })
  }
}

export default Blockchains;