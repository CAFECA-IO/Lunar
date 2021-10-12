import ConnectorFactory from './connectorFactory.js';
import Environment from './environment.js'

class Lunar {
  constructor() {
    
  }

  get env() {
    return {
      platform: Environment.getPlatform(),
      wallets: Environment.getWallets()
    }
  }
}

if(window) {
  window.Lunar = Lunar;
}