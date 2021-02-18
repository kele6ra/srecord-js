/* Libraries */

/* CRC */
import { calculateChecksum } from "../crc/";

/* Utilities */
import {
  readSubstringAndCastAsNumber,
  readSubstring,
  parseHexString,
  decToHex,
} from "../utilities/";

/* Types */
import {
  LogLevel,
  StandardisedResponse,
  ResponseCodes,
  AddressSpaceBoundaries,
  FullSRecordSizes,
} from "../types/";

/**
 *
 * @param dataBuffer - the input data buffer
 * @param recordDataLength - how long is the data
 * @param includeS5Record - set to 'true' if you want an S5 summary record (sum of S1+2+3 records)
 * @param headerData - string value to be included with the S0 record as the data (used by select vendors)
 * @param logLevel - LogLevel value (0=NONE)
 */
export const writeS19 = (
  dataBuffer: Buffer,
  recordDataLength: number,
  includeS5Record: boolean,
  headerData: string = "",
  logLevel: LogLevel = LogLevel.NONE
): StandardisedResponse => {
  if (recordDataLength < 1 || recordDataLength > 255) {
    throw new Error(
      "Illegal record data length parameter. Must be between 1-255"
    );
  }
  const DATA_LENGTH = recordDataLength;

  let s19 = "";
  let i = 0;

  let data = Buffer.alloc(DATA_LENGTH);

  let nS0 = 0;
  let nS1 = 0;
  let nS2 = 0;
  let nS3 = 0;
  let nS5 = 0;
  let nS9 = 0;

  logLevel > LogLevel.NONE && console.log("Started...");
  logLevel > LogLevel.NONE && console.log("Buffer Length", dataBuffer.length);

  data.fill(0);
  dataBuffer.copy(data, 0, i, i + 6);

  s19 += produceS0Record(0, Buffer.from(headerData), headerData.length);
  s19 += "\r\n";
  nS0++;

  while (i < dataBuffer.length - DATA_LENGTH) {
    data.fill(0);

    dataBuffer.copy(data, 0, i, i + DATA_LENGTH);

    if (i < AddressSpaceBoundaries._16_BIT) {
      logLevel > LogLevel.NONE && console.log(`[${i}] :: Producing S1 record`);
      s19 += produceS1Record(i, data, DATA_LENGTH, logLevel);
      s19 += "\r\n";
      nS1++;
    } else if (i < AddressSpaceBoundaries._24_BIT) {
      logLevel > LogLevel.NONE && console.log(`[${i}] :: Producing S2 record`);
      s19 += produceS2Record(i, data, DATA_LENGTH, logLevel);
      s19 += "\r\n";
      nS2++;
    } else if (i < AddressSpaceBoundaries._32_BIT) {
      logLevel > LogLevel.NONE && console.log(`[${i}] :: Producing S3 record`);
      s19 += produceS3Record(i, data, DATA_LENGTH, logLevel);
      s19 += "\r\n";
      nS3++;
    } else {
      throw new Error("Cannot write S19 payload. Illegal address space");
    }
    i += DATA_LENGTH;
  }

  data.fill(0);
  if (includeS5Record) {
    logLevel > LogLevel.NONE &&
      console.log(
        `[${i}] :: Producing S5 record - total S1+2+3 = ${nS1 + nS2 + nS3}`
      );

    s19 += produceS5Record(nS1 + nS2 + nS3, data, 0, logLevel);
    s19 += "\r\n";
    nS5++;
  }

  s19 += produceS9Record(0, data, 0, logLevel);
  nS9++;

  logLevel > LogLevel.NONE && console.log("Write S19 Summary: ");
  logLevel > LogLevel.NONE && console.log(`S0 Records: ${nS0}`);
  logLevel > LogLevel.NONE && console.log(`S1 Records: ${nS1}`);
  logLevel > LogLevel.NONE && console.log(`S2 Records: ${nS2}`);
  logLevel > LogLevel.NONE && console.log(`S3 Records: ${nS3}`);
  logLevel > LogLevel.NONE && console.log(`S5 Records: ${nS5}`);
  logLevel > LogLevel.NONE && console.log(`S9 Records: ${nS9}`);

  return {
    success: true,
    responseCode: ResponseCodes.SUCCESS,
    errors: [],
    message: "Data buffer converted into S19 payload",
    payload: s19,
  };
};

