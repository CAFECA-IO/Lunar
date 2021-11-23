class Connector {
  _isConnected = false;
  _address;
  _blockchain;
  _assets = [];

  constructor() {}
  get isConnected() {
    return this._isConnected;
  }
  get blockchain() {
    return this._blockchain;
  }
  get address() {
    return this._address;
  }
  get type() {
    return this._type;
  }
  get chainId() {
    return this._chainId;
  }
  get wallet() {}

  async init() {}
  on(event, callback) {}
  connect() {}
  disconnect() {}
  send({ to, amount, data }) {}
  getAsset({ contract }) {}
  getBalance({ contract, address }) {}
  getData({ contract, data, func, params }) {}
  interfaceOf({ contract, abi }) {}
}

export default Connector;