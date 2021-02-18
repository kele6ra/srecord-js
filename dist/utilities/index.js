"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decToHex = exports.parseHexString = exports.readSubstring = exports.readSubstringAndCastAsNumber = void 0;
var readSubstringAndCastAsNumber = function (data, start, dataLength, radix) { return parseInt(data.substring(start, start + dataLength), radix); };
exports.readSubstringAndCastAsNumber = readSubstringAndCastAsNumber;
var readSubstring = function (data, start, dataLength) { return data.substring(start, start + dataLength); };
exports.readSubstring = readSubstring;
var parseHexString = function (hex) {
    var result = [];
    while (hex.length >= 2) {
        result.push(parseInt(hex.substring(0, 2), 16));
        hex = hex.substring(2, hex.length);
    }
    var buf = Buffer.alloc(result.length);
    result.forEach(function (b, i) { return buf.writeUInt8(b, i); });
    return buf;
};
exports.parseHexString = parseHexString;
var decToHex = function (dec) {
    var hex = dec.toString(16).toUpperCase();
    return hex.length % 2 ? hex.padStart(hex.length + 1, "0") : hex;
};
exports.decToHex = decToHex;