const produceS0Record = (
  address: number,
  data: Buffer,
  dataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  let srecord = "";
  let record = Buffer.alloc(FullSRecordSizes.S0_RECORD_SIZE);
  let ptr = 0;

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
  record[ptr] = calculateChecksum(record.slice(0, ptr));

  /* Final Assembly */
  srecord += record
    .slice(0, ptr + 1)
    .toString("hex")
    .toUpperCase();

  logLevel > LogLevel.NONE && console.log(srecord);
  return srecord;
};
const produceS1Record = (
  address: number,
  data: Buffer,
  dataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  let srecord = "";
  let record = Buffer.alloc(FullSRecordSizes.S1_RECORD_SIZE);
  let ptr = 0;

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
  record[ptr] = calculateChecksum(record.slice(0, ptr));

  /* Final Assembly */
  srecord += record
    .slice(0, ptr + 1)
    .toString("hex")
    .toUpperCase();

  logLevel > LogLevel.NONE && console.log(srecord);
  return srecord;
};
const produceS2Record = (
  address: number,
  data: Buffer,
  dataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  let srecord = "";
  let record = Buffer.alloc(FullSRecordSizes.S2_RECORD_SIZE);
  let ptr = 0;

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
  record[ptr] = calculateChecksum(record.slice(0, ptr));

  /* Final Assembly */
  srecord += record
    .slice(0, ptr + 1)
    .toString("hex")
    .toUpperCase();

  logLevel > LogLevel.NONE && console.log(srecord);
  return srecord;
};
const produceS3Record = (
  address: number,
  data: Buffer,
  dataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  let srecord = "";
  let record = Buffer.alloc(FullSRecordSizes.S3_RECORD_SIZE);
  let ptr = 0;

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
  record[ptr] = calculateChecksum(record.slice(0, ptr));

  /* Final Assembly */
  srecord += record
    .slice(0, ptr + 1)
    .toString("hex")
    .toUpperCase();

  logLevel > LogLevel.NONE && console.log(srecord);
  return srecord;
};
const produceS7Record = (
  address: number,
  data: Buffer,
  dataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  let srecord = "";
  let record = Buffer.alloc(FullSRecordSizes.S7_RECORD_SIZE);
  let ptr = 0;

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
  record[ptr] = calculateChecksum(record.slice(0, ptr));

  /* Final Assembly */
  srecord += record
    .slice(0, ptr + 1)
    .toString("hex")
    .toUpperCase();

  logLevel > LogLevel.NONE && console.log(srecord);
  return srecord;
};
const produceS5Record = (
  address: number,
  data: Buffer,
  dataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  let srecord = "";
  let record = Buffer.alloc(FullSRecordSizes.S5_RECORD_SIZE);
  let ptr = 0;

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
  record[ptr] = calculateChecksum(record.slice(0, ptr));

  /* Final Assembly */
  srecord += record
    .slice(0, ptr + 1)
    .toString("hex")
    .toUpperCase();

  logLevel > LogLevel.NONE && console.log(srecord);
  return srecord;
};
const produceS9Record = (
  address: number,
  data: Buffer,
  dataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  let srecord = "";
  let record = Buffer.alloc(FullSRecordSizes.S9_RECORD_SIZE);
  let ptr = 0;

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
  record[ptr] = calculateChecksum(record.slice(0, ptr));

  /* Final Assembly */
  srecord += record
    .slice(0, ptr + 1)
    .toString("hex")
    .toUpperCase();

  logLevel > LogLevel.NONE && console.log(srecord);
  return srecord;
};
