import Blockchains from './constants/blockchain.js';
import Wallets from './constants/wallets.js';
import ConnectorFactory from './connectorFactory.js';
import Environment from './environment.js'

class Lunar {
  static blockchains = Blockchains;

  _connector;
  _connectors = [];
  _blockchain;

  constructor() {
    this._connector = ConnectorFactory.create();
  }

  get env() {
    return {
      platform: Environment.getPlatform(),
      wallets: Environment.getWallets()
    }
  }

  get isConnected() {
    return this._connector ?
      this._connector.isConnected :
      false;
  }

  findConnector({ walletType }) {
    return this._connectors.find((v) => {
      return v.type = walletType;
    })
  }

  async connect({ wallet, blockchain } = {}) {
    if(this.isConnected) {
      return true;
    }

    const defaultWallet = this.env.wallets[0];
    const walletType = (wallet || defaultWallet);

    this._connector = this.findConnector({ walletType });
    if(!(this._connector)) {
      const newConnector = ConnectorFactory.create(walletType);
      this._connectors.push(newConnector);
      this._connector = newConnector;
    }
    this._blockchain = await this._connector.connect({ blockchain });
    return this.isConnected;
  }

  async switchBlockchain({ chainId }) {
    this._connector._switchBlockchain({ chainId });
  }

  async disconnect() {
    return this._connector.disconnect();
  }

  async getBalance({ contract, address } = {}) {
    return this._connector.getBalance({ contract, address });
  }

  async getData({ contract, func, params, data }) {
    return this._connector.getData({ contract, func, params, data });
  }

  async send({ to, amount, data }) {
    return this._connector.send({ to, amount, data });
  }
}

if(window) {
  window.Lunar = Lunar;

  /** Test Case
  window.lunar = new Lunar();
  window.lunar.connect({ blockchain: Lunar.blockchains.Ropsten });
  window.lunar.getData({ contract: '0x333cf7C5F2A544cc998d4801e5190BCb9E04003e', func: 'factory()', params: [] });
  window.lunar.getBalance();
  window.lunar.getBalance({ address: '0x048Adee1B0E93b30f9F7b71f18b963cA9bA5dE3b' });
  window.lunar.getBalance({ contract: '0x9c8fa1ee532f8afe9f2e27f06fd836f3c9572f71', address: '0xdc926e34e73292cd7c48c6fd7375af7d93435d36' });
   */
}