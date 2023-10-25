import { api } from '@/lib/helpers/api';
import { AxiosRequestCustomConfig, RequestParameter } from '@cmp/network';

const postSignIn: AxiosRequestCustomConfig<RequestParameter> = {
  url: '/auth/login',
};

const postSignUp: AxiosRequestCustomConfig = {
  url: '/auth/register',
};

export const authenticationRepository = {
  postSignIn: api.post(postSignIn),
  postSignUp: api.post(postSignUp),
};
