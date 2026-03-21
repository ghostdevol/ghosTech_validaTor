"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = decode;
const bech32_js_1 = require("./bech32.js");
const CASHADDR_PREFIXES = ["bitcoincash", "bchtest", "bchreg"];
function decode(address) {
    let addr = address.toLowerCase();
    if (!addr.includes(":")) {
        // assume bitcoincash if no prefix
        addr = "bitcoincash:" + addr;
    }
    const [prefix, payload] = addr.split(":");
    if (!CASHADDR_PREFIXES.includes(prefix)) {
        throw new Error("Invalid CashAddr prefix");
    }
    const { hrp, data } = (0, bech32_js_1.decodeBech32)(prefix + "1" + payload);
    if (hrp !== prefix)
        throw new Error("CashAddr HRP mismatch");
    if (data.length < 1)
        throw new Error("CashAddr data too short");
    const typeBits = data[0] >> 3;
    let type;
    switch (typeBits) {
        case 0:
            type = "P2PKH";
            break;
        case 1:
            type = "P2SH";
            break;
        default: type = "unknown";
    }
    const hash = data.slice(1);
    return { prefix, type, hash };
}
