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
      case 'tidewallet':
        connector = new TideWallet();
      break;

      case 'imtoken':
        connector = new ImToken();
      break;

      case 'metamask':
        connector = new Metamask();
      default:  
    }
  }
}

export default Connectors;