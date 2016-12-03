// @flow

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


const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch);
    };
    return rawDispatch;
  };
};


const configureStore = () =>{
  const s:StoreType =  createStore (todoApp);
  console.log(s.getState());
  s.dispatch=addLoggingToDispatch(s);
  s.dispatch=addPromiseSupportToDispatch(s);
  return s;
};
export default configureStore;
