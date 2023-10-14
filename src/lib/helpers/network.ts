/* eslint-disable */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { omit } from 'lodash';
import { MAX_RETRY } from '../lookup/constant/common';
import { createUUID } from '../utils/uuid';
import { is400Error, isServerErrorNeedRetry } from '../utils/error';
import IndexedObject, { TError } from '../types';

type ConfigFns = {
  getToken?: () => string | undefined;
};

export type AxiosRequestConfigWithFns = AxiosRequestConfig & ConfigFns;

const initialConfigFns: Required<ConfigFns> = {
  getToken: () => '',
};

export const retryWrapper = (config: AxiosRequestConfig) => {
  const client = axios.create(config);
  axiosRetry(client, {
    retries: MAX_RETRY, // number of retries
    retryDelay: (retryCount) => {
      return 1 * retryCount * 1000;
    },
    retryCondition: (error: AxiosError<any, any>) => {
      const statusCode = error.response?.data?.status;
      const retryable = error.response?.data?.retryable != 0;
      // if retry condition is not specified, by default idempotent requests are retried
      return isServerErrorNeedRetry(statusCode, retryable);
    },
  });

  return client;
};

const pickAxiosRequestConfig = (config: AxiosRequestConfigWithFns): AxiosRequestConfig =>
  omit(config, Object.keys(initialConfigFns));

const getConfigFn = (key: keyof ConfigFns) => (config: AxiosRequestConfigWithFns) =>
  config[key] || initialConfigFns[key];
const replacePathParams = (path: string, params: IndexedObject<string>): string =>
  path.replace(/:([^/]+)/g, (_, p1) => encodeURIComponent(params[p1] ? params[p1] : ''));

const toHeaders = (headers: [string, string][] = []): IndexedObject<string> =>
  headers.reduce((data, [key, value]) => ({ ...data, [key]: value }), {} as IndexedObject<string>);

const errorHandler = (err: AxiosError<any, any>): Promise<{ result: boolean; data: any }> => {
  const statusCode = err.response?.data?.status;
  const code = err.response?.data?.code;
  if (is400Error(Number(statusCode), code)) {
    return Promise.resolve({ result: false, data: err.response?.data });
  }
  throw {
    status: statusCode,
    code,
    message: err.response?.data?.message,
    data: err.response?.data?.data,
    validation: err.response?.data?.validation,
    error: err.response?.data?.error,
  };
};

export type AxiosRequestCustomConfig = {
  url: string;
  removeAuth?: boolean;
};

export type AxiosRequestParameter<T> = T & {
  headers?: [string, string][];
};

export type RequestParameter = {
  data?: IndexedObject;
  pathParameters?: IndexedObject;
};

export type AxiosResponse = {
  result: boolean;
  data: IndexedObject;
  status?: number;
};

const customHeaders = (commonConfig: AxiosRequestConfigWithFns): [string, string][] => {
  const headersMap: [string, string][] = [];
  headersMap.push(['request_id', createUUID()]);
  return headersMap;
};

const postFn =
  (commonConfig: AxiosRequestConfigWithFns) =>
  (customConfig: AxiosRequestCustomConfig) =>
  async (params: AxiosRequestParameter<RequestParameter>): Promise<AxiosResponse | TError> => {
    const client = retryWrapper(pickAxiosRequestConfig(commonConfig));
    return client
      .post(replacePathParams(customConfig.url, params.pathParameters ?? {}), params.data, {
        headers: {
          ...toHeaders(customHeaders(commonConfig)),
          ...toHeaders(params.headers),
        },
      })
      .then(({ data }) => {
        return { result: true, data };
      })
      .catch(errorHandler);
  };

const getFn =
  (commonConfig: AxiosRequestConfigWithFns) =>
  (customConfig: AxiosRequestCustomConfig) =>
  async (params: AxiosRequestParameter<RequestParameter>): Promise<AxiosResponse | TError> => {
    const client = retryWrapper(pickAxiosRequestConfig(commonConfig));
    return client
      .get(replacePathParams(customConfig.url, params.pathParameters ?? {}), {
        headers: {
          ...toHeaders(customHeaders(commonConfig)),
          ...toHeaders(params.headers),
        },
        params: {
          ...params?.data,
        },
      })
      .then(({ data }) => {
        return { result: true, data };
      })
      .catch(errorHandler);
  };

const putFn =
  (commonConfig: AxiosRequestConfigWithFns) =>
  (customConfig: AxiosRequestCustomConfig) =>
  async (params: AxiosRequestParameter<RequestParameter>): Promise<AxiosResponse | TError> => {
    const client = retryWrapper(pickAxiosRequestConfig(commonConfig));
    return client
      .put(replacePathParams(customConfig.url, params.pathParameters ?? {}), params?.data, {
        headers: {
          ...toHeaders(customHeaders(commonConfig)),
          ...toHeaders(params.headers),
        },
      })
      .then(({ data }) => {
        return { result: true, data };
      })
      .catch(errorHandler);
  };

const deleteFn =
  (commonConfig: AxiosRequestConfigWithFns) =>
  (customConfig: AxiosRequestCustomConfig) =>
  async (params: AxiosRequestParameter<RequestParameter>): Promise<AxiosResponse | TError> => {
    const client = retryWrapper(pickAxiosRequestConfig(commonConfig));
    return client
      .delete(replacePathParams(customConfig.url, params.pathParameters ?? {}), {
        headers: {
          ...toHeaders(customHeaders(commonConfig)),
          ...toHeaders(params.headers),
        },
        params: {
          ...params?.data,
        },
      })
      .then(({ data }) => {
        return { result: true, data };
      })
      .catch(errorHandler);
  };

const patchFn =
  (commonConfig: AxiosRequestConfigWithFns) =>
  (customConfig: AxiosRequestCustomConfig) =>
  async (params: AxiosRequestParameter<RequestParameter>): Promise<AxiosResponse | TError> => {
    const client = retryWrapper(pickAxiosRequestConfig(commonConfig));
    return client
      .patch(replacePathParams(customConfig.url, params.pathParameters ?? {}), params?.data, {
        headers: {
          ...toHeaders(customHeaders(commonConfig)),
          ...toHeaders(params.headers),
        },
      })
      .then(({ data }) => {
        return { result: true, data };
      })
      .catch(errorHandler);
  };

const putUploadFn =
  (commonConfig: AxiosRequestConfigWithFns) =>
  (customConfig: AxiosRequestCustomConfig) =>
  async (params: AxiosRequestParameter<RequestParameter>): Promise<AxiosResponse | TError> => {
    const client = retryWrapper(pickAxiosRequestConfig(commonConfig));
    return client
      .put(customConfig.url, params?.data, {
        headers: {
          ...toHeaders(customHeaders(commonConfig)),
          ...toHeaders(params.headers),
        },
      })
      .then(({ data, status }) => {
        return { result: true, data, status };
      })
      .catch(errorHandler);
  };

export const ApiClient = (config: AxiosRequestConfigWithFns) => ({
  postFn: postFn(config),
  getFn: getFn(config),
  putFn: putFn(config),
  deleteFn: deleteFn(config),
  patchFn: patchFn(config),
  putUploadFn: putUploadFn(config),
});
