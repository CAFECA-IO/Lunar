import Wallets from '../constants/wallets';

const g: any = typeof globalThis === "object"
    ? globalThis
    : typeof window === "object"
        ? window
        : typeof global === "object"
            ? global
            : null; // Causes an error on the next line
const { ethereum } = g;

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
      if(ethereum?.isMetaMask) {
        result.push(Wallets.Metamask);
      }
    }
    catch(e) {
      // Ignore error
    }

    // imToken
    try {
      if(ethereum?.isImToken) {
        result.push(Wallets.imToken);
      }
    }
    catch(e) {
      // Ignore error
    }

    // TideWallet
    try {
      if(ethereum?.isTideWallet) {
        result.push(Wallets.TideWallet);
      }
    }
    catch(e) {
      // Ignore error
    }

    // Trust
    try {
      if(ethereum?.isTrust) {
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