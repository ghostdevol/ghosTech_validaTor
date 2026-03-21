"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHash = getHash;
// ghosTech_backup/libs/_shortw_utils.ts
const hash_1 = require("./hash");
function getHash(data) {
    return (0, hash_1.sha256)(data);
}
