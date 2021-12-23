import Wallets from '../constants/wallets.js';
import Metamask from './metamask.js'

class ImToken extends Metamask {
  _type = Wallets.imToken;
}

export default ImToken;