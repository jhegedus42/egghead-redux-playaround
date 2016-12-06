// @flow

import { createStore , combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger';
import rootReducer from './reducers/root_Reducer.js'
import type {State_Root} from './reducers/root_Reducer.js'
import type {A_TODO} from './reducers/actions.js'
import type { Store } from 'redux';

export type StoreType=Store <State_Root, A_TODO>
const thunk = (store) => (next) => (action)=>
  typeof action === 'function' ?
  action(store.dispatch): next(action);

const configureStore = () =>{
  const middlewares=[thunk,createLogger()];
  return createStore (rootReducer,applyMiddleware(...middlewares));
};

export default configureStore;
