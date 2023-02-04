import Blockchains from './constants/blockchains';
import Wallets from './constants/wallets';
import Connector from './connectors/connector';
import ConnectorFactory from './connectors/connector_factory';
import Environment from './libs/environment';
import IBlockchain from './interfaces/iblockchain';
import IEIP712Data from './interfaces/ieip712data';
// import { version } from '../package.json';

declare global {
  interface Window { Lunar: any; }
}

export class Lunar {
  // static version = `v${version}`;
  static version = `v0.4.3`;
  static Blockchains = Blockchains;
  static Wallets = Wallets;
  static listBlockchain(isTestnet: boolean | undefined) {
    return Blockchains.list(isTestnet);
  }
  static findBlockchain(chainId: string) {
    return Blockchains.findByChainId(chainId);
  }

  _connector: Connector | undefined = undefined;
  _connectors: Connector[] = [];

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

  on(event: string, callback: () => void) {
    return 
  }

  findConnector({ walletType }: { walletType: string }): Connector|undefined {
    return this._connectors
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
    this._connector = this.findConnector({ walletType });
    if(!(this._connector)) {
      const newConnector = ConnectorFactory.create(walletType);
      this._connectors.push(newConnector);
      this._connector = newConnector;
      result = await this._connector.connect({ blockchain });
    }
    return result;
  }

  async switchBlockchain({ blockchain }: { blockchain: IBlockchain }) {
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

  async signTypedData(params: any): Promise<string> {
    let result = '0x'
    if(this._connector) {
      result = await this._connector.signTypedData(params);
    }
    return result;
  }

  async interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any> {
    if(!this._connector) {
      return;
    }
    return this._connector.interfaceOf({ contract, abi });
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