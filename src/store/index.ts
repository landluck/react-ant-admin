import { createStore, combineReducers, applyMiddleware, compose, Middleware, Reducer } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { IStoreState, IAction } from './types';
import userReducer from './module/user';
import appReducer from './module/app';
import settingsReducer from './module/settings';
import noticeReducer from './module/notice';

const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState>({
  user: userReducer,
  app: appReducer,
  settings: settingsReducer,
  notices: noticeReducer,
});

const middleware: Middleware[] = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(reduxLogger);
}

function createMyStore() {
  /* eslint-disable no-underscore-dangle */
  const store = window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
        reducers,
        compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({})),
      )
    : createStore(reducers, applyMiddleware(...middleware));

  return store;
}

const store = createMyStore();

export default store;
