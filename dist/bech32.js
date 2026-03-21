"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromBech32 = fromBech32;
exports.toBech32 = toBech32;
exports.decodeBech32 = decodeBech32;
const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const CHARSET_REV = {};
for (let i = 0; i < CHARSET.length; i++)
    CHARSET_REV[CHARSET[i]] = i;
function polymod(values) {
    const GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
    let chk = 1;
    for (const v of values) {
        const top = chk >>> 25;
        chk = ((chk & 0x1ffffff) << 5) ^ v;
        for (let i = 0; i < 5; i++) {
            if (((top >>> i) & 1) !== 0)
                chk ^= GENERATORS[i];
        }
    }
    return chk;
}
function hrpExpand(hrp) {
    const ret = [];
    for (let i = 0; i < hrp.length; i++)
        ret.push(hrp.charCodeAt(i) >>> 5);
    ret.push(0);
    for (let i = 0; i < hrp.length; i++)
        ret.push(hrp.charCodeAt(i) & 31);
    return ret;
}
function verifyChecksum(hrp, data) {
    return polymod(hrpExpand(hrp).concat(data)) === 1;
}
function createChecksum(hrp, data) {
    const values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
    const mod = polymod(values) ^ 1;
    const ret = [];
    for (let p = 0; p < 6; p++) {
        ret.push((mod >>> (5 * (5 - p))) & 31);
    }
    return ret;
}
function convertBits(data, from, to, pad) {
    let acc = 0;
    let bits = 0;
    const ret = [];
    const maxv = (1 << to) - 1;
    for (const value of data) {
        if (value < 0 || value >> from !== 0)
            throw new Error("Invalid value for convertBits");
        acc = (acc << from) | value;
        bits += from;
        while (bits >= to) {
            bits -= to;
            ret.push((acc >> bits) & maxv);
        }
    }
    if (pad) {
        if (bits > 0)
            ret.push((acc << (to - bits)) & maxv);
    }
    else if (bits >= from || ((acc << (to - bits)) & maxv) !== 0) {
        throw new Error("Invalid padding in convertBits");
    }
    return ret;
}
function fromBech32(str) {
    const lower = str.toLowerCase();
    if (str !== lower && str !== str.toUpperCase()) {
        throw new Error("Mixed case Bech32 string");
    }
    const pos = str.lastIndexOf("1");
    if (pos < 1 || pos + 7 > str.length || str.length > 90) {
        throw new Error("Invalid Bech32 string length or separator position");
    }
    const hrp = lower.slice(0, pos);
    const dataPart = lower.slice(pos + 1);
    const data = [];
    for (let i = 0; i < dataPart.length; i++) {
        const c = dataPart[i];
        const v = CHARSET_REV[c];
        if (v === undefined)
            throw new Error("Invalid Bech32 character");
        data.push(v);
    }
    if (!verifyChecksum(hrp, data))
        throw new Error("Invalid Bech32 checksum");
    const values = data.slice(0, -6);
    const decoded = convertBits(values, 5, 8, false);
    return [hrp, new Uint8Array(decoded)];
}
function toBech32(hrp, data) {
    const fiveBit = convertBits(Array.from(data), 8, 5, true);
    const checksum = createChecksum(hrp, fiveBit);
    const combined = fiveBit.concat(checksum);
    let out = hrp + "1";
    for (const v of combined)
        out += CHARSET[v];
    return out;
}
function decodeBech32(str) {
    const [hrp, data] = fromBech32(str);
    return { hrp, data };
}
