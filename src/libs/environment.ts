import Wallets from '../constants/wallets';

declare let window: any;

class Environment {
  static getPlatform() {
    let result = 'unknown environment';
    try {
      result = navigator.userAgent;
    }
    catch(e) {
      // Ignore error
    }
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
    catch(e) {
      // Ignore error
    }

    // imToken
    try {
      if(window.ethereum.isImToken) {
        result.push(Wallets.imToken);
      }
    }
    catch(e) {
      // Ignore error
    }

    // TideWallet
    try {
      if(window.ethereum.isTideWallet) {
        result.push(Wallets.TideWallet);
      }
    }
    catch(e) {
      // Ignore error
    }

    // Trust
    try {
      if(window.ethereum.isTrust) {
        result.push(Wallets.Trust);
      }
    }
    catch(e) {
      // Ignore error
    }

    return result;
  }
}

export default Environment;