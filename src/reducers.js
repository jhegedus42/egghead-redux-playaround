// @flow

import type { Action$App, Action$SetVisibilityFilter,Action$ADD_TODO, Action$TOGGLE_TODO}
   from './action_types.js';

import type {State$Todo,State$TodoList,State$App,State$VisibilityFilter,StoreType }
   from './state_types.js';

var _ = require('lodash')

class Todo {
  static make(t:string,id:number):State$Todo{
    return {text:t,id:id,completed:false}
  }
  static toggle(t:State$Todo):State$Todo {
    return {...t, completed:!t.completed};
  }
};

const todosReducer = (state: State$TodoList=[], action: Action$App) :State$TodoList=>{
      switch (action.type){
        case 'ADD_TODO' : return [ ... state, Todo.make(action.text, action.id)];
        case 'TOGGLE_TODO':
          const id=action.id;
          return  _.map(state, (td) => (td.id==id) ? Todo.toggle(td) : td );
        default : return state;
      }
};


const visibilityFilterReducer = (state:State$VisibilityFilter = 'SHOW_ALL', action:Action$App) : State$VisibilityFilter =>  {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default : return state;
  }
}

export const todoApp = (state : State$App = {todos:[],visibilityFilter:'SHOW_ALL'}, action: Action$App) : State$App => {
  return { todos: todosReducer(state.todos, action), visibilityFilter: visibilityFilterReducer(state.visibilityFilter,action) };
}
