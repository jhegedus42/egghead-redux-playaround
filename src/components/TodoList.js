import type {TodoId} from '../state_types'
import React from 'react';
// @flow
// TodoList presentational component
const TodoReactElement = (props:{onClick:Function,completed:boolean,text:string}) : React$Element<any>=>(
            <li onClick={props.onClick}
                style ={{ textDecoration: props.completed ? 'line-through' : 'none'}} >
                {props.text}
            </li>
);

type F=(p1: TodoID) => void
type TodoListReactComponentProps ={todos:State_Todo[],onTodoClick:F}

export const TodoList = (props:TodoListReactComponentProps) : React$Element<any>=>(
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
