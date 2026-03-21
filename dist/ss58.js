"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeToPub = DecodeToPub;
exports.decodeSS58 = decodeSS58;
const base58_js_1 = require("./base58.js");
const sha3_js_1 = require("./sha3.js");
const SS58_PREFIX = new TextEncoder().encode("SS58PRE");
function DecodeToPub(address) {
    const decoded = (0, base58_js_1.decodeBase58)(address);
    if (decoded.length < 3)
        throw new Error("SS58: data too short");
    const checksumLen = 2;
    const body = decoded.subarray(0, decoded.length - checksumLen);
    const checksum = decoded.subarray(decoded.length - checksumLen);
    const hashInput = new Uint8Array(SS58_PREFIX.length + body.length);
    hashInput.set(SS58_PREFIX, 0);
    hashInput.set(body, SS58_PREFIX.length);
    const hash = (0, sha3_js_1.keccak_256)(hashInput);
    if (checksum[0] !== hash[0] || checksum[1] !== hash[1]) {
        throw new Error("SS58: invalid checksum");
    }
    let prefix;
    let pubkey;
    if (body[0] <= 63) {
        prefix = body[0];
        pubkey = body.subarray(1);
    }
    else {
        // simplified: not handling full multi-byte prefix spec here
        throw new Error("SS58: unsupported multi-byte prefix");
    }
    if (pubkey.length !== 32)
        throw new Error("SS58: invalid pubkey length");
    return pubkey;
}
function decodeSS58(address) {
    const decoded = (0, base58_js_1.decodeBase58)(address);
    const checksumLen = 2;
    const body = decoded.subarray(0, decoded.length - checksumLen);
    let prefix;
    let pubkey;
    if (body[0] <= 63) {
        prefix = body[0];
        pubkey = body.subarray(1);
    }
    else {
        throw new Error("SS58: unsupported multi-byte prefix");
    }
    return { prefix, pubkey };
}
