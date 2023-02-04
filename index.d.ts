import IAsset from "./src/interfaces/iasset";
import IBlockchain from "./src/interfaces/iblockchain";
import IConnector from "./src/interfaces/iconnector";
import IEnv from "./src/interfaces/ienv";

declare class Lunar {
  static version: string;
  static Blockchains: IBlockchain[];
  static Wallets: string[];
  static listBlockchain(isTestnet: boolean | undefined): IBlockchain[];
  static findBlockchain(chainId: number): IBlockchain;

  env: IEnv;
  isConnected: boolean;
  address: string;
  blockchain: IBlockchain;

  constructor();
  on(event: string, callback: Function): void;
  findConnector({ walletType }: { walletType: string }): IConnector | undefined;
  connect({ wallet, blockchain }: { wallet?: string, blockchain?: IBlockchain }): Promise<boolean>;
  switchBlockchain({ blockchain }: { blockchain: IBlockchain }): Promise<boolean>;
  disconnect(): Promise<boolean>;
  getAsset({ contract }: { contract?: string }): Promise<IAsset | undefined>;
  getBalance({ contract, address }: { contract?: string, address?: string }): Promise<string>;
  getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }): Promise<string>;
  getData({ contract, func, params, data }: { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string>;
  send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string>;
  signTypedData(params: any): Promise<string>;
  interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any>;
}
export default Lunar;
export const version: string;
export const Blockchains: IBlockchain[];
export const Wallets: string[];
export function listBlockchain(isTestnet: boolean | undefined): IBlockchain[];
export function findBlockchain(chainId: number): IBlockchain;