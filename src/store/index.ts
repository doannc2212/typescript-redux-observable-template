import { authReducer, pagesReducers, uiReducers } from '@/reducers';
import { rootSaga } from '@/saga';
import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  pages: pagesReducers,
  ui: uiReducers,
  auth: authReducer,
});

export type AppState = ReturnType<typeof reducers>;

const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export default store;
