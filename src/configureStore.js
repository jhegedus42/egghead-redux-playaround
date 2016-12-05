// @flow

import throttle from 'lodash/throttle';
import { createStore , combineReducers, applyMiddleware} from 'redux'
import type {S_Todo,State$TodosByIDMap,State$Root,StoreType } from './types/state_types.js';
import rootReducer  from './reducers/todos.js'
import promise from 'redux-promise';
import createLogger from 'redux-logger';


const configureStore = () =>{
  const middlewares=[promise,createLogger()];
  return createStore (rootReducer,applyMiddleware(...middlewares));
};

export default configureStore;
