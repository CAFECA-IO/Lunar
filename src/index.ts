import Blockchains from './constants/blockchains';
import Wallets from './constants/wallets';
import Connector from './connectors/connector';
import ConnectorFactory from './connectors/connector_factory';
import Environment from './libs/environment';
import IBlockchain from './interfaces/iblockchain';
import IEIP712Data from './interfaces/ieip712data';
import { EventEmitter } from 'events';
// import { version } from '../package.json';

declare global {
  interface Window { Lunar: any; }
}

// events:
// connected | address
// disconnected | boolean
// accountChanged | address

class lunarEventEmitter extends EventEmitter {
  id: string = '0';
}

export class Lunar {
  // static version = `v${version}`;
  static version = `v0.4.4`;
  static Blockchains = Blockchains;
  static Wallets = Wallets;
  static listBlockchain(isTestnet: boolean | undefined) {
    return Blockchains.list(isTestnet);
  }
  static findBlockchain(chainId: string) {
    return Blockchains.findByChainId(chainId);
  }

  _connector: Connector|undefined;
  _connectors: Connector[] = [];
  _emitter: lunarEventEmitter = new lunarEventEmitter();


  constructor() {
    this.emitter.id = 'xxx';
    this.connector = ConnectorFactory.create();
  }

  get env() {
    return {
      platform: Environment.getPlatform(),
      wallets: Environment.getWallets()
    }
  }

  get isConnected() {
    return this.connector ?
      this.connector.isConnected :
      false;
  }

  get address() {
    return this.connector ?
      this.connector.address:
      false;
  }

  get blockchain() {
    return this.connector ?
      this.connector.blockchain:
      undefined;
  }

  get emitter() {
    return this._emitter;
  }

  get connector() {
    return this._connector;
  }

  get connectors() {
    return this._connectors;
  }

  set connector(connector: Connector|undefined) {
    if(connector === undefined) return;
    this._connector = connector;
    this._connector.emitter = this.emitter;
  }

  on(event: string, callback: () => void) {
    this.emitter.on(event, callback);
    return 
  }

  findConnector({ walletType }: { walletType: string }): Connector|undefined {
    return this.connectors
      .filter((v) => !!v)
      .find((v) => {
        return v.type === walletType;
      })
  }

  async connect({ wallet, blockchain }: { wallet?: string, blockchain?: IBlockchain } = {}): Promise<boolean> {
    if(this.isConnected) {
      return true;
    }

    let result = false;
    const defaultWallet = this.env.wallets[0];
    const walletType = (wallet || defaultWallet);
    this.connector = this.findConnector({ walletType });
    if(!(this.connector)) {
      const newConnector = ConnectorFactory.create(walletType);
      this.connectors.push(newConnector);
      this.connector = newConnector;
    }
    result = await this.connector.connect({ blockchain });
    return result;
  }

  async switchBlockchain({ blockchain }: { blockchain: IBlockchain }) {
    if(!this.connector) {
      return false;
    }
    const result = await this.connector.switchBlockchain({ blockchain });
    return result;
  }

  async disconnect() {
    if(!this.connector) {
      return true;
    }
    return this.connector.disconnect();
  }

  async getAsset({ contract }: { contract?: string } = {}) {
    if(!this.connector) {
      return;
    }
    return this.connector.getAsset({ contract });
  }

  async getBalance({ contract, address }: { contract?: string, address?: string } = {}) {
    if(!this.connector) {
      return '0';
    }
    return this.connector.getBalance({ contract, address });
  }

  async getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }) {
    if(!this.connector) {
      return '0';
    }
    return this.connector.getAllowance({ contract, owner, spender });
  }

  async getData({ contract, func, params, data }: { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string> {
    if(!this.connector) {
      return '0x';
    }
    return this.connector.getData({ contract, func, params, data });
  }

  async send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string> {
    if(!this.connector) {
      return '0x';
    }
    return this.connector.send({ to, amount, data });
  }

  async signTypedData(params: any): Promise<string> {
    let result = '0x'
    if(this.connector) {
      result = await this.connector.signTypedData(params);
    }
    return result;
  }

  async interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any> {
    if(!this.connector) {
      return;
    }
    return this.connector.interfaceOf({ contract, abi });
  }
}

const g: any = typeof globalThis === "object"
    ? globalThis
    : typeof window === "object"
        ? window
        : typeof global === "object"
            ? global
            : null; // Causes an error on the next line
g.Lunar = Lunar;

module.exports = Lunar;
export default Lunar;