// @flow

import throttle from 'lodash/throttle';
import { createStore , combineReducers} from 'redux'
import type {S_Todo,State$TodoMap,State$App,StoreType } from './types/state_types.js';
import todoApp  from './reducers/reducers.js'

//type hof = <I1, O1, I2, O2> (fn: (t1: I1) => O1) => ((t1: I2) => O2);

//type ty_MiddleWare = (store:StoreType) => hof;

const logger = (store) => (next)=>(action)=>{
  console.group(action.type);
  console.log('%c prev state','color: gray', store.getState());
  console.log('%c action','color: blue',action);
  const returnValue=next(action);
  console.log('%c next state','color: green',store.getState());
  console.groupEnd();
  return returnValue;

};


const promise = (store) => (next)=> (action) :any => {
  if (typeof action.then === 'function') {
    return action.then(next);
  };
  return next(action);
};

const wrapDispatchWithMiddleWares = (store:StoreType, middlewares)=>{
  middlewares.slice().reverse().forEach(middleware=>{
        const next=store.dispatch;
        store.dispatch=middleware(store)(next);
      }
    );
};

const configureStore = () =>{
  const store:StoreType =  createStore (todoApp);
  const middlewares=[promise,logger];
  wrapDispatchWithMiddleWares(store, middlewares);
  return store;
};
export default configureStore;
