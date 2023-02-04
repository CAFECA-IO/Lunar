import Lunar from '../index';

describe("Check Blockchains", () => {
  test("BOLT - chain id is 0x1f51", async () => {
    const { chainName } = Lunar.findBlockchain("0x1f51");
    const lunar = new Lunar();
    const result = await lunar.connect();
    expect(chainName).toBe("BOLT");
    expect(result).toBe(true);
  });
})