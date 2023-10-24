import { AxiosRequestConfigWithFns } from '@/lib/helpers/network';
import { API_REQUEST_TIMEOUT } from '@/lib/lookup/constant/common';

const getBaseUrl = (): string => {
  // https://vitejs.dev/guide/env-and-mode.html#env-files
  return import.meta.env.VITE_HOST_URL;
};

export const apiServerConfig: AxiosRequestConfigWithFns = {
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
  timeout: API_REQUEST_TIMEOUT,
  getToken: () => {
    const token = localStorage.getItem('token');
    return token;
  },
};
