import IAsset from "./iasset";
import IBlockchain from "./iblockchain";

interface IConnector {
  _isConnected: boolean;
  _address: string;
  _blockchain: IBlockchain;
  _type: string;
  _assets: string[];

  get isConnected(): boolean;
  get blockchain(): IBlockchain;
  get address(): string;
  get type(): string;
  get chainId(): number;

  init(): Promise<boolean>;
  on(event:Event, callback:Function): void;
  connect({ blockchain }: { blockchain?: IBlockchain }): Promise<boolean>;
  switchBlockchain({ blockchain }: { blockchain: IBlockchain }): Promise<boolean>;
  disconnect(): Promise<boolean>;
  send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string>;
  getAsset({ contract }: { contract?: string }): Promise<IAsset>;
  getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }): Promise<string>;
  getContractBalance({ contract, address, state }: { contract: string, address: string, state?: string }): Promise<string>;
  getBalance({ contract, address, state }: { contract?: string, address?: string, state?: string }): Promise<string>;
  getData({ contract, data, func, params, state }: { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string>;
  interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any>;
}

export default IConnector