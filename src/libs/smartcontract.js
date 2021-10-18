import Utils from '../libs/utils.js';
import Keccak from '../libs/keccak.js'

class SmartContract {
  static leftPad32(str) {
    let result = '';
    let arr;
    let length = 32 * 2;
    if(typeof str == 'string') {
      length = length - str.length;
      arr = new Array(length).fill(0)
      arr.push(str);
    } else {
      arr = new Array(length).fill(0)
    }
    result = arr.join('');
    return result;
  }
  static toContractData({ func, params }) {
    if(!func) {
      return '0x'
    }

    let result = '0x';
    funcSeed = typeof func == 'string' ?
      func :
      func.toString();
    dataSeed = Array.isArray(params) ?
      params.map((v) => this.leftPad32(Utils.toHex(v))) :
      [this.leftPad32(Utils.toHex(params))];
    result = result
      .concat(Keccak.keccak256(funcSeed).substr(0, 8))
      .concat(dataSeed.join(''));
    return result;
  }
}

export default SmartContract;