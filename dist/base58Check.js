"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase58Check = toBase58Check;
exports.fromBase58Check = fromBase58Check;
const hash_1 = require("./hash");
const createHash = require("create-hash");
const base_1 = require("@scure/base");
function toBase58Check(data) {
    const bytesCoder = (0, base_1.base58check)(hash_1.sha256);
    return bytesCoder.encode(Buffer.from(data));
}
function fromBase58Check(data) {
    const bytesCoder = (0, base_1.base58check)(hash_1.sha256);
    return Buffer.from(bytesCoder.decode(data));
}
