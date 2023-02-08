import Wallets from '../constants/wallets';
import TideWallet from './tidewallet';
import ImToken from './imtoken';
import Metamask from './metamask';
import Connector from './connector';
import WalletConnect from './walletconnect';

const g: any = typeof globalThis === "object"
    ? globalThis
    : typeof window === "object"
        ? window
        : typeof global === "object"
            ? global
            : null; // Causes an error on the next line
const { ethereum } = g;

class ConnectorFactory {
  static get types() {
    return [ 'TideWallet', 'Metamask', 'imToken' ];
  }

  static create(wallet = ''): Connector {
    let connector;
    if(ethereum === undefined) {
      // there is no wallet plugin with browser, use WalletConnect
      connector = new WalletConnect();
    }
    else {
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
    }
    return connector;
  }
}

export default ConnectorFactory;