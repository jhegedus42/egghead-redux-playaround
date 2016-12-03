
// @flow
// TodoReactElement
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import type {A_TOGGLE_TODO} from '../types/action_types'
import {mk_A_TOGGLE_TODO} from '../types/action_types'
import type {TodoID,S_Todo,State$TodoMap,State$App,StoreType } from '../types/state_types.js';
import {getVisibleTodos} from '../reducers/reducers'

const TodoReactElement = (props:{onClick:Function,completed:boolean,text:string}) : React$Element<any>=>(
            <li onClick={props.onClick}
                style ={{ textDecoration: props.completed ? 'line-through' : 'none'}} >
                {props.text}
            </li>
);

// TodoList presentational component
type F=(p1: TodoID) => void
type TodoListReactComponentProps ={todos:S_Todo[],onTodoClick:F}

const TodoList = (props:TodoListReactComponentProps) : React$Element<any>=>(
  <ul>
    {props.todos.map( todo=>
      <TodoReactElement
        key ={todo.todoId.id}
        completed={todo.completed}
        onClick={()=> props.onTodoClick(todo.todoId)}
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
  {onTodoClick:mk_A_TOGGLE_TODO}
)(TodoList));
