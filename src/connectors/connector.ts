import { Blockchains, Blockchain } from "../constants/blockchains";
import Wallets from "../constants/wallets";
import IAsset from "../interfaces/iasset";

class Connector {
  _isConnected: boolean = false;
  _address: string = '0x';
  _blockchain: Blockchain = Blockchains.BOLT;
  _type: string = Wallets.TideWallet;
  _assets: string[] = [];

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

  constructor() {
    return this;
  }

  async init() {
    return true;
  }

  on(event:Event, callback:() => void) {
    return;
  }

  async connect({ blockchain }: { blockchain?: Blockchain } = {}): Promise<boolean> {
    return true;
  }

  async switchBlockchain({ blockchain }: { blockchain: Blockchain }): Promise<boolean> {
    return true;
  }

  async disconnect(): Promise<boolean> {
    return true;
  }

  async send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string> {
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
}

export default Connector;