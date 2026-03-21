"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak_256 = void 0;
const utils_js_1 = require("./utils.js");
// Minimal, readable keccak-256 implementation (not hyper-optimized)
function keccak256Pure(input) {
    // This is a compact keccak-256 implementation adapted for readability.
    // State is 5x5 of 64-bit lanes (we store as 50 32-bit ints: lo/hi pairs).
    const rounds = 24;
    const RC = [
        [0x00000000, 0x00000001], [0x00000000, 0x00008082],
        [0x80000000, 0x0000808a], [0x80000000, 0x80008000],
        [0x00000000, 0x0000808b], [0x00000000, 0x80000001],
        [0x80000000, 0x80008081], [0x80000000, 0x00008009],
        [0x00000000, 0x0000008a], [0x00000000, 0x00000088],
        [0x00000000, 0x80008009], [0x00000000, 0x8000000a],
        [0x00000000, 0x8000808b], [0x80000000, 0x0000008b],
        [0x80000000, 0x00008089], [0x80000000, 0x00008003],
        [0x80000000, 0x00008002], [0x80000000, 0x00000080],
        [0x00000000, 0x0000800a], [0x80000000, 0x8000000a],
        [0x80000000, 0x80008081], [0x80000000, 0x00008080],
        [0x00000000, 0x80000001], [0x80000000, 0x80008008]
    ];
    const R = [
        [0, 1], [36, 44], [3, 10], [41, 45], [18, 2],
        [62, 6], [43, 15], [61, 56], [28, 27], [55, 20],
        [25, 39], [21, 8], [15, 14], [56, 18], [27, 41],
        [20, 2], [39, 61], [8, 28], [14, 55], [61, 25],
        [2, 21], [28, 56], [55, 27], [41, 20]
    ];
    const state = new Uint32Array(50); // 25 lanes * 2 (lo, hi)
    const rate = 136; // bytes for keccak-256
    const blockSize = rate;
    let offset = 0;
    while (offset < input.length) {
        const block = input.subarray(offset, offset + blockSize);
        const padded = new Uint8Array(blockSize);
        padded.set(block);
        if (block.length < blockSize) {
            padded[block.length] = 0x01;
            padded[blockSize - 1] |= 0x80;
        }
        for (let i = 0; i < blockSize / 8; i++) {
            let lo = 0;
            let hi = 0;
            for (let j = 0; j < 4; j++)
                lo |= padded[i * 8 + j] << (8 * j);
            for (let j = 0; j < 4; j++)
                hi |= padded[i * 8 + 4 + j] << (8 * j);
            state[i * 2] ^= lo;
            state[i * 2 + 1] ^= hi;
        }
        // keccak-f[1600]
        for (let round = 0; round < rounds; round++) {
            const C = new Uint32Array(10);
            for (let x = 0; x < 5; x++) {
                const i0 = x * 2;
                const i1 = i0 + 10;
                const i2 = i1 + 10;
                const i3 = i2 + 10;
                const i4 = i3 + 10;
                const lo = state[i0] ^ state[i1] ^ state[i2] ^ state[i3] ^ state[i4];
                const hi = state[i0 + 1] ^ state[i1 + 1] ^ state[i2 + 1] ^ state[i3 + 1] ^ state[i4 + 1];
                C[x * 2] = lo;
                C[x * 2 + 1] = hi;
            }
            const D = new Uint32Array(10);
            for (let x = 0; x < 5; x++) {
                const lo = C[((x + 4) % 5) * 2] ^ ((C[((x + 1) % 5) * 2] << 1) | (C[((x + 1) % 5) * 2 + 1] >>> 31));
                const hi = C[((x + 4) % 5) * 2 + 1] ^ ((C[((x + 1) % 5) * 2 + 1] << 1) | (C[((x + 1) % 5) * 2] >>> 31));
                D[x * 2] = lo;
                D[x * 2 + 1] = hi;
            }
            for (let i = 0; i < 25; i++) {
                state[i * 2] ^= D[(i % 5) * 2];
                state[i * 2 + 1] ^= D[(i % 5) * 2 + 1];
            }
            const B = new Uint32Array(50);
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    const i = x + 5 * y;
                    const j = y + ((2 * x + 3 * y) % 5) * 5;
                    const r = R[i];
                    const lo = state[i * 2];
                    const hi = state[i * 2 + 1];
                    const rLo = r[0];
                    const rHi = r[1];
                    const nLo = (lo << rLo) | (hi >>> (32 - rLo));
                    const nHi = (hi << rLo) | (lo >>> (32 - rLo));
                    const nnLo = (nLo << rHi) | (nHi >>> (32 - rHi));
                    const nnHi = (nHi << rHi) | (nLo >>> (32 - rHi));
                    B[j * 2] = nnLo;
                    B[j * 2 + 1] = nnHi;
                }
            }
            for (let i = 0; i < 25; i++) {
                const lo = B[i * 2];
                const hi = B[i * 2 + 1];
                const lo1 = B[((i + 1) % 25) * 2];
                const hi1 = B[((i + 1) % 25) * 2 + 1];
                const lo2 = B[((i + 2) % 25) * 2];
                const hi2 = B[((i + 2) % 25) * 2 + 1];
                state[i * 2] = lo ^ (~lo1 & lo2);
                state[i * 2 + 1] = hi ^ (~hi1 & hi2);
            }
            state[0] ^= RC[round][0];
            state[1] ^= RC[round][1];
        }
        offset += block.length;
        if (block.length < blockSize)
            break;
    }
    const out = new Uint8Array(32);
    for (let i = 0; i < 4; i++) {
        const lo = state[i * 2];
        const hi = state[i * 2 + 1];
        out[i * 8 + 0] = lo & 0xff;
        out[i * 8 + 1] = (lo >>> 8) & 0xff;
        out[i * 8 + 2] = (lo >>> 16) & 0xff;
        out[i * 8 + 3] = (lo >>> 24) & 0xff;
        out[i * 8 + 4] = hi & 0xff;
        out[i * 8 + 5] = (hi >>> 8) & 0xff;
        out[i * 8 + 6] = (hi >>> 16) & 0xff;
        out[i * 8 + 7] = (hi >>> 24) & 0xff;
    }
    return out;
}
const keccak_256 = (input) => {
    const bytes = (0, utils_js_1.toUint8)(input);
    return keccak256Pure(bytes);
};
exports.keccak_256 = keccak_256;
