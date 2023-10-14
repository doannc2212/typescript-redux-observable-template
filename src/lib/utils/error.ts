import { AxiosError } from 'axios';
import httpStatusCode from '../lookup/constant/httpStatusCode';
import { badRequest } from '../lookup/constant/badRequest';
import { TError } from '../types';

export const sorryCode = [
  httpStatusCode.UNAUTHORIZED,
  httpStatusCode.FORBIDDEN,
  httpStatusCode.NOT_FOUND,
];

export const serverErrorCd = [
  httpStatusCode.INTERNAL_SERVER_ERROR,
  httpStatusCode.NOT_IMPLEMENTED,
  httpStatusCode.BAD_GATEWAY,
  httpStatusCode.SERVICE_UNAVAILABLE,
  httpStatusCode.GATEWAY_TIMEOUT,
  httpStatusCode.HTTP_VERSION_NOT_SUPPORTED,
  httpStatusCode.VARIANT_ALSO_NEGOTIATES,
  httpStatusCode.INSUFFICIENT_STORAGE,
  httpStatusCode.LOOP_DETECTED,
  httpStatusCode.NOT_EXTENDED,
  httpStatusCode.NETWORK_AUTHENTICATION_REQUIRED,
];
export const isResourceUnknownError = (statusCode: number, code: number): boolean =>
  httpStatusCode.BAD_REQUEST === statusCode && code === badRequest.RESOURCE_UNKNOWN;
export const isClientError = (statusCode: number): boolean => sorryCode.includes(statusCode);
export const isServerError = (statusCode: number): boolean => serverErrorCd.includes(statusCode);
export const isServerErrorNeedRetry = (statusCode: number, retryable: boolean): boolean =>
  isServerError(statusCode) && retryable;
export const isNetworkError = (err: AxiosError): boolean => !err.response?.status;
export const isPermissionError = (statusCode: number): boolean =>
  httpStatusCode.FORBIDDEN === statusCode;
export const isServiceUnavailable = (error: TError): boolean =>
  // eslint-disable-next-line eqeqeq
  httpStatusCode.SERVICE_UNAVAILABLE === error.status && error?.retryable == 0;
export const is404Error = (statusCode: number): boolean => httpStatusCode.NOT_FOUND === statusCode;
export const is400Error = (statusCode: number, code: string): boolean =>
  httpStatusCode.BAD_REQUEST === statusCode && ['101', '100001', '100002', '100003'].includes(code);
export const isInvalidPathParameter = (error: TError): boolean =>
  httpStatusCode.BAD_REQUEST === error.status && !!error?.code && ['100003'].includes(error?.code);
export const isConflictError = (error: TError): boolean =>
  httpStatusCode.CONFLICT === error.status && error.code === '102';
export const isSystemError = (error: TError): boolean =>
  httpStatusCode.BAD_REQUEST === error.status && error.code === '100001';
export const isHideAlertError = (statusCode: number, code: string): boolean =>
  httpStatusCode.BAD_REQUEST === statusCode && ['100002'].includes(code);
export const isValidationError = (statusCode: number, code: string): boolean =>
  httpStatusCode.BAD_REQUEST === statusCode && code === '101';

export const isTargetError = (target: string, error?: TError): boolean => {
  if (!error) {
    return false;
  }
  if (error?.code === '101') {
    const targetDetail = error?.validation?.find((v) => v?.target === target);
    return targetDetail !== undefined;
  }
  return (
    error?.validation?.[0]?.target !== undefined && error?.validation?.[0]?.target?.includes(target)
  );
};
