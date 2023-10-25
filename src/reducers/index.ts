import { combineReducers } from 'redux';
import { loadingModule } from './ui';
import { authModule } from './auth';

const pages = {};

const ui = {
  loading: loadingModule.reducer,
};

export const uiReducers = combineReducers(ui);

export const pagesReducers = combineReducers(pages);

export const authReducer = authModule.reducer;
