import { TRequestSignIn, TRequestSignUp } from '@/types/auth';
import { createAction } from '@reduxjs/toolkit';

const _createAction = <T = unknown>(value: string) => createAction<T>(`[auth]/${value}`);

const _actions = {
  postSignIn: _createAction<TRequestSignIn>('postSignIn'),
  postSignUp: _createAction<TRequestSignUp>('postSignUp'),
};

export const authActions = _actions;
