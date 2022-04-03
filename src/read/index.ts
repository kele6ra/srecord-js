/* Libraries */

/* CRC */
import { calculateChecksum } from "../crc/";

/* Utilities */
import {
  readSubstringAndCastAsNumber,
  readSubstring,
  parseHexString,
} from "../utilities/";

/* Types */
import {
  LogLevel,
  FullSRecordMarker,
  FullS0ByteLengths,
  FullS1ByteLengths,
  FullS2ByteLengths,
  FullS3ByteLengths,
  FullS7ByteLengths,
  FullS9ByteLengths,
  FullSRecordReferenceStructure,
  ResponseCodes,
  FullS5ByteLengths,
} from "../types/";

export const readS19 = (
  s19Data: string,
  s19DataLength: number,
  logLevel: LogLevel = LogLevel.NONE
) => {
  const S19File = s19Data;

  logLevel > LogLevel.NONE &&
    console.log("reads19 :: S19File hexadecimal length: ", S19File.length);
  logLevel > LogLevel.NONE &&
    console.log("reads19 :: S19File raw length: ", s19DataLength);

  let i = 0;

  let nS0 = 0;
  let nS1 = 0;
  let nS2 = 0;
  let nS3 = 0;
  let nS5 = 0;
  let nS7 = 0;
  let nS9 = 0;

  const SRecords: Array<FullSRecordReferenceStructure> = [];

  let sRecordType: FullSRecordMarker;

  let dataLength = 0;
  let address = null;
  let data: Buffer;
  let checksum = null;
  let calculatedChecksum = null;
  let fullRecordLength = 0;

  let dataLengthIndex = 0;
  let addressIndex = 0;
  let dataIndex = null;
  let checksumIndex = null;
  let checksumPacketStartIndex = 0;
  let checksumPacketEndIndex = 0;

  while (i < S19File.length) {
    let currentByte = S19File.substring(i, i + 1);
    let nextByte = S19File.substring(i + 1, i + 2);

    const isLineBreak =
      currentByte.charCodeAt(0) === 0x0d && nextByte.charCodeAt(0) === 0x0a;

    if (!isLineBreak) {
      if (currentByte.charCodeAt(0) === "S".charCodeAt(0)) {
        switch (nextByte.charCodeAt(0)) {
          case "0".charCodeAt(0): {
            /* [S][0][Data Length (2 bytes)][address (4 bytes)][data (data length - 6 (4 address, 2 checksum))][checksum (2 bytes)] */

            sRecordType = FullSRecordMarker.S0_RECORD_TYPE;

            /* Data Length */
            dataLengthIndex =
              i +
              FullS0ByteLengths.START_OF_RECORD_L +
              FullS0ByteLengths.RECORD_TYPE_L;

            dataLength = readSubstringAndCastAsNumber(
              S19File,
              dataLengthIndex,
              FullS0ByteLengths.DATA_LENGTH_L,
              16
            );
            checksumPacketStartIndex = dataLengthIndex;

            /* Address */
            addressIndex =
              i +
              FullS0ByteLengths.START_OF_RECORD_L +
              FullS0ByteLengths.RECORD_TYPE_L +
              FullS0ByteLengths.DATA_LENGTH_L;

            address = readSubstringAndCastAsNumber(
              S19File,
              addressIndex,
              FullS0ByteLengths.ADDRESS_L,
              16
            );

            /* Data */
            dataIndex =
              i +
              FullS0ByteLengths.START_OF_RECORD_L +
              FullS0ByteLengths.RECORD_TYPE_L +
              FullS0ByteLengths.DATA_LENGTH_L +
              FullS0ByteLengths.ADDRESS_L;

            const dataString = readSubstring(
              S19File,
              dataIndex,
              2 * dataLength -
                FullS0ByteLengths.CHECKSUM_L -
                FullS0ByteLengths.ADDRESS_L
            );
            data = parseHexString(dataString);

            /* Checksum */
            checksumIndex =
              i +
              FullS0ByteLengths.START_OF_RECORD_L +
              FullS0ByteLengths.RECORD_TYPE_L +
              FullS0ByteLengths.DATA_LENGTH_L +
              FullS0ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS0ByteLengths.CHECKSUM_L -
                FullS0ByteLengths.ADDRESS_L);

            checksum = readSubstringAndCastAsNumber(
              S19File,
              checksumIndex,
              FullS0ByteLengths.CHECKSUM_L,
              16
            );

            checksumPacketEndIndex = checksumIndex;

            /* Full Record Length */
            fullRecordLength =
              FullS0ByteLengths.START_OF_RECORD_L +
              FullS0ByteLengths.RECORD_TYPE_L +
              FullS0ByteLengths.DATA_LENGTH_L +
              FullS0ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS0ByteLengths.CHECKSUM_L -
                FullS0ByteLengths.ADDRESS_L) +
              FullS0ByteLengths.CHECKSUM_L;

            i += fullRecordLength;

            logLevel > LogLevel.NONE &&
              console.log("\nRecord Type: S0 (Full Type)");
            logLevel > LogLevel.NONE &&
              console.log("Data Length:", dataLength, dataLength.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("    Address:", address, address.toString(16));
            logLevel > LogLevel.NONE && console.log("       Data:", data);
            logLevel > LogLevel.NONE &&
              console.log("   Checksum:", checksum, checksum.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("Full Length:", fullRecordLength);

            nS0++;

            break;
          }
          case "1".charCodeAt(0): {
            sRecordType = FullSRecordMarker.S1_RECORD_TYPE;

            /* Data Length */
            dataLengthIndex =
              i +
              FullS1ByteLengths.START_OF_RECORD_L +
              FullS1ByteLengths.RECORD_TYPE_L;

            dataLength = readSubstringAndCastAsNumber(
              S19File,
              dataLengthIndex,
              FullS1ByteLengths.DATA_LENGTH_L,
              16
            );

            checksumPacketStartIndex = dataLengthIndex;

            /* Address */
            addressIndex =
              i +
              FullS1ByteLengths.START_OF_RECORD_L +
              FullS1ByteLengths.RECORD_TYPE_L +
              FullS1ByteLengths.DATA_LENGTH_L;

            address = readSubstringAndCastAsNumber(
              S19File,
              addressIndex,
              FullS1ByteLengths.ADDRESS_L,
              16
            );

            /* Data */

            dataIndex =
              i +
              FullS1ByteLengths.START_OF_RECORD_L +
              FullS1ByteLengths.RECORD_TYPE_L +
              FullS1ByteLengths.DATA_LENGTH_L +
              FullS1ByteLengths.ADDRESS_L;

            const dataString = readSubstring(
              S19File,
              dataIndex,
              2 * dataLength -
                FullS1ByteLengths.CHECKSUM_L -
                FullS1ByteLengths.ADDRESS_L
            );
            data = parseHexString(dataString);

            /* Checksum */
            checksumIndex =
              i +
              FullS1ByteLengths.START_OF_RECORD_L +
              FullS1ByteLengths.RECORD_TYPE_L +
              FullS1ByteLengths.DATA_LENGTH_L +
              FullS1ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS1ByteLengths.CHECKSUM_L -
                FullS1ByteLengths.ADDRESS_L);

            checksum = readSubstringAndCastAsNumber(
              S19File,
              checksumIndex,
              FullS1ByteLengths.CHECKSUM_L,
              16
            );

            checksumPacketEndIndex = checksumIndex;

            /* Full Record Length */
            fullRecordLength =
              FullS1ByteLengths.START_OF_RECORD_L +
              FullS1ByteLengths.RECORD_TYPE_L +
              FullS1ByteLengths.DATA_LENGTH_L +
              FullS1ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS1ByteLengths.CHECKSUM_L -
                FullS1ByteLengths.ADDRESS_L) +
              FullS1ByteLengths.CHECKSUM_L;

            i += fullRecordLength;

            logLevel > LogLevel.NONE &&
              console.log("\nRecord Type: S1 (Full Type)");
            logLevel > LogLevel.NONE &&
              console.log("Data Length:", dataLength, dataLength.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("    Address:", address, address.toString(16));
            logLevel > LogLevel.NONE && console.log("       Data:", data);
            logLevel > LogLevel.NONE &&
              console.log("   Checksum:", checksum, checksum.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("Full Length:", fullRecordLength);
            nS1++;
            break;
          }
          case "2".charCodeAt(0): {
            sRecordType = FullSRecordMarker.S2_RECORD_TYPE;

            /* Data Length */
            dataLengthIndex =
              i +
              FullS2ByteLengths.START_OF_RECORD_L +
              FullS2ByteLengths.RECORD_TYPE_L;

            dataLength = readSubstringAndCastAsNumber(
              S19File,
              dataLengthIndex,
              FullS2ByteLengths.DATA_LENGTH_L,
              16
            );

            checksumPacketStartIndex = dataLengthIndex;

            /* Address */
            addressIndex =
              i +
              FullS2ByteLengths.START_OF_RECORD_L +
              FullS2ByteLengths.RECORD_TYPE_L +
              FullS2ByteLengths.DATA_LENGTH_L;

            address = readSubstringAndCastAsNumber(
              S19File,
              addressIndex,
              FullS2ByteLengths.ADDRESS_L,
              16
            );

            /* Data */

            dataIndex =
              i +
              FullS2ByteLengths.START_OF_RECORD_L +
              FullS2ByteLengths.RECORD_TYPE_L +
              FullS2ByteLengths.DATA_LENGTH_L +
              FullS2ByteLengths.ADDRESS_L;

            const dataString = readSubstring(
              S19File,
              dataIndex,
              2 * dataLength -
                FullS2ByteLengths.CHECKSUM_L -
                FullS2ByteLengths.ADDRESS_L
            );
            data = parseHexString(dataString);

            /* Checksum */
            checksumIndex =
              i +
              FullS2ByteLengths.START_OF_RECORD_L +
              FullS2ByteLengths.RECORD_TYPE_L +
              FullS2ByteLengths.DATA_LENGTH_L +
              FullS2ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS2ByteLengths.CHECKSUM_L -
                FullS2ByteLengths.ADDRESS_L);

            checksum = readSubstringAndCastAsNumber(
              S19File,
              checksumIndex,
              FullS2ByteLengths.CHECKSUM_L,
              16
            );

            checksumPacketEndIndex = checksumIndex;

            /* Full Record Length */
            fullRecordLength =
              FullS2ByteLengths.START_OF_RECORD_L +
              FullS2ByteLengths.RECORD_TYPE_L +
              FullS2ByteLengths.DATA_LENGTH_L +
              FullS2ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS2ByteLengths.CHECKSUM_L -
                FullS2ByteLengths.ADDRESS_L) +
              FullS2ByteLengths.CHECKSUM_L;

            i += fullRecordLength;

            logLevel > LogLevel.NONE &&
              console.log("\nRecord Type: S2 (Full Type)");
            logLevel > LogLevel.NONE &&
              console.log("Data Length:", dataLength, dataLength.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("    Address:", address, address.toString(16));
            logLevel > LogLevel.NONE && console.log("       Data:", data);
            logLevel > LogLevel.NONE &&
              console.log("   Checksum:", checksum, checksum.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("Full Length:", fullRecordLength);
            nS2++;
            break;
          }
          case "3".charCodeAt(0): {
            sRecordType = FullSRecordMarker.S3_RECORD_TYPE;

            /* Data Length */
            dataLengthIndex =
              i +
              FullS3ByteLengths.START_OF_RECORD_L +
              FullS3ByteLengths.RECORD_TYPE_L;

            dataLength = readSubstringAndCastAsNumber(
              S19File,
              dataLengthIndex,
              FullS3ByteLengths.DATA_LENGTH_L,
              16
            );

            checksumPacketStartIndex = dataLengthIndex;

            /* Address */
            addressIndex =
              i +
              FullS3ByteLengths.START_OF_RECORD_L +
              FullS3ByteLengths.RECORD_TYPE_L +
              FullS3ByteLengths.DATA_LENGTH_L;

            address = readSubstringAndCastAsNumber(
              S19File,
              addressIndex,
              FullS3ByteLengths.ADDRESS_L,
              16
            );

            /* Data */

            dataIndex =
              i +
              FullS3ByteLengths.START_OF_RECORD_L +
              FullS3ByteLengths.RECORD_TYPE_L +
              FullS3ByteLengths.DATA_LENGTH_L +
              FullS3ByteLengths.ADDRESS_L;

            const dataString = readSubstring(
              S19File,
              dataIndex,
              2 * dataLength -
                FullS3ByteLengths.CHECKSUM_L -
                FullS3ByteLengths.ADDRESS_L
            );
            data = parseHexString(dataString);

            /* Checksum */
            checksumIndex =
              i +
              FullS3ByteLengths.START_OF_RECORD_L +
              FullS3ByteLengths.RECORD_TYPE_L +
              FullS3ByteLengths.DATA_LENGTH_L +
              FullS3ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS3ByteLengths.CHECKSUM_L -
                FullS3ByteLengths.ADDRESS_L);

            checksum = readSubstringAndCastAsNumber(
              S19File,
              checksumIndex,
              FullS3ByteLengths.CHECKSUM_L,
              16
            );

            checksumPacketEndIndex = checksumIndex;

            /* Full Record Length */
            fullRecordLength =
              FullS3ByteLengths.START_OF_RECORD_L +
              FullS3ByteLengths.RECORD_TYPE_L +
              FullS3ByteLengths.DATA_LENGTH_L +
              FullS3ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS3ByteLengths.CHECKSUM_L -
                FullS3ByteLengths.ADDRESS_L) +
              FullS3ByteLengths.CHECKSUM_L;

            i += fullRecordLength;

            logLevel > LogLevel.NONE &&
              console.log("\nRecord Type: S3 (Full Type)");
            logLevel > LogLevel.NONE &&
              console.log("Data Length:", dataLength, dataLength.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("    Address:", address, address.toString(16));
            logLevel > LogLevel.NONE && console.log("       Data:", data);
            logLevel > LogLevel.NONE &&
              console.log("   Checksum:", checksum, checksum.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("Full Length:", fullRecordLength);
            nS3++;
            break;
          }
          case "5".charCodeAt(0): {
            sRecordType = FullSRecordMarker.S5_RECORD_TYPE;

            /* Data Length */
            dataLengthIndex =
              i +
              FullS5ByteLengths.START_OF_RECORD_L +
              FullS5ByteLengths.RECORD_TYPE_L;

            dataLength = readSubstringAndCastAsNumber(
              S19File,
              dataLengthIndex,
              FullS5ByteLengths.DATA_LENGTH_L,
              16
            );

            checksumPacketStartIndex = dataLengthIndex;

            /* Address */
            addressIndex =
              i +
              FullS5ByteLengths.START_OF_RECORD_L +
              FullS5ByteLengths.RECORD_TYPE_L +
              FullS5ByteLengths.DATA_LENGTH_L;

            address = readSubstringAndCastAsNumber(
              S19File,
              addressIndex,
              FullS5ByteLengths.ADDRESS_L,
              16
            );

            /* Data */

            dataIndex =
              i +
              FullS5ByteLengths.START_OF_RECORD_L +
              FullS5ByteLengths.RECORD_TYPE_L +
              FullS5ByteLengths.DATA_LENGTH_L +
              FullS5ByteLengths.ADDRESS_L;

            const dataString = readSubstring(
              S19File,
              dataIndex,
              2 * dataLength -
                FullS5ByteLengths.CHECKSUM_L -
                FullS5ByteLengths.ADDRESS_L
            );
            data = parseHexString(dataString);

            /* Checksum */
            checksumIndex =
              i +
              FullS5ByteLengths.START_OF_RECORD_L +
              FullS5ByteLengths.RECORD_TYPE_L +
              FullS5ByteLengths.DATA_LENGTH_L +
              FullS5ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS5ByteLengths.CHECKSUM_L -
                FullS5ByteLengths.ADDRESS_L);

            checksum = readSubstringAndCastAsNumber(
              S19File,
              checksumIndex,
              FullS5ByteLengths.CHECKSUM_L,
              16
            );

            checksumPacketEndIndex = checksumIndex;

            /* Full Record Length */
            fullRecordLength =
              FullS5ByteLengths.START_OF_RECORD_L +
              FullS5ByteLengths.RECORD_TYPE_L +
              FullS5ByteLengths.DATA_LENGTH_L +
              FullS5ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS5ByteLengths.CHECKSUM_L -
                FullS5ByteLengths.ADDRESS_L) +
              FullS5ByteLengths.CHECKSUM_L;

            i += fullRecordLength;

            logLevel > LogLevel.NONE &&
              console.log("\nRecord Type: S5 (Full Type)");
            logLevel > LogLevel.NONE &&
              console.log("Data Length:", dataLength, dataLength.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("    Address:", address, address.toString(16));
            logLevel > LogLevel.NONE && console.log("       Data:", data);
            logLevel > LogLevel.NONE &&
              console.log("   Checksum:", checksum, checksum.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("Full Length:", fullRecordLength);
            nS5++;
            break;
          }
          case "7".charCodeAt(0): {
            sRecordType = FullSRecordMarker.S7_RECORD_TYPE;
            dataLength = 0;

            dataLengthIndex =
                i +
                    FullS7ByteLengths.START_OF_RECORD_L +
                    FullS7ByteLengths.RECORD_TYPE_L;
            dataLength = readSubstringAndCastAsNumber(S19File, dataLengthIndex, FullS7ByteLengths.DATA_LENGTH_L, 16);
            checksumPacketStartIndex = dataLengthIndex;

            /* Address */
            addressIndex =
                i +
                    FullS7ByteLengths.START_OF_RECORD_L +
                    FullS7ByteLengths.RECORD_TYPE_L +
                    FullS7ByteLengths.DATA_LENGTH_L;
            address = readSubstringAndCastAsNumber(S19File, addressIndex, FullS7ByteLengths.ADDRESS_L, 16);

            data = parseHexString("");

            checksumIndex =
                i +
                    FullS7ByteLengths.START_OF_RECORD_L +
                    FullS7ByteLengths.RECORD_TYPE_L +
                    FullS7ByteLengths.DATA_LENGTH_L +
                    FullS7ByteLengths.ADDRESS_L ;
            checksum = readSubstringAndCastAsNumber(S19File, checksumIndex, FullS7ByteLengths.CHECKSUM_L, 16);

            checksumPacketEndIndex = checksumIndex;

            fullRecordLength =
            FullS7ByteLengths.START_OF_RECORD_L +
                FullS7ByteLengths.RECORD_TYPE_L +
                FullS7ByteLengths.DATA_LENGTH_L +
                FullS7ByteLengths.ADDRESS_L +
                FullS7ByteLengths.CHECKSUM_L;

            nS7++;
            break;
          }
          case "9".charCodeAt(0): {
            sRecordType = FullSRecordMarker.S9_RECORD_TYPE;

            /* Data Length */
            dataLengthIndex =
              i +
              FullS9ByteLengths.START_OF_RECORD_L +
              FullS9ByteLengths.RECORD_TYPE_L;

            dataLength = readSubstringAndCastAsNumber(
              S19File,
              dataLengthIndex,
              FullS9ByteLengths.DATA_LENGTH_L,
              16
            );

            checksumPacketStartIndex = dataLengthIndex;

            /* Address */
            addressIndex =
              i +
              FullS9ByteLengths.START_OF_RECORD_L +
              FullS9ByteLengths.RECORD_TYPE_L +
              FullS9ByteLengths.DATA_LENGTH_L;

            address = readSubstringAndCastAsNumber(
              S19File,
              addressIndex,
              FullS9ByteLengths.ADDRESS_L,
              16
            );

            /* Data */

            dataIndex =
              i +
              FullS9ByteLengths.START_OF_RECORD_L +
              FullS9ByteLengths.RECORD_TYPE_L +
              FullS9ByteLengths.DATA_LENGTH_L +
              FullS9ByteLengths.ADDRESS_L;

            const dataString = readSubstring(
              S19File,
              dataIndex,
              2 * dataLength -
                FullS9ByteLengths.CHECKSUM_L -
                FullS9ByteLengths.ADDRESS_L
            );
            data = parseHexString(dataString);

            /* Checksum */
            checksumIndex =
              i +
              FullS9ByteLengths.START_OF_RECORD_L +
              FullS9ByteLengths.RECORD_TYPE_L +
              FullS9ByteLengths.DATA_LENGTH_L +
              FullS9ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS9ByteLengths.CHECKSUM_L -
                FullS9ByteLengths.ADDRESS_L);

            checksum = readSubstringAndCastAsNumber(
              S19File,
              checksumIndex,
              FullS9ByteLengths.CHECKSUM_L,
              16
            );

            checksumPacketEndIndex = checksumIndex;

            /* Full Record Length */
            fullRecordLength =
              FullS9ByteLengths.START_OF_RECORD_L +
              FullS9ByteLengths.RECORD_TYPE_L +
              FullS9ByteLengths.DATA_LENGTH_L +
              FullS9ByteLengths.ADDRESS_L +
              (2 * dataLength -
                FullS9ByteLengths.CHECKSUM_L -
                FullS9ByteLengths.ADDRESS_L) +
              FullS9ByteLengths.CHECKSUM_L;

            i += fullRecordLength;

            logLevel > LogLevel.NONE &&
              console.log("\nRecord Type: S9 (Full Type)");
            logLevel > LogLevel.NONE &&
              console.log("Data Length:", dataLength, dataLength.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("    Address:", address, address.toString(16));
            logLevel > LogLevel.NONE && console.log("       Data:", data);
            logLevel > LogLevel.NONE &&
              console.log("   Checksum:", checksum, checksum.toString(16));
            logLevel > LogLevel.NONE &&
              console.log("Full Length:", fullRecordLength);
            nS9++;
            break;
          }
          default: {
            throw new Error("Invalid record type: " + currentByte + nextByte);
          }
        }

        calculatedChecksum = calculateChecksum(
          parseHexString(
            S19File.substring(checksumPacketStartIndex, checksumPacketEndIndex)
          ),
          logLevel
        );

        if (checksum === calculatedChecksum) {
          logLevel > LogLevel.NONE && console.log("Checksum valid");
          logLevel > LogLevel.NONE &&
            console.log("----------------------------");
          SRecords.push({
            sRecordType,
            address,
            data,
            dataLength: data.length,
            checksum,
          });
        } else {
          throw new Error(`Checksum mismatch at addreess ${address}`);
        }
      }

      i++;
    } else {
      i += 2;
    }
  }

  logLevel > LogLevel.NONE && console.log("# Processing completed: ");
  logLevel > LogLevel.NONE && console.log("\b## Full S-Records:");
  logLevel > LogLevel.NONE && console.log(`S0 Records = ${nS0}`);
  logLevel > LogLevel.NONE && console.log(`S1 Records = ${nS1}`);
  logLevel > LogLevel.NONE && console.log(`S2 Records = ${nS2}`);
  logLevel > LogLevel.NONE && console.log(`S3 Records = ${nS3}`);
  logLevel > LogLevel.NONE && console.log(`S5 Records = ${nS5}`);
  logLevel > LogLevel.NONE && console.log(`S7 Records = ${nS7}`);
  logLevel > LogLevel.NONE && console.log(`S9 Records = ${nS9}`);

  let totalDataSize = 0;
  SRecords.forEach(
    (srec: FullSRecordReferenceStructure) => (totalDataSize += srec.dataLength)
  );
  logLevel > LogLevel.NONE && console.log("Total Data Size", totalDataSize);

  return {
    success: true,
    responseCode: ResponseCodes.SUCCESS,
    errors: null,
    message: "S19 file parsed successfully",
    payload: {
      totalFullSRecords: nS0 + nS1 + nS2 + nS3 + nS7 + nS9,
      totalCompactSRecords: null,
      sRecords: SRecords,
      totalDataSize,
    },
  };
};
