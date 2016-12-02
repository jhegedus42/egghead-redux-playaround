// @flow
import type { Action$App} from '../types/action_types.js';
import type { State$Todo , State$TodoList, State$Filter} from '../types/state_types'
var _ = require('lodash')
class Todo {
  static make(t:string,id:number):State$Todo{
    return {text:t,id:id,completed:false}
  }
  static toggle(t:State$Todo):State$Todo {
    return {...t, completed:!t.completed};
  }
};

const todosReducer = (state: State$TodoList=[], action: Action$App) :State$TodoList=>{ //reducer
      switch (action.type){
        case 'ADD_TODO' : return [ ... state, Todo.make(action.text, action.id)];
        case 'TOGGLE_TODO':
          const id=action.id;
          return  _.map(state, (td) => (td.id==id) ? Todo.toggle(td) : td );
        default : return state;
      }
};



export const getVisibleTodos  = (state:State$TodoList, filter:State$Filter) : State$TodoList => { // selector
  switch (filter) {
    case ('all' ):
      return state;
    case ('completed'):
      return state.filter(
        t => t.completed
      );
    case ('active'):
      return state.filter(
        t => !t.completed
      );
    default:
      throw "undefined action"
  }
}

export default todosReducer;
