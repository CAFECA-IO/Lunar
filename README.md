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

// if lunar connect with wallet -> return boolean
const connected = lunar.connected

// get supported wallet
// return Metamask|imToken|TideWallet
const walletList = l.env.wallets;

// connect with injected javascript
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
lunar.connect({ wallet: 'Metamask',  });

// connect with wallet connect
const qrcode = await lunar.walletConnect();

// get blockchains
const blockchain = lunar.blockchain;

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
