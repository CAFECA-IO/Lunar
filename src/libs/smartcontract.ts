import { chunkSubstr, toHex } from '../libs/common';
import { keccak256 } from '@cafeca/keccak';
import BigNumber from 'bignumber.js';

class SmartContract {
  static leftPad32(str: any) {
    let result = '';
    const length = 32 * 2;
    if(typeof str === 'string') {
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

  static parseString(data: string): string {
    let seed = data;
    if(seed.indexOf('0x') === 0) {
      seed = seed.substr(2);
    }

    if(seed.length > 64) {
      const chunks = chunkSubstr(seed, 64).slice(2);
      return chunks.map((v) => this.parseString(v)).join('');
    }

    let result = '';
    try {
      result = decodeURIComponent('%' + seed.match(/.{1,2}/g)?.filter((v) => v !== '00').join('%'));
    }
    catch(e) {
      // Ignore error
    }
    return result;
  }

  static parseHexRLP(data: string) {
    let seed = data;
    let chunks;
    let result;
    if(seed.indexOf('0x') === 0) {
      seed = seed.substr(2);
    }
  
    if(seed.length > 64) {
      chunks = chunkSubstr(seed, 64);
    } else {
      chunks = [seed];
    }

    result = chunks;
    return result;
  }

  static toSmallestUnitHex({ amount, decimals } : { amount: number, decimals: number }) {
    const result = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toString(16);
    return result;
  }

  static toSmallestUnit({ amount, decimals } : { amount: number, decimals: number }) {
    const result = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toFixed();
    return result;
  }

  static toContractData({ func, params } : { func: string, params?: string[] }) {
    if(!func) {
      return '0x'
    }
    const funcSeed = func;
    const dataSeed = params?.map((v) => {
      return this.leftPad32(toHex(v))
    }) || [];
    const result = '0x'
      .concat(keccak256(funcSeed).substr(0, 8))
      .concat(dataSeed.join(''));
    return result;
  }

  static isEthereumAddress(addr: any) {
    if(typeof addr !== 'string') { return false; }
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  }
}

export default SmartContract;