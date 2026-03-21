"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigNumber = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
class BigNumber {
    constructor(v) {
        this.value = bn_js_1.default.isBN(v) ? v : new bn_js_1.default(v);
    }
    static from(v) {
        return new BigNumber(v);
    }
    add(other) {
        const o = other instanceof BigNumber ? other.value : new bn_js_1.default(other);
        return new BigNumber(this.value.add(o));
    }
    sub(other) {
        const o = other instanceof BigNumber ? other.value : new bn_js_1.default(other);
        return new BigNumber(this.value.sub(o));
    }
    mul(other) {
        const o = other instanceof BigNumber ? other.value : new bn_js_1.default(other);
        return new BigNumber(this.value.mul(o));
    }
    div(other) {
        const o = other instanceof BigNumber ? other.value : new bn_js_1.default(other);
        return new BigNumber(this.value.div(o));
    }
    toString(base = 10) {
        return this.value.toString(base);
    }
    toBN() {
        return this.value.clone();
    }
}
exports.BigNumber = BigNumber;
exports.default = BigNumber;
