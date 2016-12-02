
// @flow
// TodoReactElement
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {toggleTodo} from '../action_creators.js'
import type {State$Todo,State$TodoList,State$App,StoreType } from '../state_types.js';

const TodoReactElement = (props:{onClick:Function,completed:boolean,text:string}) : React$Element<any>=>(
            <li onClick={props.onClick}
                style ={{ textDecoration: props.completed ? 'line-through' : 'none'}} >
                {props.text}
            </li>
);

// TodoList presentational component

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

// VisibleTodoList container component

const getVisibleTodos  = (todos:State$TodoList, filter) : State$TodoList => {
  switch (filter) {
    case ('all' ):
      return todos;
    case ('completed'):
      return todos.filter(
        t => t.completed
      );
    case ('active'):
      return todos.filter(
        t => !t.completed
      );
    default:
      throw "undefined action"
  }
}

const mapStateToTodoListProps = (state,{params})=>{
  return { todos: getVisibleTodos(state.todos, params.filter || 'all') };
};

const mapDispatchToTodoListProps = (dispatch)=>(
   { onTodoClick: (id)=>{ dispatch(toggleTodo(id)) } })

export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList));
