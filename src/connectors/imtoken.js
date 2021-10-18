import Wallets from '../constants/wallets.js';
import Connector from './connector.js'

class ImToken extends Connector {
  _type = Wallets.imToken;
}

export default ImToken;