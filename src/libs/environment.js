import Wallets from '../constants/wallets';

class Environment {
  static getPlatform() {
    let result = 'unknown environment';
    try {
      result = navigator.userAgent;
    }
    catch(e) {}
    return result;
  }
  static getWallets() {
    const result = [];
    // metamask
    try {
      if(window.ethereum.isMetaMask) {
        result.push(Wallets.Metamask);
      }
    }
    catch(e) {}

    // imToken
    try {
      if(window.ethereum.isImToken) {
        result.push(Wallets.imToken);
      }
    }
    catch(e) {}

    // TideWallet
    try {
      if(window.ethereum.isTideWallet) {
        result.push(Wallets.TideWallet);
      }
    }
    catch(e) {}

    // Trust
    try {

    }
    catch(e) {}

    return result;
  }
}

export default Environment;