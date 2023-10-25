// import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux';
// import { combineEpics, createEpicMiddleware } from 'redux-observable';
//
// import { authReducer, pagesReducers, uiReducers } from '@/reducers';
// import { AnyAction } from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';
//
// export type AppState = ReturnType<typeof reducers>;
//
// const reducers = combineReducers({
//   pages: pagesReducers,
//   ui: uiReducers,
//   auths: authReducer,
// });
// const rootEpic = combineEpics(siteEpic, commonAsyncEpics);
//
// const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();
//
// const middleware: [Middleware] = [epicMiddleware];
//
// if (import.meta.env.DEV) {
//   middleware.push(createLogger({ collapsed: true }));
// }
//
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
// const configureStore = (initialState = {}) => {
//   const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);
//   const createdStore = createStoreWithMiddleware(reducers, initialState);
//   epicMiddleware.run(rootEpic);
//   return createdStore;
// };
//
// const store = configureStore();
//
// export { store };
