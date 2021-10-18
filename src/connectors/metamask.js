import Wallets from '../constants/wallets.js';
import Connector from './connector.js'
import SmartContract from '../libs/smartcontract.js'

class Metamask extends Connector {
  _type = Wallets.Metamask;

  async connect({ blockchain }) {
    if(blockchain) {
      await this._addBlockchain({ blockchain });
    }
    
    return this._connect();
  }
  async disconnect() {
    this._isConnected = false;
  }
  async send({ to, amount, data }) {
    const transactionParameters = {
      to,
      value: amount,
      data,
      chainId: this._chainId
    }
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [ transactionParameters ],
    });
    return txHash;
  }
  async getData({ contract, data, func, params }) {
    if(data) {
      console.log(contract, data);
      return ethereum.request({
        method: 'eth_call',
        params: [{
          to: contract,
          data
        }]
      })
    } else {
      let _data = SmartContract.toContractData({ func, params });
      return this.getData({ contract, data: _data });
    }
  }
  async getBalance({ contract }) {

  }

  async _connect() {
    return ethereum.request({
      method: 'eth_requestAccounts',
    }).then((rs) => {
      this._address = rs[0];
      this._isConnected = true;
      return;
    });
  }
  async _addBlockchain({ blockchain }) {
    this._blockchain = blockchain;
    return ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [ blockchain ],
    });
  }
}

export default Metamask;