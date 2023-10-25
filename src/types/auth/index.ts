import { Email, ID, Password, TServiceResult, Username } from '@shared/types';

export type TRequestSignIn = {
  username: Username;
  password: Password;
};

export type TResponseSignIn = {
  token: string;
  userId: ID;
  refreshToken: string;
};

export type TRequestSignUp = {
  username: Username;
  password: Password;
  email: Email;
};

export type TResponseSignUp = TResponseSignIn;

export type TAuthStatePayload = TServiceResult<TResponseSignIn> | TServiceResult<TResponseSignUp>;

export type TAuthState = {
  isLoading: boolean;
} & TServiceResult<TResponseSignIn> &
  TServiceResult<TResponseSignUp>;
