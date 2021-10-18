class Connector {
  _isConnected = false;
  _address;
  _blockchain;

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
  get wallet() {}

  async init() {}
  on(event, callback) {}
  connect() {}
  disconnect() {}
  send({ to, amount, data }) {}
  getData({ contract, data, func, params }) {}
}

export default Connector;