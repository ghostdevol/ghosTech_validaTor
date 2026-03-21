// ghosTech_backup/libs/ed25519.ts
import * as elliptic from "elliptic";
import { concatBytes } from "./base"; // ensure base.ts exists
import BN from "bn.js";

export const ed25519 = new elliptic.eddsa("ed25519");

export function sign(message: Uint8Array | Buffer, secretKey: Uint8Array | Buffer): Uint8Array {
    const msg = Buffer.from(message);
    const key = Buffer.from(secretKey);
    return ed25519.sign(msg, key).toBytes();
}

export function verify(message: Uint8Array | Buffer, signature: Uint8Array | Buffer, publicKey: Uint8Array | Buffer): boolean {
    const msg = Buffer.from(message);
    const sig = Buffer.from(signature);
    const pub = Buffer.from(publicKey);
    return ed25519.verify(msg, sig, pub);
}

export function publicKeyCreate(secretKey: Uint8Array | Buffer): Uint8Array {
    return Buffer.from((ed25519.keyFromSecret(Buffer.from(secretKey)) as any).pubBytes());
}
