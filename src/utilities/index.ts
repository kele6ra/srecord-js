export const readSubstringAndCastAsNumber = (
  data: string,
  start: number,
  dataLength: number,
  radix: number
): number => parseInt(data.substring(start, start + dataLength), radix);

export const readSubstring = (
  data: string,
  start: number,
  dataLength: number
): string => data.substring(start, start + dataLength);

export const parseHexString = (hex: string): Buffer => {
  const result: number[] = [];
  while (hex.length >= 2) {
    result.push(parseInt(hex.substring(0, 2), 16));
    hex = hex.substring(2, hex.length);
  }

  const buf = Buffer.alloc(result.length);
  result.forEach((b, i) => buf.writeUInt8(b, i));

  return buf;
};

export const decToHex = (dec: number): string => {
  const hex = dec.toString(16).toUpperCase();
  return hex.length % 2 ? hex.padStart(hex.length + 1, "0") : hex;
};
