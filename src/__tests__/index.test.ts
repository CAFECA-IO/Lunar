import Lunar from '../index';

describe("Check Blockchains", () => {
  test("BOLT - chain id is 0x1f51", () => {
    const { chainName } = Lunar.findBlockchain("0x1f51");
    expect(chainName).toBe("BOLT");
  });
})