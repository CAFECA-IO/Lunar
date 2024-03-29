import Blockchains from './constants/blockchains';
import Wallets from './constants/wallets';
import Connector from './connectors/connector';
import ConnectorFactory from './connectors/connector_factory';
import Environment from './libs/environment';
import IBlockchain from './interfaces/iblockchain';
import IEIP712Data from './interfaces/ieip712data';
import { recoverAddress } from './libs/common';
import IJSON from './interfaces/ijson';
import { EventEmitter } from 'events';
import { keccak256 } from '@cafeca/keccak';

declare global {
  interface Window { Lunar: any; }
}

// events:
// connected | address
// disconnected | boolean
// accountChanged | address

export class Lunar {
  private static instance: Lunar;
  public static version = `v0.5.10`;
  public static Blockchains = Blockchains;
  public static Wallets = Wallets;
  public static keccak256 = keccak256;

  public static getInstance(): Lunar {
    if (!Lunar.instance) {
      Lunar.instance = new Lunar();
    }

    return Lunar.instance;
  }
  public static listBlockchain(isTestnet: boolean | undefined) {
    return Blockchains.list(isTestnet);
  }
  public static findBlockchain(chainId: string) {
    return Blockchains.findByChainId(chainId);
  }
  public static recovery(message: string, signature: string): string {
    // ++ ToDo: finish in v0.6.0
    return '0x';
  }
  public static recoveryTypedData(params: IJSON, signature: string): string {
    // ++ ToDo: finish in v0.6.0
    return '0x';
  }


  private _connector: Connector|undefined;
  private _connectors: Connector[] = [];
  private _emitter: EventEmitter = new EventEmitter();


  constructor() {
    this.connector = ConnectorFactory.create();
  }

  public resetEvents() {
    this._emitter.removeAllListeners();
  }

  public get env() {
    return {
      platform: Environment.getPlatform(),
      wallets: Environment.getWallets()
    }
  }

  public get isConnected() {
    return this.connector ?
      this.connector.isConnected :
      false;
  }

  public get address() {
    return this.connector ?
      this.connector.address:
      false;
  }

  public get blockchain() {
    return this.connector ?
      this.connector.blockchain:
      undefined;
  }

  public get emitter() {
    return this._emitter;
  }

  public get connector() {
    return this._connector;
  }
  public set connector(connector: Connector|undefined) {
    if(connector === undefined) return;
    this._connector = connector;
    this._connector.emitter = this.emitter;
  }

  public get connectors() {
    return this._connectors;
  }

  public on(event: string, callback: () => void) {
    this.emitter.on(event, callback);
    return 
  }

  public findConnector({ walletType }: { walletType: string }): Connector|undefined {
    return this.connectors
      .filter((v) => !!v)
      .find((v) => {
        return v.type === walletType;
      })
  }

  public async connect({ wallet, blockchain }: { wallet?: string, blockchain?: IBlockchain } = {}): Promise<boolean> {
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

  public async switchBlockchain({ blockchain }: { blockchain: IBlockchain }) {
    if(!this.connector) {
      return false;
    }
    const result = await this.connector.switchBlockchain({ blockchain });
    return result;
  }

  public async disconnect() {
    if(!this.connector) {
      return true;
    }
    return this.connector.disconnect();
  }

  public async getAsset({ contract }: { contract?: string } = {}) {
    if(!this.connector) {
      return;
    }
    return this.connector.getAsset({ contract });
  }

  public async getBalance({ contract, address }: { contract?: string, address?: string } = {}) {
    if(!this.connector) {
      return '0';
    }
    return this.connector.getBalance({ contract, address });
  }

  public async getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }) {
    if(!this.connector) {
      return '0';
    }
    return this.connector.getAllowance({ contract, owner, spender });
  }

  public async getData({ contract, func, params, data }: { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string> {
    if(!this.connector) {
      return '0x';
    }
    return this.connector.getData({ contract, func, params, data });
  }

  public async send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string> {
    if(!this.connector) {
      return '0x';
    }
    return this.connector.send({ to, amount, data });
  }

  public async signTypedData(params: any): Promise<string> {
    let result = '0x';
    try {
      result = await this.connector?.signTypedData(params) || '0x';
    } catch (error) {
      throw error;
      // ++ ToDo: finish in v0.6.0
    }
    return result;
  }

  public verify(message: string, signature: string, signer?: string): boolean {
    // ++ ToDo: finish in v0.6.0
    return signature.length > 18;
  }
  public verifyTypedData(params: IJSON, signature: string, signer?: string): boolean {
    // ++ ToDo: finish in v0.6.0
    // verify metamask typed data v4

    const message = JSON.stringify(params);
    const json = JSON.parse(message);
    const address = json?.message?.signer;
    const expectSigner = address || signer || '';
    const result = address?
      (expectSigner === address.toLowerCase() && this.verify(message, signature, expectSigner)) :
      this.verify(message, signature, expectSigner);
    /*
    const hash = keccak256(data);
    const chainId = this.blockchain?.chainId || '0x1';
    const recoveredAddress = recoverAddress(hash, signature, chainId);
    const result = signer === recoveredAddress.toLowerCase();
    */
    return result;
  }

  public async interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any> {
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