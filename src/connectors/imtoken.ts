import Wallets from '../constants/wallets';
import Metamask from './metamask'

class ImToken extends Metamask {
  _type = Wallets.imToken;
}

export default ImToken;