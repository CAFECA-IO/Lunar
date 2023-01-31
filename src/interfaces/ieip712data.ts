const sample: IEIP712Data = {
  domain: {
    // Defining the chain aka Rinkeby testnet or Ethereum Main Net
    chainId: '0x1',
    // Give a user friendly name to the specific contract you are signing for.
    name: 'TideBit-DeFi',
    // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
    verifyingContract: '0xCAFECA5CCD019431B17B132e45e6638Ee2397be8',
    // Just let's you know the latest version. Definitely make sure the field name is correct.
    version: 'v1.0.0',
  },
  // Defining the message signing data content.
  message: {
  /*
  - Anything you want. Just a JSON Blob that encodes the data you want to send
  - No required fields
  - This is DApp Specific
  - Be as explicit as possible when building out the message schema.
  */
    title: 'ServiceTerm',
    content: 'You are going to use TideBit-DeFi and agree every rules in TideBit',
    from: '0xCAFECAAd15f96E1EfcD846e1ae27115645C6D606',
    to: 'TideBit-DeFi'
  },
  // Refers to the keys of the *types* object below.
  primaryType: 'ServiceTerm',
  types: {
    // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'string' },
      { name: 'verifyingContract', type: 'address' },
    ],
    // Not an EIP712Domain definition
    Group: [
      { name: 'name', type: 'string' },
      { name: 'members', type: 'Person[]' },
    ],
    // Refer to PrimaryType
    ServiceTerm: [
      { name: 'title', type: 'string' },
      { name: 'content', type: 'string' },
      { name: 'from', type: 'string' },
      { name: 'to', type: 'string' }
    ],
    // Not an EIP712Domain definition
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallets', type: 'address[]' },
    ]
  }
}

interface IEIP712Data {
  domain: IDomain,
  message: IMessage,
  primaryType: string,
  types: ITypes
};

interface IDomain {
    chainId: string,
    name: string,
    verifyingContract: string,
    version: string
}

interface IMessage {
  title: string,
  content: string,
  from: string,
  to: string,
}

interface ITypes {
  [key: string]: IType[];
}

interface IType {
  name: string,
  type: string
}

export default IEIP712Data;
export const dummyEIP712Data = sample;