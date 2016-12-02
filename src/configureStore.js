// @flow

import {loadState, saveState} from './localStorage.js';
import throttle from 'lodash/throttle';
import { createStore , combineReducers} from 'redux'
import type {State$Todo,State$TodoList,State$App,StoreType }
   from './state_types.js';
import {todoApp}  from './reducers.js'
const configureStore = () =>{
  const persistedState   = loadState();
  const s:StoreType =  createStore (todoApp, persistedState);
  s.subscribe(throttle (()=>{saveState({todos: s.getState().todos});},1000));
  console.log(s.getState())
  return s;
};
export default configureStore;
