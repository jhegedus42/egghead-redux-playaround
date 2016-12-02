
// @flow
// TodoReactElement
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {toggleTodo} from '../action_creators.js'
import type {State$Todo,State$TodoList,State$App,StoreType } from '../types/state_types.js';
import {getVisibleTodos} from '../reducers/reducers'

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


const mapStateToTodoListProps = (state:State$App, {params})=>{ // does not depend on the state shape anymore ...
  return { todos: getVisibleTodos(state, params.filter || 'all') };  // getVisibleTodos knows about the state shape ...
};

export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  {onTodoClick:toggleTodo}
)(TodoList));
