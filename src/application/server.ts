import { AxiosRequestConfigWithFns } from '@/lib/helpers/network';
import { API_REQUEST_TIMEOUT } from '@/lib/lookup/constant/common';

const getBaseUrl = (): string => {
  const stage = import.meta.env.MODE;
  switch (stage) {
    case 'development':
      return 'http://localhost:4000/api';
    case 'staging':
      return 'https://example.com/api';
    case 'production':
      return 'https://example.com/api';
    default:
      return 'http://localhost:4000/api';
  }
};

export const ApiServerConfig: AxiosRequestConfigWithFns = {
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
  timeout: API_REQUEST_TIMEOUT,
  getToken: () => {
    // todo set reset token
    return '';
  },
};
