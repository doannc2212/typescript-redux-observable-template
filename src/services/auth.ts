import { authenticationRepository } from '@/repositories/authenticationRepository';
import { TServiceFunction } from '@shared/types';
import { TRequestSignIn, TRequestSignUp, TResponseSignIn, TResponseSignUp } from '@/types/auth';

const postSignIn: TServiceFunction<TRequestSignIn, TResponseSignIn> = async ({
  username,
  password,
}) => {
  const response = await authenticationRepository.postSignIn({
    data: { username, password },
  });
  if (!!response.error) {
    // validation subprocess
    return {
      error: response.error,
      data: null,
    };
  }
  return {
    error: null,
    data: response.data,
  };
};

const postSignUp: TServiceFunction<TRequestSignUp, TResponseSignUp> = async (data) => {
  const response = await authenticationRepository.postSignUp({
    data,
  });
  if (!!response.error) {
    // validation subprocess
    return {
      error: response.error,
      data: null,
    };
  }
  return {
    error: null,
    data: response.data,
    warning: response.message,
  };
};
export const authenticationService = {
  postSignIn,
  postSignUp,
};
