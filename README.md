# Lunar
Blockchain Connect Module

## Build from Source
```shell
# build with webpack
sudo npm install -g webpack

# clone and build
git clone https://github.com/CAFECA-IO/Lunar
cd Lunar
npm run build
```

## Install in Web Browser
```html
<script type="text/javascript" src="https://libs.cafeca.io/lunar/latest/lunar.js"></script>
```

## How to Use
```javascript
// check version
const version = Lunar.version;

// list support blockchain(Mainnet)
const blockchains = Lunar.listBlockchain({ testnet: false });

// list support blockchain(Testnet)
const blockchains = Lunar.listBlockchain({ testnet: true });

// initial
const lunar = new Lunar();

// regist notification
lunar.on((event, data) => {
  // ready, connected, disconnected
  console.log(event);
  console.log(data);
});

// get environment information return { platform, wallets }
const env = lunar.env

// if lunar connect with wallet -> return boolean
const isConnected = lunar.isConnected

// get supported wallet
// return Metamask|imToken|TideWallet
const walletList = lunar.env.wallets;

// connect with injected javascript
lunar.connect({ wallet: Lunar.Wallets.Metamask, blockchain: Lunar.Blockchains.EthereumTestnet });

// switch blockchain
lunar.switchBlockchain(Lunar.Blockchains.AvaxTestnet);

// connect with wallet connect
const qrcode = await lunar.walletConnect();

// get blockchains
const blockchain = lunar.blockchain;

// get address
const address = lunar.address;

// get ERC20
const data = await wallet.getAsset({ contract });

// get data with raw
const data = await wallet.getData({ contract, data });

// get data with ABI
const data = await wallet.getData({ contract, function, params });

// get balance
const balance = await wallet.getBalance({ type: 'ERC20', contract: '0x048Adee1B0E93b30f9F7b71f18b963cA9bA5dE3b' });

// send transaction
const transaction = {
  to: '0x048Adee1B0E93b30f9F7b71f18b963cA9bA5dE3b',
  amount: '0.001',
  data: '0xa9059cbb000000000000000000000000a889fa1918762b214f734ee28b7415da416e11d0000000000000000000000000000000000000000000034f74dace8f4241400000'
};
lunar.send(transaction);

// disconnect
lunar.disconnect();
```

## Work With Smart Contract
```javascript
const uniswap = lunar.interfaceOf(Lunar.abi.uniswap, '')
```