import { EventEmitter } from 'events';
import Blockchains, { Blockchain } from './constants/blockchains';
import Wallets from './constants/wallets';
import Connector from './connectors/connector';
import ConnectorFactory from './connectors/connector_factory';
import Environment from './libs/environment';
import { version } from '../package.json';

declare global {
  interface Window { Lunar: any; }
}

class Lunar {
  static version = `v${version}`;
  static Blockchains = Blockchains;
  static Wallets = Wallets;
  static listBlockchain(isTestnet: boolean | undefined) {
    return Blockchains.list(isTestnet);
  }
  static findBlockchain(chainId: number) {
    return Blockchains.findByChainId(chainId);
  }

  _connector: Connector | undefined = undefined;
  _connectors: Connector[] = [];
  _eventEmitter: EventEmitter | undefined = undefined;

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

  on(event: string, callback: Function) {
    return 
  }

  findConnector({ walletType }: { walletType: string }): Connector|undefined {
    return this._connectors
      .filter((v) => !!v)
      .find((v) => {
        return v.type == walletType;
      })
  }

  async connect({ wallet, blockchain }: { wallet?: string, blockchain?: Blockchain } = {}) {
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

  async switchBlockchain({ blockchain }: { blockchain: Blockchain }) {
    if(!this._connector) {
      return false;
    }
    const result = await this._connector.switchBlockchain({ blockchain });
    return result;
  }

  async disconnect() {
    if(!this._connector) {
      return true;
    }
    return this._connector.disconnect();
  }

  async getAsset({ contract }: { contract?: string } = {}) {
    if(!this._connector) {
      return;
    }
    return this._connector.getAsset({ contract });
  }

  async getBalance({ contract, address }: { contract?: string, address?: string } = {}) {
    if(!this._connector) {
      return '0';
    }
    return this._connector.getBalance({ contract, address });
  }

  async getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }) {
    if(!this._connector) {
      return '0';
    }
    return this._connector.getAllowance({ contract, owner, spender });
  }

  async getData({ contract, func, params, data }: { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string> {
    if(!this._connector) {
      return '0x';
    }
    return this._connector.getData({ contract, func, params, data });
  }

  async send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string> {
    if(!this._connector) {
      return '0x';
    }
    return this._connector.send({ to, amount, data });
  }

  async interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any> {
    if(!this._connector) {
      return;
    }
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