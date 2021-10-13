# Lunar
Blockchain Connect Module

## Build from source
```shell
git clone https://github.com/CAFECA-IO/Lunar
cd Lunar
npm i
npm run build
```

## Install in Web Browser
```html
<script type="text/javascript" src="https://libs.cafeca.io/lunar/latest/lunar.js"></script>
```

## How to Use
```javascript
// initial
const lunar = new Lunar();

// regist notification
lunar.on((event) => {
  // ready, connected, disconnected
  console.log(event);
});

// get environment information return { platform, wallets }
const env = lunar.env
```
```json
{
  "platform": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36",
  "wallets": ["imToken"]
}
```

```
// 取得連線狀態： if lunar connect with wallet -> return boolean 
const connected = lunar.connected

========== 與其他app 連線
/* 
@params(String): appName 
**/
// appName: metamask, imtoken, tidewallet...
// connect with injected javascript
lunar.connect({ appName });

// connect with wallet connect
const qrcode = await lunar.walletConnect();
===========

連線後
=========== 取得 app 上支援的鏈（可以使用的私鑰）
/*
@return(JSON)
**/
// get blockchains
const blockchains = lunar.blockchains;

/*
@return(JSON)
*//
// get wallets
const wallets = lunar.wallets;
===========

// get wallet
const wallet = await lunar.getWallet({ blockchain: 'ethereum' });

// get address
const address = wallet.address;

// get data with raw
const data = await wallet.getData({ contract, data });

// get data with ABI
const data = await wallet.getData({ contract, function, params });

// get balance
const balance = await wallet.getBalance();
const balance = await wallet.getBalance({ type: 'ERC20', contract: '0x048Adee1B0E93b30f9F7b71f18b963cA9bA5dE3b' });

// send transaction
const transaction = {
  to: '0x048Adee1B0E93b30f9F7b71f18b963cA9bA5dE3b',
  amount: '0',
  data: '0xa9059cbb000000000000000000000000a889fa1918762b214f734ee28b7415da416e11d0000000000000000000000000000000000000000000034f74dace8f4241400000'
};
lunar.send(transaction);

// disconnect
lunar.disconnect();
```

## TideBitSWAP for Example
```javascript
const lunar = new Lunar();

// connect with Tidetime Chain
const wallet = 'metamask';
const blockchain = {
  chainId: "0x1f51",
  chainName: "Tidetime",
  nativeCurrency: {
    name: "Tidetime Token",
    symbol: "TTT",
    decimals: 18
  },
  rpcUrls: ["https://rpc.tidebit.network"],
  iconUrls: ["https://iconape.com/wp-content/png_logo_vector/tidebit.png"]
}
lunar.connect({ wallet, blockchain });

// read TideBit SWAP contract
const data = await wallet.getData({ contract, function, params });

// send transaction
const transaction = {
  to: '0x048Adee1B0E93b30f9F7b71f18b963cA9bA5dE3b',
  amount: '0',
  data: '0xa9059cbb000000000000000000000000a889fa1918762b214f734ee28b7415da416e11d0000000000000000000000000000000000000000000034f74dace8f4241400000'
};
const result = await lunar.send(transaction);

// disconnect
lunar.disconnect();
```
