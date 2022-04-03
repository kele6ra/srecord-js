/**
 * General Types
 */
export enum ResponseCodes {
  ERROR,
  WARNING,
  SUCCESS,
}

export enum LogLevel {
  NONE,
  INFO,
  DEBUG,
  ALL,
}

export type StandardisedResponse = {
  success: boolean;
  responseCode: number;
  errors?: Array<Error>;
  message?: string;
  payload: any;
};

/**
 * S-Record Types
 */

export enum AddressSpaceBoundaries {
  _16_BIT = 65535,
  _24_BIT = 16777215,
  _32_BIT = 4294967295,
}

export type FullSRecordReferenceStructure = {
  sRecordType: FullSRecordMarker;
  data: Buffer;
  dataLength: number;
  address: number;
  checksum: number;
};

export enum FullSRecordMarker {
  START_OF_RECORD = 0x53,
  S0_RECORD_TYPE = 0x30,
  S1_RECORD_TYPE = 0x31,
  S2_RECORD_TYPE = 0x32,
  S3_RECORD_TYPE = 0x33,
  S5_RECORD_TYPE = 0x35,
  S7_RECORD_TYPE = 0x37,
  S9_RECORD_TYPE = 0x39,
}

export enum FullSRecordSizes {
  S0_RECORD_SIZE = 22,
  S1_RECORD_SIZE = 42,
  S2_RECORD_SIZE = 44,
  S3_RECORD_SIZE = 46,
  S5_RECORD_SIZE = 10,
  S7_RECORD_SIZE = 0, // Unknown
  S9_RECORD_SIZE = 10,
}

export enum FullS0ByteLengths {
  START_OF_RECORD_L = 1,
  RECORD_TYPE_L = 1,
  DATA_LENGTH_L = 2,
  ADDRESS_L = 4,
  CHECKSUM_L = 2,
}
export enum FullS1ByteLengths {
  START_OF_RECORD_L = 1,
  RECORD_TYPE_L = 1,
  DATA_LENGTH_L = 2,
  ADDRESS_L = 4,
  CHECKSUM_L = 2,
}
export enum FullS2ByteLengths {
  START_OF_RECORD_L = 1,
  RECORD_TYPE_L = 1,
  DATA_LENGTH_L = 2,
  ADDRESS_L = 6,
  CHECKSUM_L = 2,
}
export enum FullS3ByteLengths {
  START_OF_RECORD_L = 1,
  RECORD_TYPE_L = 1,
  DATA_LENGTH_L = 2,
  ADDRESS_L = 8,
  CHECKSUM_L = 2,
}

export enum FullS5ByteLengths {
  START_OF_RECORD_L = 1,
  RECORD_TYPE_L = 1,
  DATA_LENGTH_L = 2,
  ADDRESS_L = 4,
  CHECKSUM_L = 2,
}

export enum FullS7ByteLengths {
  START_OF_RECORD_L = 1,
  RECORD_TYPE_L = 1,
  DATA_LENGTH_L = 2,
  ADDRESS_L = 8,
  CHECKSUM_L = 2,
}

export enum FullS9ByteLengths {
  START_OF_RECORD_L = 1,
  RECORD_TYPE_L = 1,
  DATA_LENGTH_L = 2,
  ADDRESS_L = 4,
  CHECKSUM_L = 2,
}
