import Lunar from '../index';

describe("Check Blockchains", () => {
  test("BOLT - chain id is 8017", () => {
    const { chainName } = Lunar.findBlockchain(8017);
    expect(chainName).toBe("BOLT");
  });
})