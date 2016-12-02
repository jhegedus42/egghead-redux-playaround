
// @flow
// states
import type { Store } from 'redux';
import type { Action$App, Action$SetVisibilityFilter,Action$ADD_TODO, Action$TOGGLE_TODO} from './action_types.js';

export type State$Todo = {
  text:string;
  completed:boolean;
  id:number;
};

export type State$TodoList = State$Todo[];

export type State$App = {
  todos:State$TodoList
}

export type StoreType=Store <State$App, Action$App>
