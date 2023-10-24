import httpStatusCode from '../lookup/constant/httpStatusCode';
export const is400Error = (statusCode: number, code: string | number): boolean =>
  httpStatusCode.BAD_REQUEST === statusCode &&
  ['101', '102', '103', '104', '107', '108'].includes(code.toString());
