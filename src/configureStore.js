// @flow

import {loadState, saveState} from './localStorage.js';
import throttle from 'lodash/throttle';
import { createStore , combineReducers} from 'redux'
import type {S_Todo,State$TodoMap,State$App,StoreType } from './types/state_types.js';
import todoApp  from './reducers/reducers.js'
const addLoggingToDispatch = (store)=>{
  const rawDispatch=store.dispatch;
  return (action)=>{
    console.group(action.type);
    console.log('%c prev state','color: gray', store.getState());
    console.log('%c action','color: blue',action);
    const returnValue=rawDispatch(action);
    console.log('%c next state','color: green',store.getState());
    console.groupEnd();
    return returnValue;
  };

};

const configureStore = () =>{
  const persistedState   = loadState();
  const s:StoreType =  createStore (todoApp, persistedState);
  s.subscribe(throttle (()=>{saveState({todos: s.getState().todos});},1000));
  console.log(s.getState());
  s.dispatch=addLoggingToDispatch(s);
  return s;
};
export default configureStore;
