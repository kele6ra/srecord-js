import { LogLevel } from "../types";

export const calculateChecksum = (
  buffer: Buffer,
  logLevel: LogLevel = LogLevel.NONE
) => {
  logLevel &&
    logLevel > LogLevel.NONE &&
    console.log(
      `Calculate Checksum START -----------------------------------------`
    );
  logLevel &&
    logLevel > LogLevel.NONE &&
    console.log(`-| Buffer length: ${buffer.length}`);

  let sum = 0;
  buffer &&
    buffer.length > 0 &&
    buffer.forEach((b: number) => {
      logLevel && logLevel > LogLevel.NONE && console.log(`     ${sum} + ${b}`);
      sum += b;
    });

  logLevel && logLevel > LogLevel.NONE && console.log(`-| Sum: ${sum}`);
  logLevel &&
    logLevel > LogLevel.NONE &&
    console.log(`-| Returning: ${(sum ^ 0xff) & 0xff}`);
  logLevel &&
    logLevel > LogLevel.NONE &&
    console.log(
      `Calculate Checksum END   -----------------------------------------`
    );
  return (sum ^ 0xff) & 0xff;
};
