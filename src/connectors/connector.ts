import Blockchains from "../constants/blockchains";
import Wallets from "../constants/wallets";
import IAsset from "../interfaces/iasset";
import IBlockchain from "../interfaces/iblockchain";
import { EventEmitter } from 'events';

const g: any = typeof globalThis === "object"
    ? globalThis
    : typeof window === "object"
        ? window
        : typeof global === "object"
            ? global
            : null; // Causes an error on the next line
const { ethereum } = g;

class Connector {
  _isConnected: boolean = false;
  _address: string = '0x';
  _blockchain: IBlockchain = Blockchains.iSunCoin;
  _type: string = Wallets.TideWallet;
  _assets: string[] = [];
  _emitter: EventEmitter = new EventEmitter();

  get isConnected() {
    return this._isConnected;
  }
  set isConnected(value: boolean) {
    this._isConnected = value;
    if(value) {
      this.onConnected();
    }
    else {
      this.onDisconnected();
    }
  }

  get blockchain() {
    return this._blockchain;
  }

  get address() {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
    this.onAccountsChanged();
  }

  get type() {
    return this._type;
  }
  get chainId() {
    const chainId = ethereum?.chainId || this._blockchain.chainId;
    return chainId;
  }
  get emitter() {
    return this._emitter;
  }
  set emitter(emitter: EventEmitter) {
    this._emitter = emitter;
  }

  constructor() {
    return this;
  }

  async init() {
    return true;
  }

  async reset() {
    this._address = '0x';
    this.isConnected = false;
    return true;
  }

  async connect({ blockchain }: { blockchain?: IBlockchain } = {}): Promise<boolean> {
    return true;
  }

  async switchBlockchain({ blockchain }: { blockchain: IBlockchain }): Promise<boolean> {
    return true;
  }

  async disconnect(): Promise<boolean> {
    return true;
  }

  async send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string> {
    return "0x";
  }

  async signTypedData(params: any): Promise<string> {
    return "0x";
  }

  async getAsset({ contract }: { contract?: string }): Promise<IAsset> {
    return { name: '', symbol: '', decimals: 18, totalSupply: '0' };
  }

  async getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }): Promise<string> {
    return '0';
  }

  async getContractBalance({ contract, address, state }: { contract: string, address: string, state?: string }): Promise<string> {
    return "0x";
  }

  async getBalance({ contract, address, state }: { contract?: string, address?: string, state?: string } = {}): Promise<string> {
    return "0x";
  }

  async getData({ contract, data, func, params, state }: { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string> {
    return "0x";
  }

  async interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any> {
    return;
  }

  // Events
  onConnected() {
    this.emitter.emit('connected', this.address);
  }
  onDisconnected() {
    this.emitter.emit('disconnected', false);
  }
  onAccountsChanged() {
    this.emitter.emit('accountsChanged', this.address);
  }
}

export default Connector;