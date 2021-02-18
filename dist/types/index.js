"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullS9ByteLengths = exports.FullS5ByteLengths = exports.FullS3ByteLengths = exports.FullS2ByteLengths = exports.FullS1ByteLengths = exports.FullS0ByteLengths = exports.FullSRecordSizes = exports.FullSRecordMarker = exports.AddressSpaceBoundaries = exports.LogLevel = exports.ResponseCodes = void 0;
/**
 * General Types
 */
var ResponseCodes;
(function (ResponseCodes) {
    ResponseCodes[ResponseCodes["ERROR"] = 0] = "ERROR";
    ResponseCodes[ResponseCodes["WARNING"] = 1] = "WARNING";
    ResponseCodes[ResponseCodes["SUCCESS"] = 2] = "SUCCESS";
})(ResponseCodes = exports.ResponseCodes || (exports.ResponseCodes = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["NONE"] = 0] = "NONE";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["ALL"] = 3] = "ALL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * S-Record Types
 */
var AddressSpaceBoundaries;
(function (AddressSpaceBoundaries) {
    AddressSpaceBoundaries[AddressSpaceBoundaries["_16_BIT"] = 65535] = "_16_BIT";
    AddressSpaceBoundaries[AddressSpaceBoundaries["_24_BIT"] = 16777215] = "_24_BIT";
    AddressSpaceBoundaries[AddressSpaceBoundaries["_32_BIT"] = 4294967295] = "_32_BIT";
})(AddressSpaceBoundaries = exports.AddressSpaceBoundaries || (exports.AddressSpaceBoundaries = {}));
var FullSRecordMarker;
(function (FullSRecordMarker) {
    FullSRecordMarker[FullSRecordMarker["START_OF_RECORD"] = 83] = "START_OF_RECORD";
    FullSRecordMarker[FullSRecordMarker["S0_RECORD_TYPE"] = 48] = "S0_RECORD_TYPE";
    FullSRecordMarker[FullSRecordMarker["S1_RECORD_TYPE"] = 49] = "S1_RECORD_TYPE";
    FullSRecordMarker[FullSRecordMarker["S2_RECORD_TYPE"] = 50] = "S2_RECORD_TYPE";
    FullSRecordMarker[FullSRecordMarker["S3_RECORD_TYPE"] = 51] = "S3_RECORD_TYPE";
    FullSRecordMarker[FullSRecordMarker["S5_RECORD_TYPE"] = 53] = "S5_RECORD_TYPE";
    FullSRecordMarker[FullSRecordMarker["S7_RECORD_TYPE"] = 55] = "S7_RECORD_TYPE";
    FullSRecordMarker[FullSRecordMarker["S9_RECORD_TYPE"] = 57] = "S9_RECORD_TYPE";
})(FullSRecordMarker = exports.FullSRecordMarker || (exports.FullSRecordMarker = {}));
var FullSRecordSizes;
(function (FullSRecordSizes) {
    FullSRecordSizes[FullSRecordSizes["S0_RECORD_SIZE"] = 22] = "S0_RECORD_SIZE";
    FullSRecordSizes[FullSRecordSizes["S1_RECORD_SIZE"] = 42] = "S1_RECORD_SIZE";
    FullSRecordSizes[FullSRecordSizes["S2_RECORD_SIZE"] = 44] = "S2_RECORD_SIZE";
    FullSRecordSizes[FullSRecordSizes["S3_RECORD_SIZE"] = 46] = "S3_RECORD_SIZE";
    FullSRecordSizes[FullSRecordSizes["S5_RECORD_SIZE"] = 10] = "S5_RECORD_SIZE";
    FullSRecordSizes[FullSRecordSizes["S7_RECORD_SIZE"] = 0] = "S7_RECORD_SIZE";
    FullSRecordSizes[FullSRecordSizes["S9_RECORD_SIZE"] = 10] = "S9_RECORD_SIZE";
})(FullSRecordSizes = exports.FullSRecordSizes || (exports.FullSRecordSizes = {}));
var FullS0ByteLengths;
(function (FullS0ByteLengths) {
    FullS0ByteLengths[FullS0ByteLengths["START_OF_RECORD_L"] = 1] = "START_OF_RECORD_L";
    FullS0ByteLengths[FullS0ByteLengths["RECORD_TYPE_L"] = 1] = "RECORD_TYPE_L";
    FullS0ByteLengths[FullS0ByteLengths["DATA_LENGTH_L"] = 2] = "DATA_LENGTH_L";
    FullS0ByteLengths[FullS0ByteLengths["ADDRESS_L"] = 4] = "ADDRESS_L";
    FullS0ByteLengths[FullS0ByteLengths["CHECKSUM_L"] = 2] = "CHECKSUM_L";
})(FullS0ByteLengths = exports.FullS0ByteLengths || (exports.FullS0ByteLengths = {}));
var FullS1ByteLengths;
(function (FullS1ByteLengths) {
    FullS1ByteLengths[FullS1ByteLengths["START_OF_RECORD_L"] = 1] = "START_OF_RECORD_L";
    FullS1ByteLengths[FullS1ByteLengths["RECORD_TYPE_L"] = 1] = "RECORD_TYPE_L";
    FullS1ByteLengths[FullS1ByteLengths["DATA_LENGTH_L"] = 2] = "DATA_LENGTH_L";
    FullS1ByteLengths[FullS1ByteLengths["ADDRESS_L"] = 4] = "ADDRESS_L";
    FullS1ByteLengths[FullS1ByteLengths["CHECKSUM_L"] = 2] = "CHECKSUM_L";
})(FullS1ByteLengths = exports.FullS1ByteLengths || (exports.FullS1ByteLengths = {}));
var FullS2ByteLengths;
(function (FullS2ByteLengths) {
    FullS2ByteLengths[FullS2ByteLengths["START_OF_RECORD_L"] = 1] = "START_OF_RECORD_L";
    FullS2ByteLengths[FullS2ByteLengths["RECORD_TYPE_L"] = 1] = "RECORD_TYPE_L";
    FullS2ByteLengths[FullS2ByteLengths["DATA_LENGTH_L"] = 2] = "DATA_LENGTH_L";
    FullS2ByteLengths[FullS2ByteLengths["ADDRESS_L"] = 6] = "ADDRESS_L";
    FullS2ByteLengths[FullS2ByteLengths["CHECKSUM_L"] = 2] = "CHECKSUM_L";
})(FullS2ByteLengths = exports.FullS2ByteLengths || (exports.FullS2ByteLengths = {}));
var FullS3ByteLengths;
(function (FullS3ByteLengths) {
    FullS3ByteLengths[FullS3ByteLengths["START_OF_RECORD_L"] = 1] = "START_OF_RECORD_L";
    FullS3ByteLengths[FullS3ByteLengths["RECORD_TYPE_L"] = 1] = "RECORD_TYPE_L";
    FullS3ByteLengths[FullS3ByteLengths["DATA_LENGTH_L"] = 2] = "DATA_LENGTH_L";
    FullS3ByteLengths[FullS3ByteLengths["ADDRESS_L"] = 8] = "ADDRESS_L";
    FullS3ByteLengths[FullS3ByteLengths["CHECKSUM_L"] = 2] = "CHECKSUM_L";
})(FullS3ByteLengths = exports.FullS3ByteLengths || (exports.FullS3ByteLengths = {}));
var FullS5ByteLengths;
(function (FullS5ByteLengths) {
    FullS5ByteLengths[FullS5ByteLengths["START_OF_RECORD_L"] = 1] = "START_OF_RECORD_L";
    FullS5ByteLengths[FullS5ByteLengths["RECORD_TYPE_L"] = 1] = "RECORD_TYPE_L";
    FullS5ByteLengths[FullS5ByteLengths["DATA_LENGTH_L"] = 2] = "DATA_LENGTH_L";
    FullS5ByteLengths[FullS5ByteLengths["ADDRESS_L"] = 4] = "ADDRESS_L";
    FullS5ByteLengths[FullS5ByteLengths["CHECKSUM_L"] = 2] = "CHECKSUM_L";
})(FullS5ByteLengths = exports.FullS5ByteLengths || (exports.FullS5ByteLengths = {}));
var FullS9ByteLengths;
(function (FullS9ByteLengths) {
    FullS9ByteLengths[FullS9ByteLengths["START_OF_RECORD_L"] = 1] = "START_OF_RECORD_L";
    FullS9ByteLengths[FullS9ByteLengths["RECORD_TYPE_L"] = 1] = "RECORD_TYPE_L";
    FullS9ByteLengths[FullS9ByteLengths["DATA_LENGTH_L"] = 2] = "DATA_LENGTH_L";
    FullS9ByteLengths[FullS9ByteLengths["ADDRESS_L"] = 4] = "ADDRESS_L";
    FullS9ByteLengths[FullS9ByteLengths["CHECKSUM_L"] = 2] = "CHECKSUM_L";
})(FullS9ByteLengths = exports.FullS9ByteLengths || (exports.FullS9ByteLengths = {}));
