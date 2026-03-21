"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUint8 = toUint8;
exports.toHex = toHex;
exports.fromHex = fromHex;
exports.concatBytes = concatBytes;
exports.equalBytes = equalBytes;
function toUint8(input) {
    if (input instanceof Uint8Array)
        return input;
    return new TextEncoder().encode(input);
}
function toHex(bytes) {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
function fromHex(hex) {
    const clean = hex.replace(/^0x/, "").toLowerCase();
    if (!/^[0-9a-f]*$/.test(clean) || clean.length % 2 !== 0) {
        throw new Error("Invalid hex string");
    }
    const out = new Uint8Array(clean.length / 2);
    for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
    }
    return out;
}
function concatBytes(...arrays) {
    const total = arrays.reduce((sum, a) => sum + a.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const a of arrays) {
        out.set(a, offset);
        offset += a.length;
    }
    return out;
}
function equalBytes(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
