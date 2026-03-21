"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ed25519 = void 0;
exports.sign = sign;
exports.verify = verify;
exports.publicKeyCreate = publicKeyCreate;
// ghosTech_backup/libs/ed25519.ts
const elliptic = __importStar(require("elliptic"));
exports.ed25519 = new elliptic.eddsa("ed25519");
function sign(message, secretKey) {
    const msg = Buffer.from(message);
    const key = Buffer.from(secretKey);
    return exports.ed25519.sign(msg, key).toBytes();
}
function verify(message, signature, publicKey) {
    const msg = Buffer.from(message);
    const sig = Buffer.from(signature);
    const pub = Buffer.from(publicKey);
    return exports.ed25519.verify(msg, sig, pub);
}
function publicKeyCreate(secretKey) {
    return Buffer.from(exports.ed25519.keyFromSecret(Buffer.from(secretKey)).pubBytes());
}
