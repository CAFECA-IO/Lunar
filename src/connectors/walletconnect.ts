import BigNumber from 'bignumber.js';
import Wallets from '../constants/wallets';
import Connector from './connector';
import SmartContract from '../libs/smartcontract';
import IBlockchain from '../interfaces/iblockchain';
import IEIP712Data, { dummyEIP712Data } from '../interfaces/ieip712data';
import Blockchains from '../constants/blockchains';

declare let ethereum: any;

class WalletConnect extends Connector {
}

export default WalletConnect;