
// @flow
// states
import type { Store } from 'redux';
import type { Action$App, Action$SetVisibilityFilter,Action$ADD_TODO, Action$TOGGLE_TODO}
   from './action_types.js';

export type State$Todo = {
  text:string;
  completed:boolean;
  id:number;
};

export type State$TodoList = State$Todo[];

export type State$VisibilityFilter = 'SHOW_ACTIVE' | 'SHOW_ALL' | 'SHOW_COMPLETED'

export type State$App = {
  todos:State$TodoList,
  visibilityFilter:State$VisibilityFilter
}

export type StoreType=Store <State$App, Action$App>
