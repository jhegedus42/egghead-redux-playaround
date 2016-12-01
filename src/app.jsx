// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux';
import { createStore , combineReducers} from 'redux'
import deepFreeze from 'deepfreeze'
import expect from 'expect'
import type { Store } from 'redux';

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

type StoreType=Store <State$App, Action$App>

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

//const todoApp = combineReducers({todos:todosReducer, visibilityFilter:visibilityFilterReducer})

//Link presentation component - does not know about the behaviour
const Link = props => {
  if (props.active) {
    return React.createElement(
      'span',
      null, //no
      props.children
    );
  }
  return React.createElement(
    'a',
    { href: '#', onClick: e => {
        e.preventDefault();props.onClick();
      } },
    props.children
  );
};

const LinkJSX = (props:{active:boolean,children:React$Element<*>,onClick:Function}) =>{
    if(props.active) {
       return <span>{props.children}</span>
    }
    return (
    <a href='#' onClick={e => { e.preventDefault(); props.onClick(); }} > // http://stackoverflow.com/questions/4855168/what-is-href-and-why-is-it-used
      {props.children}
    </a>
  );
};

class FilterLink  extends React.Component { // container component - provides data and behaviour for the used Link presentation component
  props:{filter:State$VisibilityFilter,children:React$Element<*>};
  unsubscribe:Function;
  context:{store:StoreType}
  componentDidMount() {
    const store:StoreType = (this.context.store:StoreType);

    this.unsubscribe= store.subscribe(()=> this.forceUpdate());
    // this is needed because if the parent component does not update when then
    // store changes, this component would render a stale value
  };
  componentWillUnmount() {
    this.unsubscribe();
  }
  render(){
    const props = this.props;
    const store:StoreType = this.context.store;

    const state = store.getState();
    return (
      <Link
        active ={props.filter===state.visibilityFilter}
        onClick = {()=> store.dispatch (({ type:'SET_VISIBILITY_FILTER', filter: props.filter }:Action$SetVisibilityFilter))}
        children= {props.children} />
    )
  };
};
FilterLink.contextTypes={
  store:React.PropTypes.object
};

const getVisibleTodos  = (todos:State$TodoList, filter:State$VisibilityFilter ) : State$TodoList => {
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

const TodoReactElement = (props:{onClick:Function,completed:boolean,text:string}) : React$Element<any>=>(
            <li onClick={props.onClick}
                style ={{ textDecoration: props.completed ? 'line-through' : 'none'}} >
                {props.text}
            </li>
);

type TodoListReactComponentProps ={todos:State$TodoList,onTodoClick:Function}

const TodoList = (props:TodoListReactComponentProps) : React$Element<any>=>(
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

let AddTodo  = ( {dispatch}): React$Element<any> =>{
  let input;
  let onAddClick=text=>dispatch(({type:'ADD_TODO',id:nextTodoId++,text}:Action$ADD_TODO))
  return (
    <div>
      <input ref ={ node => {input=node;} } />
      <button onClick={() =>{ onAddClick(input.value); input.value='';}}>
        Add Todo
      </button>
    </div>
  )
}

AddTodo= connect (
  null,
  dispatch => {
    return {dispatch};
  }
)(AddTodo); //wtf is dispatch ?

const mapStateToTodoListProps = (state)=>{
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};


const mapDispatchToTodoListProps = (dispatch)=>{
  return {
    onTodoClick: (id)=>{
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  };
};

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)


const Footer  = () : React$Element<any> => {
  return React.createElement(
    'p',
    null,
    'Show:',
    ' ',
    React.createElement(FilterLink, {filter: 'SHOW_ALL', children: React.createElement( 'span', {}, 'All' ) }),
    ' ',
    React.createElement(FilterLink, {filter: 'SHOW_ACTIVE', children: React.createElement('span',{},'Active')}),
    ' ',
    React.createElement(FilterLink, {filter: 'SHOW_COMPLETED', children: React.createElement( 'span', {}, 'Completed' )})
  );
};

const TodoApp = () :React$Element<any> => {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }



Provider.childContextTypes={
  store:React.PropTypes.object
};

const root        =  document.getElementById('root')
const s:StoreType =  createStore (todoApp)
ReactDOM.render  ( React.createElement (Provider, {store : s, children:<TodoApp/>}), root );
