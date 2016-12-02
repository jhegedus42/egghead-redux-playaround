// @flow

import type { Action$App} from '../types/action_types.js';

import type {State$App, State$Filter } from '../types/state_types.js';
import todosReducer, * as fromTodos from './todos'

const todoApp = (state : State$App = {todos:[]}, action: Action$App) : State$App => {
  return { todos: todosReducer(state.todos, action)};
}
export default todoApp;

export const getVisibleTodos = (state:State$App, filter:State$Filter) =>
  fromTodos.getVisibleTodos(state.todos,filter);
