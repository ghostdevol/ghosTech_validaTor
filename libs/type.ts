/**
 * Shared TypeScript interfaces for the crypto validation toolkit.
 * These types are used across Base58, Bech32, CashAddr, SS58, and the validator.
 */

export interface DecodeResult {
  /** The blockchain or encoding family (BTC, ETH, SOL, etc.) */
  chain: string

  /** Whether the decode/validation succeeded */
  valid: boolean

  /** Optional error message if validation failed */
  error?: string

  /** Additional decoded fields (hash, version, hrp, etc.) */
  [key: string]: any
}

/**
 * Result returned by Base58Check decoding.
 */
export interface Base58CheckResult {
  version: number
  payload: Uint8Array
}

/**
 * Result returned by Bech32 decoding.
 */
export interface Bech32DecodeResult {
  hrp: string
  data: Uint8Array
}

/**
 * Result returned by CashAddr decoding.
 */
export interface CashAddrDecodeResult {
  prefix: string
  type: string
  hash: Uint8Array
}

/**
 * Result returned by SS58 decoding.
 */
export interface SS58DecodeResult {
  prefix: number
  pubkey: Uint8Array
}

/**
 * Hashing interface for keccak-256.
 */
export interface Keccak256 {
  (input: Uint8Array | string): Uint8Array
}

/**
 * Utility type for functions that validate or decode addresses.
 */
export type InspectorFn = (address: string) => SS58DecodeResult