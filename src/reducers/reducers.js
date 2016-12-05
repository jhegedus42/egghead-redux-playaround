// @flow

import type { A_TODO} from '../types/action_types.js';

import type {State$Root, State$Filter } from '../types/state_types.js';
import todosReducer, * as fromTodos from './todos'
const initState={todos:{
                        byId:{
                        },
                        idsByFilter:{
                          all:[],
                          active:[],
                          completed:[]
                        }
                       }
                }
const todoApp = (state : State$Root = initState, action: A_TODO) : State$Root => {
  return { todos: todosReducer(state.todos, action)};
}
export default todoApp;

export const getVisibleTodos = (state:State$Root, filter:State$Filter) =>
  fromTodos.getVisibleTodos(state.todos,filter);
