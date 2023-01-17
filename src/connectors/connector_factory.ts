import Wallets from '../constants/wallets';
import TideWallet from './tidewallet';
import ImToken from './imtoken';
import Metamask from './metamask';
import Connector from './connector';

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