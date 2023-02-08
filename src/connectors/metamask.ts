import BigNumber from 'bignumber.js';
import Wallets from '../constants/wallets';
import Connector from './connector';
import SmartContract from '../libs/smartcontract';
import IBlockchain from '../interfaces/iblockchain';
import IEIP712Data, { dummyEIP712Data } from '../interfaces/ieip712data';
import Blockchains from '../constants/blockchains';

const g: any = typeof globalThis === "object"
    ? globalThis
    : typeof window === "object"
        ? window
        : typeof global === "object"
            ? global
            : null; // Causes an error on the next line
const { ethereum } = g;

class Metamask extends Connector {
  _type = Wallets.Metamask;

  constructor() {
    super();
    const chainId = ethereum?.chainId || "0x1";
    ethereum?.on('accountsChanged', async (addresses: string[]) => {
      const address = addresses[0]
      if(address) {
        this.address = address;
      } else {
        this.reset();
      }
    });
  }

  async connect({ blockchain }: { blockchain?: IBlockchain } = {}) {
    return this._connect({ blockchain });
  }

  async disconnect() {
    this.reset();
    return true;
  }

  async send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string> {
    const from = this.address;
    const decimals = await this.getDecimals();
    const value = SmartContract.toSmallestUnitHex({ amount, decimals });
    const transactionParameters = {
      from,
      to,
      value,
      data,
      chainId: this.chainId
    }
    const requestData = {
      method: 'eth_sendTransaction',
      params: [ transactionParameters ],
    };
    const txHash = await ethereum?.request(requestData);
    return txHash;
  }

  async signTypedData(data: IEIP712Data): Promise<string> {
    const typedData: IEIP712Data = data;
    typedData.domain.chainId = this.chainId;
    typedData.message.from = this.address;

    const from = this.address;
    const params = [
      from,
      (typeof data) === "string" ?
        data:
        JSON.stringify(typedData)
    ];
    const method = "eth_signTypedData_v4";
    const requestData = {
      method,
      params,
      from
    };
    const result = await ethereum?.request(requestData);
    return result;
  }

  async getData({ contract, data, func, params, state = "latest" } : { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string> {
    if(data) {
      const requestData = {
        method: 'eth_call',
        params: [{
          to: contract,
          data
        }, state]
      };
      return ethereum?.request(requestData);
    } else {
      const _data = func ?
        SmartContract.toContractData({ func, params }) :
        '';
      const result = await this.getData({ contract, data: _data });
      return result;
    }
  }

  async getContractBalance({ contract, address, state = "latest" } : { contract: string, address: string, state?: string }): Promise<string> {
    let tmpAddress = address;
    if(!SmartContract.isEthereumAddress(address)) {
      tmpAddress = this.address;
    }
    return Promise.all([
      this.getData({ contract, func: 'balanceOf(address)', params: [tmpAddress], state }),
      this.getDecimals({ contract })
    ])
    .then(([ _balance, _decimals ]) => {
      const balance = (new BigNumber(_balance).dividedBy(new BigNumber(10).pow(_decimals))).toString();
      return Promise.resolve(balance);
    })
  }

  async getBalance({ contract = '', address = '', state = "latest" }) {
    const tmpAddress = SmartContract.isEthereumAddress(address) ?
      address :
      this.address;

    if(SmartContract.isEthereumAddress(contract)) {
      return this.getContractBalance({ contract, address: tmpAddress || '' });
    }

    const requestData = {
      method: "eth_getBalance",
      params: [tmpAddress, state]
    }
    return ethereum?.request(requestData).then((rs: BigNumber.Value) => {
      const balance = (new BigNumber(rs).dividedBy(new BigNumber(10).pow(18))).toString();
      return balance;
    })
  }

  async getDecimals({ contract } : { contract?: string } = {}) {
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
      const result = parseInt(rs, 10);
      return Promise.resolve(result);
    })
  }
  async getName({ contract } : { contract?: string } = {}) {
    let name;
    if(!contract) {
      try {
        name = this.blockchain.nativeCurrency.name || this.blockchain.nativeCurrency.symbol;
      }
      catch(e) {
        name = 'ETH';
      }
      return Promise.resolve(name);
    }

    return this.getData({ contract, func: 'name()' }).then((rs) => {
      const result = SmartContract.parseString(rs);
      return Promise.resolve(result);
    })
  }
  async getSymbol({ contract } : { contract?: string } = {}) {
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
  async getTotalSupply({ contract }  : { contract?: string } = {}) {
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

  async getAsset({ contract }: { contract?: string } = {}) {
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
  async getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }) {
    const result = await Promise.all([
      this.getData({ contract, func: 'allowance(address,address)', params: [owner, spender] }),
      this.getDecimals({ contract })
    ])
    .then(([ _allowance, _decimals ]) => {
      const allowance = (new BigNumber(_allowance).dividedBy(new BigNumber(10).pow(_decimals))).toString();
      return Promise.resolve(allowance);
    })

    return result;
  }

  async _connect({ blockchain } : { blockchain?: IBlockchain } = {}): Promise<boolean> {
    const requestData = {
      method: 'eth_requestAccounts',
    };

    const addresses = await ethereum?.request(requestData);
    let result = false;
    const address = addresses[0];
    if(address) {
      result = true;
      this.address = address;
      this.isConnected = true;

      if(blockchain) {
        this._blockchain = blockchain;
        await this.switchBlockchain({ blockchain });
      } else {
        const currentChainId = ethereum.chainId;
        const currentBlockchain = Blockchains.findByChainId(currentChainId);
        this._blockchain = currentBlockchain;
      }
    }
    return result;
  }

  async switchBlockchain({ blockchain } : { blockchain: IBlockchain }): Promise<boolean> {
    await this._addBlockchain({ blockchain })
    const requestData = {
      method: 'wallet_switchEthereumChain',
      params:[ { chainId: blockchain.chainId } ]
    };
    const result = ethereum?.request(requestData);
    return result;
  }
  
  async _addBlockchain({ blockchain } : { blockchain: IBlockchain }): Promise<boolean> {
    const { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls } = blockchain;
    const exceptChainId = ["0x1", "0x3", "0x4", "0x5", "0x2a"];
    if(exceptChainId.indexOf(chainId) > -1) {
      return true;
    }

    const requestData = {
      method: 'wallet_addEthereumChain',
      params: [ { chainId, chainName, nativeCurrency, rpcUrls, blockExplorerUrls } ],
    };
    return ethereum?.request(requestData);
  }
}

export default Metamask;