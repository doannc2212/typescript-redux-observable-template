/* eslint-disable */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { MAX_RETRY } from '../lookup/common';
import IndexedObject, { ApiResponse } from '../types';
import { is400Error } from './error';
import { createUUID } from './uuid';
import Inventory from './inventory';

export type AxiosRequestCustomConfig<T = unknown> = T & {
  url: string;
  removeAuth?: boolean;
  getToken?: () => string;
};

export type AxiosRequestParameter<T> = T & {
  headers?: [string, string][];
};

export type RequestParameter = {
  pathParameters?: IndexedObject;
  data?: IndexedObject;
  queryParameters?: IndexedObject;
};

const replacePathParams = (path: string, params: IndexedObject<string>): string =>
  path.replace(/:([^/]+)/g, (_, p1) => encodeURIComponent(params[p1] ? params[p1] : ''));

export const createClient = (config: AxiosRequestConfig, needRetry: boolean = false) => {
  const client = axios.create(config);
  if (needRetry) {
    axiosRetry(client, {
      retries: MAX_RETRY,
      retryDelay: (retryCount) => retryCount * 1000,
      retryCondition: (_: AxiosError<any, any>) => true,
    });
  }
  return client;
};

const errorHandler = (err: AxiosError<unknown, unknown>): Promise<ApiResponse> => {
  const statusCode = err.status;
  const response: ApiResponse = {
    status: statusCode,
    ...(err.response?.data as ApiResponse | undefined),
  };

  const code = response?.error?.code;
  // send error to client, does not show up sorry page
  if (!!code && is400Error(Number(statusCode), code)) {
    return Promise.resolve<ApiResponse>(response);
  }
  // for <ErrorBoundary />
  throw response;
};

type RequestDispatcher = (params: AxiosRequestParameter<RequestParameter>) => Promise<ApiResponse>;
// type RequestSetup = (config: AxiosRequestCustomConfig) => RequestCaller;
type SupportedMethod = keyof Pick<AxiosInstance, 'get' | 'post' | 'put' | 'patch' | 'delete'>;

export class ApiClient {
  _axiosInstance: AxiosInstance;
  _tokenInventory: Inventory<string>;
  constructor(axios: AxiosInstance = createClient({ url: import.meta.env.VITE_HOST_URL })) {
    this._axiosInstance = axios;
    this._axiosInstance.interceptors.response.use(
      (response) => ({
        ...response.data,
        status: response.status,
      }),
      errorHandler,
    );
    this._tokenInventory = new Inventory<string>(createUUID());
  }
  async _doRequest(
    config: AxiosRequestCustomConfig,
    params: AxiosRequestParameter<RequestParameter>,
    method: SupportedMethod,
  ): Promise<ApiResponse> {
    const { url, removeAuth } = config;
    const { pathParameters = {}, data: body, queryParameters } = params;
    const token = config.getToken?.() || this._tokenInventory.get();
    const response = await this._axiosInstance[method](
      replacePathParams(url, pathParameters),
      body,
      {
        headers: {
          Authorization: !removeAuth ? `Bearer ${token}` : undefined,
        },
        params: queryParameters,
      },
    );
    return response.data;
  }

  get(config: AxiosRequestCustomConfig): RequestDispatcher {
    return (params: AxiosRequestParameter<RequestParameter>) =>
      this._doRequest(config, params, 'get');
  }

  post(config: AxiosRequestCustomConfig): RequestDispatcher {
    return (params: AxiosRequestParameter<RequestParameter>) =>
      this._doRequest(config, params, 'post');
  }

  put(config: AxiosRequestCustomConfig): RequestDispatcher {
    return (params: AxiosRequestParameter<RequestParameter>) =>
      this._doRequest(config, params, 'put');
  }

  patch(config: AxiosRequestCustomConfig): RequestDispatcher {
    return (params: AxiosRequestParameter<RequestParameter>) =>
      this._doRequest(config, params, 'patch');
  }

  delete(config: AxiosRequestCustomConfig): RequestDispatcher {
    return (params: AxiosRequestParameter<RequestParameter>) =>
      this._doRequest(config, params, 'delete');
  }

  setSession(token: string): void {
    this._tokenInventory.set(token);
    this._axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  clearSession(): void {
    this._tokenInventory.remove();
    delete this._axiosInstance.defaults.headers.common.Authorization;
  }
}
