import { authActions } from '@/actions/auth';
import { authModule } from '@/reducers/auth';
import { authenticationService } from '@/services/auth';
import { TServiceResult } from '@/shared/types';
import { TRequestSignIn, TRequestSignUp, TResponseSignIn, TResponseSignUp } from '@/types/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

function* postSignIn(params: PayloadAction<TRequestSignIn>): SagaIterator {
  yield put(authModule.actions.startLoading());
  const response: TServiceResult<TResponseSignIn> = yield call(
    authenticationService.postSignIn,
    params.payload,
  );
  if (!!response.warning) window.alert(response.warning);
  yield put(authModule.actions.stopLoading());
  if (!!response.error) {
    // TODO: handle validation error
    yield put(authModule.actions.save(response));
  } else {
    yield put(authModule.actions.save(response));
    return response;
  }
}

function* postSignUp(params: PayloadAction<TRequestSignUp>): SagaIterator {
  yield put(authModule.actions.startLoading());
  const response: TServiceResult<TResponseSignUp> = yield call(
    authenticationService.postSignUp,
    params.payload,
  );
  if (!!response.warning) window.alert(response.warning);
  yield put(authModule.actions.stopLoading());
  if (!!response.error) {
    // TODO: handle validation error
    yield put(authModule.actions.save(response));
  } else {
    yield put(authModule.actions.save(response));
    return response;
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActions.postSignIn.type, postSignIn),
    takeLatest(authActions.postSignUp.type, postSignUp),
  ]);
}
