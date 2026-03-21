"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = sign;
exports.getV = getV;
exports.verify = verify;
exports.verifyWithNoRecovery = verifyWithNoRecovery;
exports.recover = recover;
exports.loadPublicKey = loadPublicKey;
exports.privateKeyVerify = privateKeyVerify;
exports.publicKeyVerify = publicKeyVerify;
exports.publicKeyCreate = publicKeyCreate;
exports.publicKeyConvert = publicKeyConvert;
exports.loadCompressedPublicKey = loadCompressedPublicKey;
exports.loadUncompressedPublicKey = loadUncompressedPublicKey;
function sign(_message, _seckey, _canonical = true) {
    throw new Error("p256.sign is not implemented in this build");
}
function getV(_message, _r, _s, _pubkey, _canonical = true) {
    throw new Error("p256.getV is not implemented in this build");
}
function verify(_message, _signature, _recovery, _publicKey) {
    return false;
}
function verifyWithNoRecovery(_message, _signature, _publicKey) {
    return false;
}
function recover(_sig, _recid, _msg32, _compress) {
    return null;
}
function loadPublicKey(_pubKey) {
    return null;
}
function privateKeyVerify(_seckey) {
    return false;
}
function publicKeyVerify(_pubkey) {
    return false;
}
function publicKeyCreate(_seckey, _compress) {
    throw new Error("p256.publicKeyCreate is not implemented in this build");
}
function publicKeyConvert(_pubkey, _compress) {
    return null;
}
function loadCompressedPublicKey(_first, _xbuf) {
    return null;
}
function loadUncompressedPublicKey(_first, _xbuf, _ybuf) {
    return null;
}
