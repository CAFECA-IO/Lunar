import Connectors from './connectors/index.js';

class ConnectorFactory {
  static get types() {
    return Connectors.types;
  }

  static create()
}

export default Connectors;