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

type Action$SetVisibilityFilter = {
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

type Action$App = Action$Todo | Action$SetVisibilityFilter

type State$TodoList = State$Todo[];

type State$VisibilityFilter = 'SHOW_ACTIVE' | 'SHOW_ALL' | 'SHOW_COMPLETED'

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

const visibilityFilterReducer = (state:State$VisibilityFilter = 'SHOW_ALL', action:Action$App) : State$VisibilityFilter =>  {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default : return state;
  }
}

const todoApp = (state : State$App = {todos:[],visibilityFilter:'SHOW_ALL'}, action: Action$App) : State$App => {
  return { todos: todosReducer(state.todos, action), visibilityFilter: visibilityFilterReducer(state.visibilityFilter,action) };
}

//const todoApp =combineReducers({todos:todosReducer, visibilityFilter:visibilityFilterReducer})
const store  = createStore (todoApp)

type FilterLinkProps = {
  filter:State$VisibilityFilter,
  currentFilter:State$VisibilityFilter,
  onClick:Function ,
  children:React$Element<*>
};

const FilterLink =  (props:FilterLinkProps)  : React$Element<any> => {
    if(props.filter===props.currentFilter) {
       return <span>{props.children}</span>
    }
    return (
    <a href='#' onClick={e => { e.preventDefault(); props.onClick(props.filter); }} >
    {props.children}
    </a>
  );
};

const getVisibleTodos = ( todos:State$TodoList, filter:State$VisibilityFilter ) : State$TodoList => {
  switch (filter) {
    case ('SHOW_ALL' :State$VisibilityFilter):
      return todos;
    case ('SHOW_COMPLETED':State$VisibilityFilter):
      return todos.filter(
        t => t.completed
      );
    case ('SHOW_ACTIVE':State$VisibilityFilter):
      return todos.filter(
        t => !t.completed
      );
    default:
      throw "undefined action"
  }
}

let nextTodoId = 0;

const TodoReactElement=(props:{onClick:Function,completed:boolean,text:string}) : React$Element<any>=>(
            <li onClick={props.onClick}
                style ={{ textDecoration: props.completed ? 'line-through' : 'none'}} >
                {props.text}
            </li>
);

type TodoListReactComponentProps ={todos:State$TodoList,onTodoClick:Function}

const TodoList =(props:TodoListReactComponentProps) : React$Element<any>=>(
  <ul>
    {props.todos.map( todo=>
      <TodoReactElement
        key ={todo.id}
        completed={todo.completed}
        onClick={()=> props.onTodoClick(todo.id)}
        text= {todo.text} >
      </TodoReactElement>)}
  </ul>
)

const AddTodo = (props:{onAddClick:Function}): React$Element<any> =>
{
  let input;
  return (
    <div>
      <input ref ={ node => {input=node;} } />
      <button onClick={() =>{ props.onAddClick(input.value); input.value='';}}>
        Add Todo
      </button>
    </div>
  )
}

const Footer = (props:{visibilityFilter:State$VisibilityFilter, onFilterClick:Function}): React$Element<any> =>
{
  return(
    <p>
      Show:
      {' '}

      <FilterLink
        filter='SHOW_ALL'
        currentFilter={props.visibilityFilter}
        onClick={props.onFilterClick}
        children={<span>All</span>}
        >
      </FilterLink>
      {' '}

      <FilterLink
        filter='SHOW_ACTIVE'
        currentFilter={props.visibilityFilter}
        onClick={props.onFilterClick}
        children={<span>Active</span>}
        >
      </FilterLink>

      {' '}
      <FilterLink
        filter='SHOW_COMPLETED'
        currentFilter={props.visibilityFilter}
        onClick={props.onFilterClick}
        children={<span>Completed</span>}
        >
      </FilterLink>

    </p>
  )
}

const TodoApp = ( props: State$App) :React$Element<any> => {
    return (
      <div>
        <AddTodo onAddClick={text=>store.dispatch(({type:'ADD_TODO',id:nextTodoId++,text}:Action$ADD_TODO))} ></AddTodo>
        <TodoList todos={ getVisibleTodos( props.todos, props.visibilityFilter ) }
                  onTodoClick={id=> store.dispatch(({type:'TOGGLE_TODO',id}:Action$TOGGLE_TODO))}>
        </TodoList>
        <Footer visibilityFilter={props.visibilityFilter}
                onFilterClick= {(filter:State$VisibilityFilter) => store.dispatch ( ({type:'SET_VISIBILITY_FILTER', filter}:Action$SetVisibilityFilter)) } >
        </Footer>

      </div>
    );
  }

const root   = document.getElementById('root')
const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} visibilityFilter={store.getState().visibilityFilter} />,
    root
  );
};

store.subscribe(render)
render();
