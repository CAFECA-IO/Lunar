import Wallets from '../constants/wallets.js';
import Metamask from './metamask.js'

class ImToken extends Metamask {
  _type = Wallets.imToken;

  async send({ from = this.address, to, amount, data }) {
    const decimals = await this.getDecimals();
    const value = SmartContract.toSmallestUnit({ amount, decimals });
    const transactionParameters = {
      from,
      to,
      value,
      data,
      chainId: this.chainId
    }
    const requestData = {
      method: 'eth_sendTransaction',
      params: [ transactionParameters ],
    };
    const txHash = await ethereum.request(requestData);
    return txHash;
  }
}

export default ImToken;