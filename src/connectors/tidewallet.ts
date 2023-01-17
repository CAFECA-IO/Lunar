import Wallets from '../constants/wallets.js';
import Connector from './connector.js'

class TideWallet extends Connector {
  _type = Wallets.TideWallet;
}

export default TideWallet;