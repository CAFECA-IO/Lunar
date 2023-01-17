import Wallets from '../constants/wallets';
import Metamask from './metamask'

class TideWallet extends Metamask {
  _type = Wallets.TideWallet;
}

export default TideWallet;