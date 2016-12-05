// @flow

import { createStore , combineReducers, applyMiddleware} from 'redux'
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from './reducers/root_Reducer.js'
import type {State_Root} from './reducers/root_Reducer.js'
import type {A_TODO} from './reducers/actions.js'
import type { Store } from 'redux';

export type StoreType=Store <State_Root, A_TODO>

const configureStore = () =>{
  const middlewares=[promise,createLogger()];
  return createStore (rootReducer,applyMiddleware(...middlewares));
};

export default configureStore;
