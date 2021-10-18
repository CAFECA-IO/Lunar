import Wallets from './constants/wallets.js';
import ConnectorFactory from './connectorFactory.js';
import Environment from './environment.js'

class Lunar {
  _connector;
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

  async connect({ wallet, blockchain } = {}) {
    if(this.isConnected) {
      return true;
    }

    const defaultWallet = this.env.wallets[0];
    const walletType = (wallet || defaultWallet);

    if(!(this._connector && this._connector.type == walletType)) {
      this._connector = ConnectorFactory.create(walletType);
    }
    this._blockchain = await this._connector.connect({ blockchain });
    return this.isConnected;
  }

  async disconnect() {
    return this._connector.disconnect();
  }

  async getBalance({ contract } = {}) {
    return this._connector.getBalance({ contract });
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
}