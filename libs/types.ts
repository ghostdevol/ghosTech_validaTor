export interface DecodeResult {
  chain: string
  valid: boolean
  error?: string
  [key: string]: any
}

export interface Base58CheckResult {
  version: number
  payload: Uint8Array
}

export interface Bech32DecodeResult {
  hrp: string
  data: Uint8Array
}

export interface CashAddrDecodeResult {
  prefix: string
  type: string
  hash: Uint8Array
}

export interface SS58DecodeResult {
  prefix: number
  pubkey: Uint8Array
}

export interface Keccak256 {
  (input: Uint8Array | string): Uint8Array
}

export type InspectorFn = (address: string) => SS58DecodeResult