import { CashAddrDecodeResult } from "./types.js"
import { decodeBech32 } from "./bech32.js"

const CASHADDR_PREFIXES = ["bitcoincash", "bchtest", "bchreg"]

export function decode(address: string): CashAddrDecodeResult {
  let addr = address.toLowerCase()
  if (!addr.includes(":")) {
    // assume bitcoincash if no prefix
    addr = "bitcoincash:" + addr
  }

  const [prefix, payload] = addr.split(":")
  if (!CASHADDR_PREFIXES.includes(prefix)) {
    throw new Error("Invalid CashAddr prefix")
  }

  const { hrp, data } = decodeBech32(prefix + "1" + payload)
  if (hrp !== prefix) throw new Error("CashAddr HRP mismatch")

  if (data.length < 1) throw new Error("CashAddr data too short")

  const typeBits = data[0] >> 3
  let type: string
  switch (typeBits) {
    case 0: type = "P2PKH"; break
    case 1: type = "P2SH"; break
    default: type = "unknown"
  }

  const hash = data.slice(1)
  return { prefix, type, hash }
}
