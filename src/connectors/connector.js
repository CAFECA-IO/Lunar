class Connector {
  constructor() {}
  get connected() {}
  get wallet() {}
  get blockchains() {}

  async init() {}
  on(event, callback) {}
  connect() {}
  disconnect() {}
  send({ to, amount, data }) {}
  getData({ contract, data, func, params }) {}
}

export default Connector;