"use strict";
/* Libraries */
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeS19 = void 0;
/* CRC */
var crc_1 = require("../crc/");
/* Types */
var types_1 = require("../types/");
/**
 *
 * @param dataBuffer - the input data buffer
 * @param recordDataLength - how long is the data
 * @param includeS5Record - set to 'true' if you want an S5 summary record (sum of S1+2+3 records)
 * @param headerData - string value to be included with the S0 record as the data (used by select vendors)
 * @param logLevel - LogLevel value (0=NONE)
 */
var writeS19 = function (dataBuffer, recordDataLength, includeS5Record, headerData, logLevel) {
    if (headerData === void 0) { headerData = ""; }
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    if (recordDataLength < 1 || recordDataLength > 255) {
        throw new Error("Illegal record data length parameter. Must be between 1-255");
    }
    var DATA_LENGTH = recordDataLength;
    var s19 = "";
    var i = 0;
    var data = Buffer.alloc(DATA_LENGTH);
    var nS0 = 0;
    var nS1 = 0;
    var nS2 = 0;
    var nS3 = 0;
    var nS5 = 0;
    var nS9 = 0;
    logLevel > types_1.LogLevel.NONE && console.log("Started...");
    logLevel > types_1.LogLevel.NONE && console.log("Buffer Length", dataBuffer.length);
    data.fill(0);
    dataBuffer.copy(data, 0, i, i + 6);
    s19 += produceS0Record(0, Buffer.from(headerData), headerData.length);
    s19 += "\r\n";
    nS0++;
    while (i < dataBuffer.length - DATA_LENGTH) {
        data.fill(0);
        dataBuffer.copy(data, 0, i, i + DATA_LENGTH);
        if (i < types_1.AddressSpaceBoundaries._16_BIT) {
            logLevel > types_1.LogLevel.NONE && console.log("[" + i + "] :: Producing S1 record");
            s19 += produceS1Record(i, data, DATA_LENGTH, logLevel);
            s19 += "\r\n";
            nS1++;
        }
        else if (i < types_1.AddressSpaceBoundaries._24_BIT) {
            logLevel > types_1.LogLevel.NONE && console.log("[" + i + "] :: Producing S2 record");
            s19 += produceS2Record(i, data, DATA_LENGTH, logLevel);
            s19 += "\r\n";
            nS2++;
        }
        else if (i < types_1.AddressSpaceBoundaries._32_BIT) {
            logLevel > types_1.LogLevel.NONE && console.log("[" + i + "] :: Producing S3 record");
            s19 += produceS3Record(i, data, DATA_LENGTH, logLevel);
            s19 += "\r\n";
            nS3++;
        }
        else {
            throw new Error("Cannot write S19 payload. Illegal address space");
        }
        i += DATA_LENGTH;
    }
    data.fill(0);
    if (includeS5Record) {
        logLevel > types_1.LogLevel.NONE &&
            console.log("[" + i + "] :: Producing S5 record - total S1+2+3 = " + (nS1 + nS2 + nS3));
        s19 += produceS5Record(nS1 + nS2 + nS3, data, 0, logLevel);
        s19 += "\r\n";
        nS5++;
    }
    s19 += produceS9Record(0, data, 0, logLevel);
    nS9++;
    logLevel > types_1.LogLevel.NONE && console.log("Write S19 Summary: ");
    logLevel > types_1.LogLevel.NONE && console.log("S0 Records: " + nS0);
    logLevel > types_1.LogLevel.NONE && console.log("S1 Records: " + nS1);
    logLevel > types_1.LogLevel.NONE && console.log("S2 Records: " + nS2);
    logLevel > types_1.LogLevel.NONE && console.log("S3 Records: " + nS3);
    logLevel > types_1.LogLevel.NONE && console.log("S5 Records: " + nS5);
    logLevel > types_1.LogLevel.NONE && console.log("S9 Records: " + nS9);
    return {
        success: true,
        responseCode: types_1.ResponseCodes.SUCCESS,
        errors: [],
        message: "Data buffer converted into S19 payload",
        payload: s19,
    };
};
exports.writeS19 = writeS19;
var produceS0Record = function (address, data, dataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var srecord = "";
    var record = Buffer.alloc(types_1.FullSRecordSizes.S0_RECORD_SIZE);
    var ptr = 0;
    /* S-Record Marker */
    srecord += "S";
    /* Record Type */
    srecord += "0";
    /* Data Length */
    record.writeUInt8(dataLength + 2 + 1, ptr); // Data length + 2 address bytes + 1 checksum byte = L+3
    ptr++;
    /* Address */
    record.writeUInt16BE(address, ptr);
    ptr += 2;
    /* Data */
    data.copy(record, ptr, 0, dataLength);
    ptr += dataLength;
    /* Checksum */
    record[ptr] = crc_1.calculateChecksum(record.slice(0, ptr));
    /* Final Assembly */
    srecord += record
        .slice(0, ptr + 1)
        .toString("hex")
        .toUpperCase();
    logLevel > types_1.LogLevel.NONE && console.log(srecord);
    return srecord;
};
var produceS1Record = function (address, data, dataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var srecord = "";
    var record = Buffer.alloc(types_1.FullSRecordSizes.S1_RECORD_SIZE);
    var ptr = 0;
    /* S-Record Marker */
    srecord += "S";
    /* Record Type */
    srecord += "1";
    /* Data Length */
    record.writeUInt8(dataLength + 2 + 1, ptr); // Data length + 2 address bytes + 1 checksum byte = L+3
    ptr++;
    /* Address */
    record.writeUInt16BE(address, ptr);
    ptr += 2;
    /* Data */
    data.copy(record, ptr, 0, dataLength);
    ptr += dataLength;
    /* Checksum */
    record[ptr] = crc_1.calculateChecksum(record.slice(0, ptr));
    /* Final Assembly */
    srecord += record
        .slice(0, ptr + 1)
        .toString("hex")
        .toUpperCase();
    logLevel > types_1.LogLevel.NONE && console.log(srecord);
    return srecord;
};
var produceS2Record = function (address, data, dataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var srecord = "";
    var record = Buffer.alloc(types_1.FullSRecordSizes.S2_RECORD_SIZE);
    var ptr = 0;
    /* S-Record Marker */
    srecord += "S";
    /* Record Type */
    srecord += "2";
    /* Data Length */
    record.writeUInt8(dataLength + 3 + 1, ptr); // Data length + 3 address bytes + 1 checksum byte = L+3
    ptr++;
    /* Address */
    record.writeIntBE(address, ptr, 3);
    ptr += 3;
    /* Data */
    data.copy(record, ptr, 0, dataLength);
    ptr += dataLength;
    /* Checksum */
    record[ptr] = crc_1.calculateChecksum(record.slice(0, ptr));
    /* Final Assembly */
    srecord += record
        .slice(0, ptr + 1)
        .toString("hex")
        .toUpperCase();
    logLevel > types_1.LogLevel.NONE && console.log(srecord);
    return srecord;
};
var produceS3Record = function (address, data, dataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var srecord = "";
    var record = Buffer.alloc(types_1.FullSRecordSizes.S3_RECORD_SIZE);
    var ptr = 0;
    /* S-Record Marker */
    srecord += "S";
    /* Record Type */
    srecord += "3";
    /* Data Length */
    record.writeUInt8(dataLength + 4 + 1, ptr); // Data length + 2 address bytes + 1 checksum byte = L+3
    ptr++;
    /* Address */
    record.writeUInt32BE(address, ptr);
    ptr += 4;
    /* Data */
    data.copy(record, ptr, 0, dataLength);
    ptr += dataLength;
    /* Checksum */
    record[ptr] = crc_1.calculateChecksum(record.slice(0, ptr));
    /* Final Assembly */
    srecord += record
        .slice(0, ptr + 1)
        .toString("hex")
        .toUpperCase();
    logLevel > types_1.LogLevel.NONE && console.log(srecord);
    return srecord;
};
var produceS7Record = function (address, data, dataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var srecord = "";
    var record = Buffer.alloc(types_1.FullSRecordSizes.S7_RECORD_SIZE);
    var ptr = 0;
    /* S-Record Marker */
    srecord += "S";
    /* Record Type */
    srecord += "7";
    /* Data Length */
    record.writeUInt8(dataLength + 2 + 1, ptr); // Data length + 2 address bytes + 1 checksum byte = L+3
    ptr++;
    /* Address */
    record.writeUInt16BE(address, ptr);
    ptr += 2;
    /* Data */
    data.copy(record, ptr, 0, dataLength);
    ptr += dataLength;
    /* Checksum */
    record[ptr] = crc_1.calculateChecksum(record.slice(0, ptr));
    /* Final Assembly */
    srecord += record
        .slice(0, ptr + 1)
        .toString("hex")
        .toUpperCase();
    logLevel > types_1.LogLevel.NONE && console.log(srecord);
    return srecord;
};
var produceS5Record = function (address, data, dataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var srecord = "";
    var record = Buffer.alloc(types_1.FullSRecordSizes.S5_RECORD_SIZE);
    var ptr = 0;
    /* S-Record Marker */
    srecord += "S";
    /* Record Type */
    srecord += "5";
    /* Data Length */
    record.writeUInt8(dataLength + 2 + 1, ptr); // Data length + 2 address bytes + 1 checksum byte = L+3
    ptr++;
    /* Address - FOR S5 RECORDS THIS IS THE TOTAL OF S1+2+3 RECORDS */
    record.writeUInt16BE(address, ptr);
    ptr += 2;
    /* Data */
    data.copy(record, ptr, 0, dataLength);
    ptr += dataLength;
    /* Checksum */
    record[ptr] = crc_1.calculateChecksum(record.slice(0, ptr));
    /* Final Assembly */
    srecord += record
        .slice(0, ptr + 1)
        .toString("hex")
        .toUpperCase();
    logLevel > types_1.LogLevel.NONE && console.log(srecord);
    return srecord;
};
var produceS9Record = function (address, data, dataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var srecord = "";
    var record = Buffer.alloc(types_1.FullSRecordSizes.S9_RECORD_SIZE);
    var ptr = 0;
    /* S-Record Marker */
    srecord += "S";
    /* Record Type */
    srecord += "9";
    /* Data Length */
    record.writeUInt8(dataLength + 2 + 1, ptr); // Data length + 2 address bytes + 1 checksum byte = L+3
    ptr++;
    /* Address */
    record.writeUInt16BE(address, ptr);
    ptr += 2;
    /* Data */
    data.copy(record, ptr, 0, dataLength);
    ptr += dataLength;
    /* Checksum */
    record[ptr] = crc_1.calculateChecksum(record.slice(0, ptr));
    /* Final Assembly */
    srecord += record
        .slice(0, ptr + 1)
        .toString("hex")
        .toUpperCase();
    logLevel > types_1.LogLevel.NONE && console.log(srecord);
    return srecord;
};
