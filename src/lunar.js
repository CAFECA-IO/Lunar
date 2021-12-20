import { EventEmitter } from 'events';
import Blockchains from './constants/blockchain.js';
import Wallets from './constants/wallets.js';
import ConnectorFactory from './connectors/connectorFactory.js';
import Environment from './libs/environment.js';
import { version } from '../package.json';

class Lunar {
  static Blockchains = Blockchains;
  static Wallets = Wallets;
  static listBlockchain({ testnet } = {}) {
    return Blockchains.list({ testnet });
  }
  static findBlockchain({ chainId } = {}) {
    return Blockchains.findByChainId(chainId);
  }
  static version = `v${version}`;

  _connector;
  _connectors = [];
  _eventEmitter;

  constructor() {
    this._eventEmitter = new EventEmitter();
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

  get address() {
    return this._connector ?
      this._connector.address:
      false;
  }

  get blockchain() {
    return this._connector ?
      this._connector.blockchain:
      undefined;
  }

  on(event, callback) {
    return 
  }

  findConnector({ walletType }) {
    return this._connectors
      .filter((v) => !!v)
      .find((v) => {
        return v.type == walletType;
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
      await this._connector.connect({ blockchain });
    }
    return this.address;
  }

  async switchBlockchain({ blockchain }) {
    await this._connector.switchBlockchain({ blockchain });
    return this.address;
  }

  async disconnect() {
    return this._connector.disconnect();
  }

  async getAsset({ contract } = {}) {
    return this._connector.getAsset({ contract });
  }

  async getBalance({ contract, address } = {}) {
    return this._connector.getBalance({ contract, address });
  }

  async getAllowance({ contract, owner, spender }) {
    return this._connector.getAllowance({ contract, owner, spender });
  }

  async getData({ contract, func, params, data }) {
    return this._connector.getData({ contract, func, params, data });
  }

  async send({ to, amount, data }) {
    return this._connector.send({ to, amount, data });
  }

  async interfaceOf({ contract, abi }) {
    return this._connector.interfaceOf({ contract, abi });
  }
}

if(window) {
  window.Lunar = Lunar;

  /** Test Case
  window.lunar = new Lunar();
  window.lunar.connect({ blockchain: Lunar.Blockchains.Ropsten });
  window.lunar.getData({ contract: '0x333cf7C5F2A544cc998d4801e5190BCb9E04003e', func: 'factory()', params: [] });
  window.lunar.getBalance();
  window.lunar.getBalance({ address: '0x048Adee1B0E93b30f9F7b71f18b963cA9bA5dE3b' });
  window.lunar.getBalance({ contract: '0x9c8fa1ee532f8afe9f2e27f06fd836f3c9572f71', address: '0xdc926e34e73292cd7c48c6fd7375af7d93435d36' });
  window.lunar.send({ to: '0xd8a149a2E906613CB1e5c0FFf675AF2636Cf77bF', amount: '0.001' });
   */
}

export default Lunar;