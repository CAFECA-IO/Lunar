import IAsset from "./src/interfaces/iasset";
import IBlockchain from "./src/interfaces/iblockchain";
import IConnector from "./src/interfaces/iconnector";
import IEnv from "./src/interfaces/ienv";
import IJSON from "./src/interfaces/ijson";

declare class Lunar {
  private static instance: Lunar;
  public static version: string;
  public static Blockchains: IBlockchain[];
  public static Wallets: string[];
  public static getInstance(): Lunar
  public static listBlockchain(isTestnet: boolean | undefined): IBlockchain[];
  public static findBlockchain(chainId: string): IBlockchain;
  public static recovery(message: string, signature: string): string;
  public static recoveryTypedData(params: IJSON, signature: string): string;

  public env: IEnv;
  public isConnected: boolean;
  public address: string;
  public blockchain: IBlockchain;

  public constructor();
  public resetEvents(): void;
  public on(event: string, callback: Function): void;
  public findConnector({ walletType }: { walletType: string }): IConnector | undefined;
  public connect({ wallet, blockchain }: { wallet?: string, blockchain?: IBlockchain }): Promise<boolean>;
  public switchBlockchain({ blockchain }: { blockchain: IBlockchain }): Promise<boolean>;
  public disconnect(): Promise<boolean>;
  public getAsset({ contract }: { contract?: string }): Promise<IAsset | undefined>;
  public getBalance({ contract, address }: { contract?: string, address?: string }): Promise<string>;
  public getAllowance({ contract, owner, spender }: { contract: string, owner: string, spender: string }): Promise<string>;
  public getData({ contract, func, params, data }: { contract: string, data?: string, func?: string, params?: string[], state?: string }): Promise<string>;
  public send({ to, amount, data }: { to: string, amount: number, data:string }): Promise<string>;
  public signTypedData(params: IJSON): Promise<string>;
  public verify(message: string, signature: string, expectSigner?: string): boolean;
  public verifyTypedData(params: IJSON, signature: string, expectSigner?: string): boolean;
  public interfaceOf({ contract, abi }: { contract: string, abi: any }): Promise<any>;
}
export default Lunar;
export const version: string;
export const Blockchains: IBlockchain[];
export const Wallets: string[];
export function listBlockchain(isTestnet: boolean | undefined): IBlockchain[];
export function findBlockchain(chainId: number): IBlockchain;