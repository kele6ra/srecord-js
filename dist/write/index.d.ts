/// <reference types="node" />
import { LogLevel, StandardisedResponse } from "../types/";
/**
 *
 * @param dataBuffer - the input data buffer
 * @param recordDataLength - how long is the data
 * @param includeS5Record - set to 'true' if you want an S5 summary record (sum of S1+2+3 records)
 * @param headerData - string value to be included with the S0 record as the data (used by select vendors)
 * @param logLevel - LogLevel value (0=NONE)
 */
export declare const writeS19: (dataBuffer: Buffer, recordDataLength: number, includeS5Record: boolean, headerData?: string, logLevel?: LogLevel) => StandardisedResponse;
//# sourceMappingURL=index.d.ts.map