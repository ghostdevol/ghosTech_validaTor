"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHex = toHex;
exports.fromHex = fromHex;
exports.stripHexPrefix = stripHexPrefix;
exports.isHexPrefixed = isHexPrefixed;
function toHex(data, addPrefix = false) {
    const buffer = Buffer.from(data);
    return addPrefix ? "0x" + buffer.toString("hex") : buffer.toString("hex");
}
function fromHex(data) {
    if (data.startsWith("0x")) {
        data = data.substring(2);
    }
    return Buffer.from(data, "hex");
}
function stripHexPrefix(hex) {
    if (hex.startsWith("0x")) {
        return hex.substring(2);
    }
    return hex;
}
function isHexPrefixed(hex) {
    return hex.startsWith("0x");
}
