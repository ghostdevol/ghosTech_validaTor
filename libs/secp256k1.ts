import BN from "bn.js";

export type SignatureWithRecovery = {
  signature: Uint8Array;
  recovery: number;
};

export function sign(
  _message: Buffer | Uint8Array,
  _seckey: Buffer | Uint8Array,
  _canonical: boolean = true
): SignatureWithRecovery {
  throw new Error("secp256k1.sign is not implemented in this build");
}

export function getV(
  _message: Buffer | Uint8Array,
  _r: string,
  _s: string,
  _pubkey: Buffer | Uint8Array,
  _canonical: boolean = true
): number {
  throw new Error("secp256k1.getV is not implemented in this build");
}

export function verify(
  _message: Buffer | Uint8Array,
  _signature: Buffer | Uint8Array,
  _recovery: number,
  _publicKey: Buffer | Uint8Array
): boolean {
  return false;
}

export function verifyWithNoRecovery(
  _message: Buffer | Uint8Array,
  _signature: Buffer | Uint8Array,
  _publicKey: Buffer | Uint8Array
): boolean {
  return false;
}

export function recover(
  _sig: Buffer | Uint8Array,
  _recid: number,
  _msg32: Buffer | Uint8Array,
  _compress: boolean
): Buffer | null {
  return null;
}

export function loadPublicKey(
  _pubKey: Buffer | Uint8Array
): { x: BN; y: BN } | null {
  return null;
}

export function privateKeyVerify(
  _seckey: Buffer | Uint8Array
): boolean {
  return false;
}

export function publicKeyVerify(
  _pubkey: Buffer | Uint8Array
): boolean {
  return false;
}

export function publicKeyCreate(
  _seckey: Buffer | Uint8Array,
  _compress: boolean
): Buffer {
  throw new Error("secp256k1.publicKeyCreate is not implemented in this build");
}

export function publicKeyConvert(
  _pubkey: Buffer | Uint8Array,
  _compress: boolean
): Buffer | null {
  return null;
}

export function loadCompressedPublicKey(
  _first: number,
  _xbuf: Buffer | Uint8Array
): { x: BN; y: BN } | null {
  return null;
}

export function loadUncompressedPublicKey(
  _first: number,
  _xbuf: Buffer | Uint8Array,
  _ybuf: Buffer | Uint8Array
): { x: BN; y: BN } | null {
  return null;
}
