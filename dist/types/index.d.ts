/// <reference types="node" />
/**
 * General Types
 */
export declare enum ResponseCodes {
    ERROR = 0,
    WARNING = 1,
    SUCCESS = 2
}
export declare enum LogLevel {
    NONE = 0,
    INFO = 1,
    DEBUG = 2,
    ALL = 3
}
export declare type StandardisedResponse = {
    success: boolean;
    responseCode: number;
    errors?: Array<Error>;
    message?: string;
    payload: any;
};
/**
 * S-Record Types
 */
export declare enum AddressSpaceBoundaries {
    _16_BIT = 65535,
    _24_BIT = 16777215,
    _32_BIT = 4294967295
}
export declare type FullSRecordReferenceStructure = {
    sRecordType: FullSRecordMarker;
    data: Buffer;
    dataLength: number;
    address: number;
    checksum: number;
};
export declare enum FullSRecordMarker {
    START_OF_RECORD = 83,
    S0_RECORD_TYPE = 48,
    S1_RECORD_TYPE = 49,
    S2_RECORD_TYPE = 50,
    S3_RECORD_TYPE = 51,
    S5_RECORD_TYPE = 53,
    S7_RECORD_TYPE = 55,
    S9_RECORD_TYPE = 57
}
export declare enum FullSRecordSizes {
    S0_RECORD_SIZE = 22,
    S1_RECORD_SIZE = 42,
    S2_RECORD_SIZE = 44,
    S3_RECORD_SIZE = 46,
    S5_RECORD_SIZE = 10,
    S7_RECORD_SIZE = 0,
    S9_RECORD_SIZE = 10
}
export declare enum FullS0ByteLengths {
    START_OF_RECORD_L = 1,
    RECORD_TYPE_L = 1,
    DATA_LENGTH_L = 2,
    ADDRESS_L = 4,
    CHECKSUM_L = 2
}
export declare enum FullS1ByteLengths {
    START_OF_RECORD_L = 1,
    RECORD_TYPE_L = 1,
    DATA_LENGTH_L = 2,
    ADDRESS_L = 4,
    CHECKSUM_L = 2
}
export declare enum FullS2ByteLengths {
    START_OF_RECORD_L = 1,
    RECORD_TYPE_L = 1,
    DATA_LENGTH_L = 2,
    ADDRESS_L = 6,
    CHECKSUM_L = 2
}
export declare enum FullS3ByteLengths {
    START_OF_RECORD_L = 1,
    RECORD_TYPE_L = 1,
    DATA_LENGTH_L = 2,
    ADDRESS_L = 8,
    CHECKSUM_L = 2
}
export declare enum FullS5ByteLengths {
    START_OF_RECORD_L = 1,
    RECORD_TYPE_L = 1,
    DATA_LENGTH_L = 2,
    ADDRESS_L = 4,
    CHECKSUM_L = 2
}
export declare enum FullS7ByteLengths {
    START_OF_RECORD_L = 1,
    RECORD_TYPE_L = 1,
    DATA_LENGTH_L = 2,
    ADDRESS_L = 8,
    CHECKSUM_L = 2
}
export declare enum FullS9ByteLengths {
    START_OF_RECORD_L = 1,
    RECORD_TYPE_L = 1,
    DATA_LENGTH_L = 2,
    ADDRESS_L = 4,
    CHECKSUM_L = 2
}
//# sourceMappingURL=index.d.ts.map