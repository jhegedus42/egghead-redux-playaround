
// @flow
// actions
import type {State$Todo,State$TodoList,State$App,StoreType }
   from './state_types.js';

export type Action$SetVisibilityFilter = {
     type:'SET_VISIBILITY_FILTER'
};

export type Action$ADD_TODO = {
  type:'ADD_TODO',
  text:string,
  id:number
};

export type Action$TOGGLE_TODO = { type:'TOGGLE_TODO', id:number }

export type Action$Todo = Action$ADD_TODO | Action$TOGGLE_TODO

export type Action$App = Action$Todo | Action$SetVisibilityFilter
