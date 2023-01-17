import Wallets from '../constants/wallets.js';
import SmartContract from '../libs/smartcontract.js';
import Metamask from './metamask.js'

declare let ethereum: any;

class ImToken extends Metamask {
  _type = Wallets.imToken;
}

export default ImToken;