# Lunar
Blockchain Connect Module

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
  "wallets": ["imtoken"]
}
```

```
// if lunar connect with wallet -> return boolean
const connected = lunar.connected

// connect with injected javascript
lunar.connect({ wallet });

// connect with wallet connect
const qrcode = await lunar.walletConnect();

// get blockchains
const blockchains = lunar.blockchains;

// get wallets
const wallets = lunar.wallets;

// get wallet
const wallet = await lunar.getWallet({ type: 'ethereum' });

// get address
const address = wallet.address;

// get data with raw
const data = await wallet.getData({ contract, data });

// get data with ABI
const data = await wallet.getData({ contract, function, params });

// get balance
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
