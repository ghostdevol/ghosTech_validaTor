// ghosTech_backup/libs/_shortw_utils.ts
import { sha256 } from "./hash";

export function getHash(data: Uint8Array | Buffer | number[]): Uint8Array {
    return sha256(data);
}
