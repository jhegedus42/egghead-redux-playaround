
// @flow
// action creators
import type { Action$App, Action$SetVisibilityFilter,Action$ADD_TODO, Action$TOGGLE_TODO}
   from './types/action_types.js';
import type {State$Todo,State$TodoList,State$App,StoreType }
   from './types/state_types.js';
import {v4} from 'node-uuid';
let nextTodoId = 0;

export const addTodo=(textIn:string)=>({type:'ADD_TODO', id:v4(),text:textIn}:Action$ADD_TODO);

export const toggleTodo = (id:number)=>( { type: 'TOGGLE_TODO', id:id } : Action$TOGGLE_TODO);
