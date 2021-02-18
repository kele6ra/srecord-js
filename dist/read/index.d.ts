import { LogLevel, FullSRecordReferenceStructure, ResponseCodes } from "../types/";
export declare const readS19: (s19Data: string, s19DataLength: number, logLevel?: LogLevel) => {
    success: boolean;
    responseCode: ResponseCodes;
    errors: null;
    message: string;
    payload: {
        totalFullSRecords: number;
        totalCompactSRecords: null;
        sRecords: FullSRecordReferenceStructure[];
        totalDataSize: number;
    };
};
//# sourceMappingURL=index.d.ts.map