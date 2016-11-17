// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , combineReducers} from 'redux'
import deepFreeze from 'deepfreeze'
import expect from 'expect'
var _ = require('lodash')

type State$Todo = {
  text:string;
  completed:boolean;
  id:number;
};

class Todo {
  static make(t:string,id:number):State$Todo{
    return {text:t,id:id,completed:false}
  }
  static toggle(t:State$Todo):State$Todo {
    return {...t, completed:!t.completed};
  }
};

type Action$VisibilityFilter = {
     type:'SET_VISIBILITY_FILTER',
     filter:State$VisibilityFilter
};

type Action$ADD_TODO = {
  type:'ADD_TODO',
  text:string,
  id:number
};

type Action$TOGGLE_TODO = { type:'TOGGLE_TODO', id:number }

type Action$Todo = Action$ADD_TODO | Action$TOGGLE_TODO

type Action$App = Action$Todo | Action$VisibilityFilter

type State$TodoList = State$Todo[];

type State$VisibilityFilter = 'all' | 'done' | 'notdone'

type State$App = {
  todos:State$TodoList,
  visibilityFilter:State$VisibilityFilter
}

const todosReducer = (state: State$TodoList=[], action: Action$App) :State$TodoList=>{
      switch (action.type){
        case 'ADD_TODO' : return [ ... state, Todo.make(action.text, action.id)];
        case 'TOGGLE_TODO':
          const id=action.id;
          return  _.map(state, (td) => (td.id==id) ? Todo.toggle(td) : td );
        default : return state;
      }
};

const visibilityFilterReducer = (state:State$VisibilityFilter = 'all', action:Action$App) : State$VisibilityFilter =>  {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default : return state;
  }
}

const todoApp = (state : State$App = {todos:[],visibilityFilter:'all'}, action: Action$App) : State$App => {
  return { todos: todosReducer(state.todos, action), visibilityFilter: visibilityFilterReducer(state.visibilityFilter,action) };
}

//const todoApp =combineReducers({todos:todosReducer, visibilityFilter:visibilityFilterReducer})

const testAddTodo = () => {
  const stateBefore = [];
  const action : Action$ADD_TODO = {
    type: 'ADD_TODO',
    id:0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id:0,
      text: 'Learn Redux',
      completed: false
    }

  ];

  deepFreeze(stateBefore);
  deepFreeze(action);
  expect( todosReducer(stateBefore, action )).toEqual(stateAfter) ;
}

const testToggleTodo = () => {
          const stateBefore = [
            {
              id:0,
              text:'Learn Redux',
              completed:false
            },
            {
              id:1,
              text:'Go tripping',
              completed:false
            }
          ];

          const action = {
            type:'TOGGLE_TODO',
            id:1
          };

          const stateAfter = [
            {
              id:0,
              text:'Learn Redux',
              completed:false
            },
            {
              id:1,
              text:'Go tripping',
              completed:true
            }
          ];
          deepFreeze(stateBefore);
          deepFreeze(action);
          expect(todosReducer(stateBefore,action)).toEqual(stateAfter)
}

const store  = createStore (todoApp)

store.dispatch(({
  type:'ADD_TODO',
  id:0,
  text:'Learn Redux'
}:Action$ADD_TODO));

console.log(store.getState());

store.dispatch(({
  type: 'TOGGLE_TODO',
  id:0
}:Action$TOGGLE_TODO ))

console.log(store.getState());

const a={bela:'42',eves:false}
console.log(a)
console.log({...a,eves:true})

testAddTodo();
testToggleTodo();
console.log('All  tests passed')


export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>Global bla bootstrap css import wo   rks too as you can see on the following button.</p>
      </div>
    )
  }
}

type FilterLinkProps={
  filter:State$VisibilityFilter,
  children:any
};

const FilterLink = ({
  filter,
  children
}:FilterLinkProps) => {
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch(({
          type: 'SET_VISIBILITY_FILTER',
          filter
        }:Action$VisibilityFilter));
      }}
    >
    {children}
    </a>
  );
};

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
    return (
      <div>
      <input ref ={ node => {this.input=node;} } />
        <button onClick={() => {
          store.dispatch(({
            type: 'ADD_TODO',
            text: 'Test'+this.input.value,
            id: nextTodoId++
          } : Action$ADD_TODO));
          this.input.value='';
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}
              onClick={()=>{store.dispatch( ({type:'TOGGLE_TODO', id:todo.id} : Action$TOGGLE_TODO)) }}
              style ={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
            >
              {todo.text + todo.id}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
const root=    document.getElementById('root')
const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,root
  );
};

store.subscribe(render)
render();
