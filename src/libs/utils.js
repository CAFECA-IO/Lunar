class Utils {
  static startWith(str1, str2) {
    let result;
    try {
      if(!str1.startsWith(str2)) {
        result = str2.concat(str1);
      }
    }
    catch(e) {
      result = str1;
    }
    return result;
  }

  static chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }
  
    return chunks;
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
        arr[i] = seed.charCodeAt(i).toString(16).padStart(tmpSqr * 2, '0');
      }
      arr = arr.map((v) => v.padStart(sqr * 2, '0'));
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
  static isHex(data) {
    return /^0x[a-fA-F0-9]*$/.test(data);
  }
  static toHex(data) {
    let result;
    if(data == undefined) {
      result = '';
    }
    else if(this.isHex(data)) {
      result = data.substr(2);
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