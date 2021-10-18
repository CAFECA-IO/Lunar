class Utils {
  static leftPad(data, length) {
    const l = length > 1 ?
      length * 2 :
      2;
    let seed;
    
    if(typeof data == 'string') {
      seed = data;
    }
    else {
      try {
        seed = data.toString();
      }
      catch(e) {
        seed = '';
      }
    }

    const result = new Array(l)
      .fill(0).join('')
      .concat(seed)
      .substr(l * -1);
    return result;
  }

  static stringToHex(data) {
    let seed;
    let arr = [];
    let sqr = 1;
    let result;
    if(typeof data == 'string') {
      seed = data;
      for(let i = 0; i < seed.length; i++) {
        let code = seed.charCodeAt(i) + 1;
        let tmpSqr = Math.ceil(Math.log(code) / Math.log(256));
        sqr = tmpSqr > sqr ? tmpSqr : sqr;
        arr[i] = this.leftPad(seed.charCodeAt(i).toString(16), tmpSqr);
      }
      arr = arr.map((v) => this.leftPad(v, sqr));
      result = arr.join('');
    } else {
      try {
        result = data.toString(16);
      } catch(e) {
        result = '';
      }
    }

    return result;
  }
  static toHex(data) {
    let result;
    if(data == undefined) {
      result = '';
    }
    else if(Number.isInteger(data)) {
      result = data.toString(16);
    }
    else if(typeof data == 'string') {
      result = this.stringToHex(data);
    } else {
      try {
        result = data.toString(16);
      }
      catch(e) {
        result = '';
      }
    }
    return result;
  }
}

export default Utils;