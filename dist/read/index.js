"use strict";
/* Libraries */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readS19 = void 0;
/* CRC */
var crc_1 = require("../crc/");
/* Utilities */
var utilities_1 = require("../utilities/");
/* Types */
var types_1 = require("../types/");
var readS19 = function (s19Data, s19DataLength, logLevel) {
    if (logLevel === void 0) { logLevel = types_1.LogLevel.NONE; }
    var S19File = s19Data;
    logLevel > types_1.LogLevel.NONE &&
        console.log("reads19 :: S19File hexadecimal length: ", S19File.length);
    logLevel > types_1.LogLevel.NONE &&
        console.log("reads19 :: S19File raw length: ", s19DataLength);
    var i = 0;
    var nS0 = 0;
    var nS1 = 0;
    var nS2 = 0;
    var nS3 = 0;
    var nS5 = 0;
    var nS7 = 0;
    var nS9 = 0;
    var SRecords = [];
    var sRecordType;
    var dataLength = 0;
    var address = null;
    var data;
    var checksum = null;
    var calculatedChecksum = null;
    var fullRecordLength = 0;
    var dataLengthIndex = 0;
    var addressIndex = 0;
    var dataIndex = null;
    var checksumIndex = null;
    var checksumPacketStartIndex = 0;
    var checksumPacketEndIndex = 0;
    while (i < S19File.length) {
        var currentByte = S19File.substring(i, i + 1);
        var nextByte = S19File.substring(i + 1, i + 2);
        var isLineBreak = currentByte.charCodeAt(0) === 0x0d && nextByte.charCodeAt(0) === 0x0a;
        if (!isLineBreak) {
            if (currentByte.charCodeAt(0) === "S".charCodeAt(0)) {
                switch (nextByte.charCodeAt(0)) {
                    case "0".charCodeAt(0): {
                        /* [S][0][Data Length (2 bytes)][address (4 bytes)][data (data length - 6 (4 address, 2 checksum))][checksum (2 bytes)] */
                        sRecordType = types_1.FullSRecordMarker.S0_RECORD_TYPE;
                        /* Data Length */
                        dataLengthIndex =
                            i +
                                types_1.FullS0ByteLengths.START_OF_RECORD_L +
                                types_1.FullS0ByteLengths.RECORD_TYPE_L;
                        dataLength = utilities_1.readSubstringAndCastAsNumber(S19File, dataLengthIndex, types_1.FullS0ByteLengths.DATA_LENGTH_L, 16);
                        checksumPacketStartIndex = dataLengthIndex;
                        /* Address */
                        addressIndex =
                            i +
                                types_1.FullS0ByteLengths.START_OF_RECORD_L +
                                types_1.FullS0ByteLengths.RECORD_TYPE_L +
                                types_1.FullS0ByteLengths.DATA_LENGTH_L;
                        address = utilities_1.readSubstringAndCastAsNumber(S19File, addressIndex, types_1.FullS0ByteLengths.ADDRESS_L, 16);
                        /* Data */
                        dataIndex =
                            i +
                                types_1.FullS0ByteLengths.START_OF_RECORD_L +
                                types_1.FullS0ByteLengths.RECORD_TYPE_L +
                                types_1.FullS0ByteLengths.DATA_LENGTH_L +
                                types_1.FullS0ByteLengths.ADDRESS_L;
                        var dataString = utilities_1.readSubstring(S19File, dataIndex, 2 * dataLength -
                            types_1.FullS0ByteLengths.CHECKSUM_L -
                            types_1.FullS0ByteLengths.ADDRESS_L);
                        data = utilities_1.parseHexString(dataString);
                        /* Checksum */
                        checksumIndex =
                            i +
                                types_1.FullS0ByteLengths.START_OF_RECORD_L +
                                types_1.FullS0ByteLengths.RECORD_TYPE_L +
                                types_1.FullS0ByteLengths.DATA_LENGTH_L +
                                types_1.FullS0ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS0ByteLengths.CHECKSUM_L -
                                    types_1.FullS0ByteLengths.ADDRESS_L);
                        checksum = utilities_1.readSubstringAndCastAsNumber(S19File, checksumIndex, types_1.FullS0ByteLengths.CHECKSUM_L, 16);
                        checksumPacketEndIndex = checksumIndex;
                        /* Full Record Length */
                        fullRecordLength =
                            types_1.FullS0ByteLengths.START_OF_RECORD_L +
                                types_1.FullS0ByteLengths.RECORD_TYPE_L +
                                types_1.FullS0ByteLengths.DATA_LENGTH_L +
                                types_1.FullS0ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS0ByteLengths.CHECKSUM_L -
                                    types_1.FullS0ByteLengths.ADDRESS_L) +
                                types_1.FullS0ByteLengths.CHECKSUM_L;
                        i += fullRecordLength;
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("\nRecord Type: S0 (Full Type)");
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Data Length:", dataLength, dataLength.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("    Address:", address, address.toString(16));
                        logLevel > types_1.LogLevel.NONE && console.log("       Data:", data);
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("   Checksum:", checksum, checksum.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Full Length:", fullRecordLength);
                        nS0++;
                        break;
                    }
                    case "1".charCodeAt(0): {
                        sRecordType = types_1.FullSRecordMarker.S1_RECORD_TYPE;
                        /* Data Length */
                        dataLengthIndex =
                            i +
                                types_1.FullS1ByteLengths.START_OF_RECORD_L +
                                types_1.FullS1ByteLengths.RECORD_TYPE_L;
                        dataLength = utilities_1.readSubstringAndCastAsNumber(S19File, dataLengthIndex, types_1.FullS1ByteLengths.DATA_LENGTH_L, 16);
                        checksumPacketStartIndex = dataLengthIndex;
                        /* Address */
                        addressIndex =
                            i +
                                types_1.FullS1ByteLengths.START_OF_RECORD_L +
                                types_1.FullS1ByteLengths.RECORD_TYPE_L +
                                types_1.FullS1ByteLengths.DATA_LENGTH_L;
                        address = utilities_1.readSubstringAndCastAsNumber(S19File, addressIndex, types_1.FullS1ByteLengths.ADDRESS_L, 16);
                        /* Data */
                        dataIndex =
                            i +
                                types_1.FullS1ByteLengths.START_OF_RECORD_L +
                                types_1.FullS1ByteLengths.RECORD_TYPE_L +
                                types_1.FullS1ByteLengths.DATA_LENGTH_L +
                                types_1.FullS1ByteLengths.ADDRESS_L;
                        var dataString = utilities_1.readSubstring(S19File, dataIndex, 2 * dataLength -
                            types_1.FullS1ByteLengths.CHECKSUM_L -
                            types_1.FullS1ByteLengths.ADDRESS_L);
                        data = utilities_1.parseHexString(dataString);
                        /* Checksum */
                        checksumIndex =
                            i +
                                types_1.FullS1ByteLengths.START_OF_RECORD_L +
                                types_1.FullS1ByteLengths.RECORD_TYPE_L +
                                types_1.FullS1ByteLengths.DATA_LENGTH_L +
                                types_1.FullS1ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS1ByteLengths.CHECKSUM_L -
                                    types_1.FullS1ByteLengths.ADDRESS_L);
                        checksum = utilities_1.readSubstringAndCastAsNumber(S19File, checksumIndex, types_1.FullS1ByteLengths.CHECKSUM_L, 16);
                        checksumPacketEndIndex = checksumIndex;
                        /* Full Record Length */
                        fullRecordLength =
                            types_1.FullS1ByteLengths.START_OF_RECORD_L +
                                types_1.FullS1ByteLengths.RECORD_TYPE_L +
                                types_1.FullS1ByteLengths.DATA_LENGTH_L +
                                types_1.FullS1ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS1ByteLengths.CHECKSUM_L -
                                    types_1.FullS1ByteLengths.ADDRESS_L) +
                                types_1.FullS1ByteLengths.CHECKSUM_L;
                        i += fullRecordLength;
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("\nRecord Type: S1 (Full Type)");
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Data Length:", dataLength, dataLength.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("    Address:", address, address.toString(16));
                        logLevel > types_1.LogLevel.NONE && console.log("       Data:", data);
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("   Checksum:", checksum, checksum.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Full Length:", fullRecordLength);
                        nS1++;
                        break;
                    }
                    case "2".charCodeAt(0): {
                        sRecordType = types_1.FullSRecordMarker.S2_RECORD_TYPE;
                        /* Data Length */
                        dataLengthIndex =
                            i +
                                types_1.FullS2ByteLengths.START_OF_RECORD_L +
                                types_1.FullS2ByteLengths.RECORD_TYPE_L;
                        dataLength = utilities_1.readSubstringAndCastAsNumber(S19File, dataLengthIndex, types_1.FullS2ByteLengths.DATA_LENGTH_L, 16);
                        checksumPacketStartIndex = dataLengthIndex;
                        /* Address */
                        addressIndex =
                            i +
                                types_1.FullS2ByteLengths.START_OF_RECORD_L +
                                types_1.FullS2ByteLengths.RECORD_TYPE_L +
                                types_1.FullS2ByteLengths.DATA_LENGTH_L;
                        address = utilities_1.readSubstringAndCastAsNumber(S19File, addressIndex, types_1.FullS2ByteLengths.ADDRESS_L, 16);
                        /* Data */
                        dataIndex =
                            i +
                                types_1.FullS2ByteLengths.START_OF_RECORD_L +
                                types_1.FullS2ByteLengths.RECORD_TYPE_L +
                                types_1.FullS2ByteLengths.DATA_LENGTH_L +
                                types_1.FullS2ByteLengths.ADDRESS_L;
                        var dataString = utilities_1.readSubstring(S19File, dataIndex, 2 * dataLength -
                            types_1.FullS2ByteLengths.CHECKSUM_L -
                            types_1.FullS2ByteLengths.ADDRESS_L);
                        data = utilities_1.parseHexString(dataString);
                        /* Checksum */
                        checksumIndex =
                            i +
                                types_1.FullS2ByteLengths.START_OF_RECORD_L +
                                types_1.FullS2ByteLengths.RECORD_TYPE_L +
                                types_1.FullS2ByteLengths.DATA_LENGTH_L +
                                types_1.FullS2ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS2ByteLengths.CHECKSUM_L -
                                    types_1.FullS2ByteLengths.ADDRESS_L);
                        checksum = utilities_1.readSubstringAndCastAsNumber(S19File, checksumIndex, types_1.FullS2ByteLengths.CHECKSUM_L, 16);
                        checksumPacketEndIndex = checksumIndex;
                        /* Full Record Length */
                        fullRecordLength =
                            types_1.FullS2ByteLengths.START_OF_RECORD_L +
                                types_1.FullS2ByteLengths.RECORD_TYPE_L +
                                types_1.FullS2ByteLengths.DATA_LENGTH_L +
                                types_1.FullS2ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS2ByteLengths.CHECKSUM_L -
                                    types_1.FullS2ByteLengths.ADDRESS_L) +
                                types_1.FullS2ByteLengths.CHECKSUM_L;
                        i += fullRecordLength;
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("\nRecord Type: S2 (Full Type)");
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Data Length:", dataLength, dataLength.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("    Address:", address, address.toString(16));
                        logLevel > types_1.LogLevel.NONE && console.log("       Data:", data);
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("   Checksum:", checksum, checksum.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Full Length:", fullRecordLength);
                        nS2++;
                        break;
                    }
                    case "3".charCodeAt(0): {
                        sRecordType = types_1.FullSRecordMarker.S3_RECORD_TYPE;
                        /* Data Length */
                        dataLengthIndex =
                            i +
                                types_1.FullS3ByteLengths.START_OF_RECORD_L +
                                types_1.FullS3ByteLengths.RECORD_TYPE_L;
                        dataLength = utilities_1.readSubstringAndCastAsNumber(S19File, dataLengthIndex, types_1.FullS3ByteLengths.DATA_LENGTH_L, 16);
                        checksumPacketStartIndex = dataLengthIndex;
                        /* Address */
                        addressIndex =
                            i +
                                types_1.FullS3ByteLengths.START_OF_RECORD_L +
                                types_1.FullS3ByteLengths.RECORD_TYPE_L +
                                types_1.FullS3ByteLengths.DATA_LENGTH_L;
                        address = utilities_1.readSubstringAndCastAsNumber(S19File, addressIndex, types_1.FullS3ByteLengths.ADDRESS_L, 16);
                        /* Data */
                        dataIndex =
                            i +
                                types_1.FullS3ByteLengths.START_OF_RECORD_L +
                                types_1.FullS3ByteLengths.RECORD_TYPE_L +
                                types_1.FullS3ByteLengths.DATA_LENGTH_L +
                                types_1.FullS3ByteLengths.ADDRESS_L;
                        var dataString = utilities_1.readSubstring(S19File, dataIndex, 2 * dataLength -
                            types_1.FullS3ByteLengths.CHECKSUM_L -
                            types_1.FullS3ByteLengths.ADDRESS_L);
                        data = utilities_1.parseHexString(dataString);
                        /* Checksum */
                        checksumIndex =
                            i +
                                types_1.FullS3ByteLengths.START_OF_RECORD_L +
                                types_1.FullS3ByteLengths.RECORD_TYPE_L +
                                types_1.FullS3ByteLengths.DATA_LENGTH_L +
                                types_1.FullS3ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS3ByteLengths.CHECKSUM_L -
                                    types_1.FullS3ByteLengths.ADDRESS_L);
                        checksum = utilities_1.readSubstringAndCastAsNumber(S19File, checksumIndex, types_1.FullS3ByteLengths.CHECKSUM_L, 16);
                        checksumPacketEndIndex = checksumIndex;
                        /* Full Record Length */
                        fullRecordLength =
                            types_1.FullS3ByteLengths.START_OF_RECORD_L +
                                types_1.FullS3ByteLengths.RECORD_TYPE_L +
                                types_1.FullS3ByteLengths.DATA_LENGTH_L +
                                types_1.FullS3ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS3ByteLengths.CHECKSUM_L -
                                    types_1.FullS3ByteLengths.ADDRESS_L) +
                                types_1.FullS3ByteLengths.CHECKSUM_L;
                        i += fullRecordLength;
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("\nRecord Type: S3 (Full Type)");
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Data Length:", dataLength, dataLength.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("    Address:", address, address.toString(16));
                        logLevel > types_1.LogLevel.NONE && console.log("       Data:", data);
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("   Checksum:", checksum, checksum.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Full Length:", fullRecordLength);
                        nS3++;
                        break;
                    }
                    case "5".charCodeAt(0): {
                        sRecordType = types_1.FullSRecordMarker.S5_RECORD_TYPE;
                        /* Data Length */
                        dataLengthIndex =
                            i +
                                types_1.FullS5ByteLengths.START_OF_RECORD_L +
                                types_1.FullS5ByteLengths.RECORD_TYPE_L;
                        dataLength = utilities_1.readSubstringAndCastAsNumber(S19File, dataLengthIndex, types_1.FullS5ByteLengths.DATA_LENGTH_L, 16);
                        checksumPacketStartIndex = dataLengthIndex;
                        /* Address */
                        addressIndex =
                            i +
                                types_1.FullS5ByteLengths.START_OF_RECORD_L +
                                types_1.FullS5ByteLengths.RECORD_TYPE_L +
                                types_1.FullS5ByteLengths.DATA_LENGTH_L;
                        address = utilities_1.readSubstringAndCastAsNumber(S19File, addressIndex, types_1.FullS5ByteLengths.ADDRESS_L, 16);
                        /* Data */
                        dataIndex =
                            i +
                                types_1.FullS5ByteLengths.START_OF_RECORD_L +
                                types_1.FullS5ByteLengths.RECORD_TYPE_L +
                                types_1.FullS5ByteLengths.DATA_LENGTH_L +
                                types_1.FullS5ByteLengths.ADDRESS_L;
                        var dataString = utilities_1.readSubstring(S19File, dataIndex, 2 * dataLength -
                            types_1.FullS5ByteLengths.CHECKSUM_L -
                            types_1.FullS5ByteLengths.ADDRESS_L);
                        data = utilities_1.parseHexString(dataString);
                        /* Checksum */
                        checksumIndex =
                            i +
                                types_1.FullS5ByteLengths.START_OF_RECORD_L +
                                types_1.FullS5ByteLengths.RECORD_TYPE_L +
                                types_1.FullS5ByteLengths.DATA_LENGTH_L +
                                types_1.FullS5ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS5ByteLengths.CHECKSUM_L -
                                    types_1.FullS5ByteLengths.ADDRESS_L);
                        checksum = utilities_1.readSubstringAndCastAsNumber(S19File, checksumIndex, types_1.FullS5ByteLengths.CHECKSUM_L, 16);
                        checksumPacketEndIndex = checksumIndex;
                        /* Full Record Length */
                        fullRecordLength =
                            types_1.FullS5ByteLengths.START_OF_RECORD_L +
                                types_1.FullS5ByteLengths.RECORD_TYPE_L +
                                types_1.FullS5ByteLengths.DATA_LENGTH_L +
                                types_1.FullS5ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS5ByteLengths.CHECKSUM_L -
                                    types_1.FullS5ByteLengths.ADDRESS_L) +
                                types_1.FullS5ByteLengths.CHECKSUM_L;
                        i += fullRecordLength;
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("\nRecord Type: S5 (Full Type)");
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Data Length:", dataLength, dataLength.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("    Address:", address, address.toString(16));
                        logLevel > types_1.LogLevel.NONE && console.log("       Data:", data);
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("   Checksum:", checksum, checksum.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Full Length:", fullRecordLength);
                        nS5++;
                        break;
                    }
                    case "7".charCodeAt(0): {
                        sRecordType = types_1.FullSRecordMarker.S7_RECORD_TYPE;
                        dataLength = 0;
                        address = 0;
                        data = utilities_1.parseHexString("");
                        checksum = 0;
                        nS7++;
                        break;
                    }
                    case "9".charCodeAt(0): {
                        sRecordType = types_1.FullSRecordMarker.S9_RECORD_TYPE;
                        /* Data Length */
                        dataLengthIndex =
                            i +
                                types_1.FullS9ByteLengths.START_OF_RECORD_L +
                                types_1.FullS9ByteLengths.RECORD_TYPE_L;
                        dataLength = utilities_1.readSubstringAndCastAsNumber(S19File, dataLengthIndex, types_1.FullS9ByteLengths.DATA_LENGTH_L, 16);
                        checksumPacketStartIndex = dataLengthIndex;
                        /* Address */
                        addressIndex =
                            i +
                                types_1.FullS9ByteLengths.START_OF_RECORD_L +
                                types_1.FullS9ByteLengths.RECORD_TYPE_L +
                                types_1.FullS9ByteLengths.DATA_LENGTH_L;
                        address = utilities_1.readSubstringAndCastAsNumber(S19File, addressIndex, types_1.FullS9ByteLengths.ADDRESS_L, 16);
                        /* Data */
                        dataIndex =
                            i +
                                types_1.FullS9ByteLengths.START_OF_RECORD_L +
                                types_1.FullS9ByteLengths.RECORD_TYPE_L +
                                types_1.FullS9ByteLengths.DATA_LENGTH_L +
                                types_1.FullS9ByteLengths.ADDRESS_L;
                        var dataString = utilities_1.readSubstring(S19File, dataIndex, 2 * dataLength -
                            types_1.FullS9ByteLengths.CHECKSUM_L -
                            types_1.FullS9ByteLengths.ADDRESS_L);
                        data = utilities_1.parseHexString(dataString);
                        /* Checksum */
                        checksumIndex =
                            i +
                                types_1.FullS9ByteLengths.START_OF_RECORD_L +
                                types_1.FullS9ByteLengths.RECORD_TYPE_L +
                                types_1.FullS9ByteLengths.DATA_LENGTH_L +
                                types_1.FullS9ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS9ByteLengths.CHECKSUM_L -
                                    types_1.FullS9ByteLengths.ADDRESS_L);
                        checksum = utilities_1.readSubstringAndCastAsNumber(S19File, checksumIndex, types_1.FullS9ByteLengths.CHECKSUM_L, 16);
                        checksumPacketEndIndex = checksumIndex;
                        /* Full Record Length */
                        fullRecordLength =
                            types_1.FullS9ByteLengths.START_OF_RECORD_L +
                                types_1.FullS9ByteLengths.RECORD_TYPE_L +
                                types_1.FullS9ByteLengths.DATA_LENGTH_L +
                                types_1.FullS9ByteLengths.ADDRESS_L +
                                (2 * dataLength -
                                    types_1.FullS9ByteLengths.CHECKSUM_L -
                                    types_1.FullS9ByteLengths.ADDRESS_L) +
                                types_1.FullS9ByteLengths.CHECKSUM_L;
                        i += fullRecordLength;
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("\nRecord Type: S9 (Full Type)");
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Data Length:", dataLength, dataLength.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("    Address:", address, address.toString(16));
                        logLevel > types_1.LogLevel.NONE && console.log("       Data:", data);
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("   Checksum:", checksum, checksum.toString(16));
                        logLevel > types_1.LogLevel.NONE &&
                            console.log("Full Length:", fullRecordLength);
                        nS9++;
                        break;
                    }
                    default: {
                        throw new Error("Invalid record type: " + currentByte + nextByte);
                    }
                }
                calculatedChecksum = crc_1.calculateChecksum(utilities_1.parseHexString(S19File.substring(checksumPacketStartIndex, checksumPacketEndIndex)), logLevel);
                if (checksum === calculatedChecksum || address == 0) {
                    logLevel > types_1.LogLevel.NONE && console.log("Checksum valid");
                    logLevel > types_1.LogLevel.NONE &&
                        console.log("----------------------------");
                    SRecords.push({
                        sRecordType: sRecordType,
                        address: address,
                        data: data,
                        dataLength: data.length,
                        checksum: checksum,
                    });
                }
                else {
                    throw new Error("Checksum mismatch at addreess " + address);
                }
            }
            i++;
        }
        else {
            i += 2;
        }
    }
    logLevel > types_1.LogLevel.NONE && console.log("# Processing completed: ");
    logLevel > types_1.LogLevel.NONE && console.log("\b## Full S-Records:");
    logLevel > types_1.LogLevel.NONE && console.log("S0 Records = " + nS0);
    logLevel > types_1.LogLevel.NONE && console.log("S1 Records = " + nS1);
    logLevel > types_1.LogLevel.NONE && console.log("S2 Records = " + nS2);
    logLevel > types_1.LogLevel.NONE && console.log("S3 Records = " + nS3);
    logLevel > types_1.LogLevel.NONE && console.log("S5 Records = " + nS5);
    logLevel > types_1.LogLevel.NONE && console.log("S7 Records = " + nS7);
    logLevel > types_1.LogLevel.NONE && console.log("S9 Records = " + nS9);
    var totalDataSize = 0;
    SRecords.forEach(function (srec) { return (totalDataSize += srec.dataLength); });
    logLevel > types_1.LogLevel.NONE && console.log("Total Data Size", totalDataSize);
    return {
        success: true,
        responseCode: types_1.ResponseCodes.SUCCESS,
        errors: null,
        message: "S19 file parsed successfully",
        payload: {
            totalFullSRecords: nS0 + nS1 + nS2 + nS3 + nS7 + nS9,
            totalCompactSRecords: null,
            sRecords: SRecords,
            totalDataSize: totalDataSize,
        },
    };
};
exports.readS19 = readS19;
