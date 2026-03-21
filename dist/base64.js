"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = toBase64;
exports.fromBase64 = fromBase64;
const base_1 = require("@scure/base");
function toBase64(data) {
    const a = Buffer.from(data);
    return base_1.base64.encode(Uint8Array.from(a));
}
function fromBase64(data) {
    return base_1.base64.decode(data);
}
