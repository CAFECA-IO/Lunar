/**
 * Convert a Number to Hexadecimal
 * Given an integer, write an algorithm to 
 * convert it to hexadecimal. For negative 
 * integer, two’s complement method is used. 
 *
 * Time Complexity: O(log(n))
 * Space Complexity: O(log(n))
 *
 * toHex(26) // "1a"
 * toHex(4)  // "4"
 * toHex(-1) // "ffffffff"
 */

export const startWith = (str1: string, str2: string) => {
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

export const chunkSubstr = (str: string, size: number) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

export const stringToHex = (data: string) => {
  let seed;
  let arr = [];
  let sqr = 1;
  let result;

  seed = data;
  for(let i = 0; i < seed.length; i++) {
    let code = seed.charCodeAt(i) + 1;
    let tmpSqr = Math.ceil(Math.log(code) / Math.log(256));
    sqr = tmpSqr > sqr ? tmpSqr : sqr;
    arr[i] = seed.charCodeAt(i).toString(16).padStart(tmpSqr * 2, '0');
  }
  arr = arr.map((v) => v.padStart(sqr * 2, '0'));
  result = arr.join('');

  return result;
}

export const isHex = (data: string) => {
  return /^0x[a-fA-F0-9]*$/.test(data);
}

export const toHex = (data: any) => {
  let result;
  if(data == undefined) {
    result = '';
  }
  else if(isHex(data)) {
    result = data.substr(2);
  }
  else if(Number.isInteger(data)) {
    const map = "0123456789abcdef";
    let hex = data === 0 ? "0" : "";
    while (data !== 0) {
        hex = map[data & 15] + hex;
        data = data >>> 4;
    }
    result = hex;
  }
  else if(typeof data == 'string') {
    result = stringToHex(data);
  } else {
    result = '';
  }

  return result;
}