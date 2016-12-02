
// @flow
// action creators
import type { Action$App, Action$SetVisibilityFilter,Action$ADD_TODO, Action$TOGGLE_TODO}
   from './action_types.js';
import type {State$Todo,State$TodoList,State$App,State$VisibilityFilter,StoreType }
   from './state_types.js';
import {v4} from 'node-uuid';
let nextTodoId = 0;

export const addTodo=(textIn:string)=>({type:'ADD_TODO', id:v4(),text:textIn}:Action$ADD_TODO);

export const setVisibilityFilter = (filter:State$VisibilityFilter)=>(
  ( { type:'SET_VISIBILITY_FILTER', filter: filter }:Action$SetVisibilityFilter)
)

export const toggleTodo = (id:number)=>( { type: 'TOGGLE_TODO', id:id } : Action$TOGGLE_TODO);
