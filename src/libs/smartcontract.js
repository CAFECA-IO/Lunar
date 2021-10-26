import Utils from '../libs/utils.js';
import Keccak from '../libs/keccak.js'
import BigNumber from './bignumber.js';

class SmartContract {
  static leftPad32(str) {
    let result = '';
    let arr;
    let length = 32 * 2;
    if(typeof str == 'string') {
      result = str.padStart(length, '0');
    } else {
      try {
        result = str.toString(16).padStart(length, '0');
      }
      catch(e) {
        result = new Array(length).fill(0).join('');
      }
    }
    return result;
  }

  static parseString(data) {
    let seed = data;
    if(seed.indexOf('0x') == '0') {
      seed = seed.substr(2);
    }

    if(seed.length > 64) {
      let chunks = Utils.chunkSubstr(seed, 64).slice(2);
      return chunks.map((v) => this.parseString(v)).join('');
    }

    let result = '';
    try {
      result = decodeURIComponent('%' + seed.match(/.{1,2}/g).filter((v) => v != '00').join('%'));
    }
    catch(e) {}
    return result;
  }

  static parseHexRLP(data) {
    let seed = data;
    let chunks;
    let result;
    if(seed.indexOf('0x') == '0') {
      seed = seed.substr(2);
    }
  
    if(seed.length > 64) {
      chunks = Utils.chunkSubstr(seed, 64);
    } else {
      chunks = [seed];
    }

    result = chunks;
    return result;
  }

  static toSmallestUnitHex({ amount, decimals }) {
    const result = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toString(16);
    return result;
  }

  static toContractData({ func, params }) {
    if(!func) {
      return '0x'
    }
    const funcSeed = typeof func == 'string' ?
      func :
      func.toString();
    const dataSeed = Array.isArray(params) ?
      params.map((v) => {
        return this.leftPad32(Utils.toHex(v))
      }) :
      [this.leftPad32(Utils.toHex(params))];
    const result = '0x'
      .concat(Keccak.keccak256(funcSeed).substr(0, 8))
      .concat(dataSeed.join(''));
    return result;
  }

  static isEthereumAddress(addr) {
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  }
}

export default SmartContract;