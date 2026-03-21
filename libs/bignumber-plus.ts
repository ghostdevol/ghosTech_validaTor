import BN from "bn.js";

export class BigNumber {
  private value: BN;

  constructor(v: BN | number | string | Uint8Array) {
    this.value = BN.isBN(v) ? v : new BN(v);
  }

  static from(v: BN | number | string | Uint8Array): BigNumber {
    return new BigNumber(v);
  }

  add(other: BigNumber | number | string): BigNumber {
    const o = other instanceof BigNumber ? other.value : new BN(other);
    return new BigNumber(this.value.add(o));
  }

  sub(other: BigNumber | number | string): BigNumber {
    const o = other instanceof BigNumber ? other.value : new BN(other);
    return new BigNumber(this.value.sub(o));
  }

  mul(other: BigNumber | number | string): BigNumber {
    const o = other instanceof BigNumber ? other.value : new BN(other);
    return new BigNumber(this.value.mul(o));
  }

  div(other: BigNumber | number | string): BigNumber {
    const o = other instanceof BigNumber ? other.value : new BN(other);
    return new BigNumber(this.value.div(o));
  }

  toString(base: number = 10): string {
    return this.value.toString(base);
  }

  toBN(): BN {
    return this.value.clone();
  }
}

export default BigNumber;
