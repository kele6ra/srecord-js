"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateChecksum = void 0;
var types_1 = require("../types");
var calculateChecksum = function (buffer, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    logLevel &&
        logLevel > types_1.LogLevel.NONE &&
        console.log("Calculate Checksum START -----------------------------------------");
    logLevel &&
        logLevel > types_1.LogLevel.NONE &&
        console.log("-| Buffer length: " + buffer.length);
    var sum = 0;
    buffer &&
        buffer.length > 0 &&
        buffer.forEach(function (b) {
            logLevel && logLevel > types_1.LogLevel.NONE && console.log("     " + sum + " + " + b);
            sum += b;
        });
    logLevel && logLevel > types_1.LogLevel.NONE && console.log("-| Sum: " + sum);
    logLevel &&
        logLevel > types_1.LogLevel.NONE &&
        console.log("-| Returning: " + ((sum ^ 0xff) & 0xff));
    logLevel &&
        logLevel > types_1.LogLevel.NONE &&
        console.log("Calculate Checksum END   -----------------------------------------");
    return (sum ^ 0xff) & 0xff;
};
exports.calculateChecksum = calculateChecksum;
