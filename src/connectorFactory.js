import Wallets from './constants/wallets.js';
import TideWallet from './connectors/tidewallet.js';
import ImToken from './connectors/imtoken.js';
import Metamask from './connectors/metamask.js';

class ConnectorFactory {
  static get types() {
    return [ 'TideWallet', 'Metamask', 'imToken' ];
  }

  static create(wallet = '') {
    let connector;
    switch(wallet) {
      case Wallets.TideWallet:
        connector = new TideWallet();
      break;

      case Wallets.imToken:
        connector = new ImToken();
      break;

      case Wallets.Metamask:
        connector = new Metamask();
      default:  
    }
    return connector;
  }
}

export default ConnectorFactory;