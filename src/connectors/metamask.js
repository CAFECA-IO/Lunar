import Connector from './connector.js'

class Metamask extends Connector {
  connect({ blockchain }) {
    if(blockchain) {
      this._addBlockchain({ blockchain });
    } else {
      this._connect();
    }
  }
  disconnect() {}
  send({ to, amount, data }) {}
  getData({ contract, data, func, params }) {}

  async _connect() {
    return ethereum.request({
      method: 'eth_requestAccounts',
    });
  }
  async _addBlockchain({ blockchain }) {
    return ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [tidetime],
    });
  }
}

export default Metamask;