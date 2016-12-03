// @flow
import type {  State$TodoMap, State$Filter} from '../types/state_types'
import {S_Todo,TodoID} from '../types/state_types'
import {mk_A_ADD_TODO,mk_A_TOGGLE_TODO} from '../types/action_types'
import type {A_TODO} from '../types/action_types'

const todos = (state: State$TodoMap={}, action: A_TODO) :State$TodoMap=>{ //reducer
      if (action.type === 'ADD_TODO'){
        const todo=S_Todo.addTodo(action.text);
        return { ... state, [todo.todoId.id] : todo};
      }
      if (action.type=== 'TOGGLE_TODO'){
          const id=action.todoId.id;
          const todo=state[id];
          return { ... state, [todo.todoId.id] : S_Todo.toggle(todo)};
      }
      return state;
};

export const getVisibleTodos  = (state:State$TodoMap, filter:State$Filter) : S_Todo[] => { // selector
  const allTodos = Object.keys(state).map(k=>state[k]) ;
  switch (filter) {
    case ('all' ):
      return allTodos;
    case ('completed'):
      return allTodos.filter(
        t => t.completed
      );
    case ('active'):
      return allTodos.filter(
        t => !t.completed
      );
    default:
      throw "undefined action"
  }
}

export default todos;
