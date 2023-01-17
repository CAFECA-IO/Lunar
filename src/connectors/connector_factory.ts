import Wallets from '../constants/wallets.js';
import TideWallet from './tidewallet.js';
import ImToken from './imtoken.js';
import Metamask from './metamask.js';
import Connector from './connector.js';

class ConnectorFactory {
  static get types() {
    return [ 'TideWallet', 'Metamask', 'imToken' ];
  }

  static create(wallet = ''): Connector {
    let connector
    switch(wallet) {
      case Wallets.TideWallet:
        connector = new TideWallet();
      break;

      case Wallets.imToken:
        connector = new ImToken();
      break;

      case Wallets.Metamask:
      default:
        connector = new Metamask();
    }
    return connector;
  }
}

export default ConnectorFactory;