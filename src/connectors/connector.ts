import Blockchains from "../constants/blockchains";
import Wallets from "../constants/wallets";
import IAsset from "../interfaces/iasset";
import IBlockchain from "../interfaces/iblockchain";
import { EventEmitter } from 'events';

class Connector {
  _isConnected: boolean = false;
  _address: string = '0x';
  _blockchain: IBlockchain = Blockchains.BOLT;
  _type: string = Wallets.TideWallet;
  _assets: string[] = [];
  _emitter: EventEmitter = new EventEmitter();

  get isConnected() {
    return this._isConnected;
  }
  get blockchain() {
    return this._blockchain;
  }
  get address() {
    return this._address;
  }
  get type() {
    return this._type;
  }
  get chainId() {
    return this._blockchain.chainId;
  }
  get emitter() {
    return this._emitter;
  }
  set isConnected(isConnected: boolean) {
    console.log('set isConnected')
    this._isConnected = isConnected;
    if(isConnected) {
      this.onConnected();
    }
    else {
      this.onDisconnected();
    }
  }
  set address(address: string) {
    console.log('set address')
    this._address = address;
    this.onAccountsChanged();
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