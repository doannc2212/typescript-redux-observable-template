import { TRequestSignIn, TRequestSignUp } from '@/types/auth';
import { createAction } from '@reduxjs/toolkit';

const _ca = <T = unknown>(name: string) => createAction<T>(`[auth]${name}`);

export const authActions = {
  postSignIn: _ca<TRequestSignIn>('postSignIn'),
  postSignUp: _ca<TRequestSignUp>('postSignUp'),
};
