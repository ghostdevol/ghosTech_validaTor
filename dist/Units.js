"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUnits = formatUnits;
exports.formatFixed = formatFixed;
const bignumber_1 = require("@ethersproject/bignumber");
const names = ['wei', 'kwei', 'mwei', 'gwei', 'szabo', 'finney', 'ether'];
const Zero = bignumber_1.BigNumber.from(0);
const NegativeOne = bignumber_1.BigNumber.from(-1);
function formatUnits(value, unitName) {
    if (typeof (unitName) === "string") {
        const index = names.indexOf(unitName);
        if (index !== -1) {
            unitName = 3 * index;
        }
    }
    return formatFixed(value, (unitName != null) ? unitName : 18);
}
// Constant to pull zeros from for multipliers
let zeros = "0";
while (zeros.length < 256) {
    zeros += zeros;
}
// Returns a string "1" followed by decimal "0"s
function getMultiplier(decimals) {
    if (typeof (decimals) !== "number") {
        try {
            decimals = bignumber_1.BigNumber.from(decimals).toNumber();
        }
        catch (e) { }
    }
    if (typeof (decimals) === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
        return ("1" + zeros.substring(0, decimals));
    }
    throw new Error("invalid decimal size");
}
function formatFixed(value, decimals) {
    if (decimals == null) {
        decimals = 0;
    }
    const multiplier = getMultiplier(decimals);
    // Make sure wei is a big number (convert as necessary)
    value = bignumber_1.BigNumber.from(value);
    const negative = value.lt(Zero);
    if (negative) {
        value = value.mul(NegativeOne);
    }
    let fraction = value.mod(multiplier).toString();
    while (fraction.length < multiplier.length - 1) {
        fraction = "0" + fraction;
    }
    // Strip training 0
    // @ts-ignore
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
    const whole = value.div(multiplier).toString();
    if (multiplier.length === 1) {
        value = whole;
    }
    else {
        value = whole + "." + fraction;
    }
    if (negative) {
        value = "-" + value;
    }
    return value;
}
