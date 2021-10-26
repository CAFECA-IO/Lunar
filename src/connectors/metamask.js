import Wallets from '../constants/wallets.js';
import Connector from './connector.js'
import SmartContract from '../libs/smartcontract.js'
import BigNumber from '../libs/bignumber.js';

class Metamask extends Connector {
  _type = Wallets.Metamask;

  async connect({ blockchain }) {
    if(blockchain) {
      await this._addBlockchain({ blockchain });
    }
    return this._connect({ blockchain });
  }

  async disconnect() {
    this._isConnected = false;
  }

  async send({ from = this.address, to, amount, data }) {
    const decimals = await this.getDecimals();
    const value = SmartContract.toSmallestUnitHex({ amount, decimals });
    const transactionParameters = {
      from,
      to,
      value,
      data,
      chainId: this._chainId
    }
    const requestData = {
      method: 'eth_sendTransaction',
      params: [ transactionParameters ],
    };
    const txHash = await ethereum.request(requestData);
    return txHash;
  }

  async getData({ contract, data, func, params }) {
    if(data) {
      console.log(contract, data);
      const requestData = {
        method: 'eth_call',
        params: [{
          to: contract,
          data
        }]
      };
      return ethereum.request(requestData);
    } else {
      let _data = SmartContract.toContractData({ func, params });
      const result = await this.getData({ contract, data: _data });
      return result;
    }
  }

  async getBalance({ contract, address } = {}) {
    let address_ = address;
    if(!SmartContract.isEthereumAddress(address)) {
      address_ = this.address;
    }
    if(typeof(contract) == 'string') {
      return this.getContractBalance({ contract, address });
    }

    const requestData = {
      method: "eth_getBalance",
      params: [address_, "latest"]
    }
    return ethereum.request(requestData).then((rs) => {
      const balance = (new BigNumber(rs).dividedBy(new BigNumber(10).pow(18))).toString();
      return balance;
    })
  }

  async getContractBalance({ contract, address } = {}) {
    let address_ = address;
    if(!SmartContract.isEthereumAddress(address)) {
      address_ = this.address;
    }
    return Promise.all([
      this.getData({ contract, func: 'balanceOf(address)', params: [address_] }),
      this.getDecimals({ contract })
    ])
    .then(([ _balance, _decimals ]) => {
      const balance = (new BigNumber(_balance).dividedBy(new BigNumber(10).pow(_decimals))).toString();
      return Promise.resolve(balance);
    })
  }

  async getDecimals({ contract } = {}) {
    let decimals;
    if(!contract) {
      try {
        decimals = this.blockchain.nativeCurrency.decimals;
      }
      catch(e) {
        decimals = 18;
      }
      return Promise.resolve(decimals);
    }

    return this.getData({ contract, func: 'decimals()' }).then((rs) => {
      const result = parseInt(rs);
      return Promise.resolve(result);
    })
  }
  async getName({ contract } = {}) {
    let symbol;
    if(!contract) {
      try {
        symbol = this.blockchain.nativeCurrency.symbol;
      }
      catch(e) {
        symbol = 'ETH';
      }
      return Promise.resolve(symbol);
    }

    return this.getData({ contract, func: 'name()' }).then((rs) => {
      const result = SmartContract.parseString(rs);
      return Promise.resolve(result);
    })
  }
  async getSymbol({ contract } = {}) {
    let symbol;
    if(!contract) {
      try {
        symbol = this.blockchain.nativeCurrency.symbol;
      }
      catch(e) {
        symbol = 'ETH';
      }
      return Promise.resolve(symbol);
    }

    return this.getData({ contract, func: 'symbol()' }).then((rs) => {
      const result = SmartContract.parseString(rs);
      return Promise.resolve(result);
    })
  }
  async getTotalSupply({ contract } = {}) {
    let totalSupply;
    if(!contract) {
      return Promise.resolve('0');
    }

    return Promise.all([
      this.getData({ contract, func: 'totalSupply()' }),
      this.getDecimals({ contract })
    ])
    .then(([ _totalSupply, _decimals ]) => {
      const totalSupply = (new BigNumber(_totalSupply).dividedBy(new BigNumber(10).pow(_decimals))).toString();
      return Promise.resolve(totalSupply);
    })
  }
  async getAsset({ contract, decimals } = {}) {
    return Promise.all([
      this.getName({ contract }),
      this.getSymbol({ contract }),
      this.getDecimals({ contract }),
      this.getTotalSupply({ contract })
    ])
    .then(([ name, symbol, decimals, totalSupply ]) => {
      return Promise.resolve({ name, symbol, decimals, totalSupply });
    })
  }
  async getAllowance({ contract, owner, spender } = {}) {
    let allowance;
    if(!contract) {
      return Promise.resolve('0');
    }

    return Promise.all([
      this.getData({ contract, func: 'allowance(address,address)', params: [owner, spender] }),
      this.getDecimals({ contract })
    ])
    .then(([ _allowance, _decimals ]) => {
      console.log(_allowance, _decimals);
      const allowance = (new BigNumber(_allowance).dividedBy(new BigNumber(10).pow(_decimals))).toString();
      return Promise.resolve(allowance);
    })
  }

  async _connect({ blockchain }) {
    const requestData = {
      method: 'eth_requestAccounts',
    };
    return ethereum.request(requestData).then((rs) => {
      this._blockchain = blockchain;
      this._address = rs[0];
      this._isConnected = true;
      return this._switchBlockchain(blockchain);
    });
  }
  async _addBlockchain({ blockchain }) {
    const chainId = parseInt(blockchain.chainId);
    const exceptChainId = [1, 3, 4, 5, 42];
    if(exceptChainId.indexOf(chainId) > -1) {
      return true;
    }
    const requestData = {
      method: 'wallet_addEthereumChain',
      params: [ blockchain ],
    };
    return ethereum.request(requestData);
  }
  async _switchBlockchain({ chainId }) {
    const requestData = {
      method: 'wallet_switchEthereumChain',
      params:[ { chainId } ]
    };
    return ethereum.request(requestData);
  }
}

export default Metamask;