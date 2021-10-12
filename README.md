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
  console.log(event);
});

// get environment information return { platform, wallets }
const env = lunar.env

// if lunar connect with wallet -> return boolean
const connected = lunar.connected


lunar.connect({ wallet });
lunar.disconnect();
lunar.send
```
