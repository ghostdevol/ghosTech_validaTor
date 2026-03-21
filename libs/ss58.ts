import { SS58DecodeResult } from "./types.js"
import { decodeBase58 } from "./base58.js"
import { keccak_256 } from "./sha3.js"

const SS58_PREFIX = new TextEncoder().encode("SS58PRE")

export function DecodeToPub(address: string): Uint8Array {
  const decoded = decodeBase58(address)
  if (decoded.length < 3) throw new Error("SS58: data too short")

  const checksumLen = 2
  const body = decoded.subarray(0, decoded.length - checksumLen)
  const checksum = decoded.subarray(decoded.length - checksumLen)

  const hashInput = new Uint8Array(SS58_PREFIX.length + body.length)
  hashInput.set(SS58_PREFIX, 0)
  hashInput.set(body, SS58_PREFIX.length)
  const hash = keccak_256(hashInput)

  if (checksum[0] !== hash[0] || checksum[1] !== hash[1]) {
    throw new Error("SS58: invalid checksum")
  }

  let prefix: number
  let pubkey: Uint8Array

  if (body[0] <= 63) {
    prefix = body[0]
    pubkey = body.subarray(1)
  } else {
    // simplified: not handling full multi-byte prefix spec here
    throw new Error("SS58: unsupported multi-byte prefix")
  }

  if (pubkey.length !== 32) throw new Error("SS58: invalid pubkey length")

  return pubkey
}

export function decodeSS58(address: string): SS58DecodeResult {
  const decoded = decodeBase58(address)
  const checksumLen = 2
  const body = decoded.subarray(0, decoded.length - checksumLen)

  let prefix: number
  let pubkey: Uint8Array

  if (body[0] <= 63) {
    prefix = body[0]
    pubkey = body.subarray(1)
  } else {
    throw new Error("SS58: unsupported multi-byte prefix")
  }

  return { prefix, pubkey }
}
