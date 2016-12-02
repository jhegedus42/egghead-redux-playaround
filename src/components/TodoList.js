
// @flow
// TodoReactElement
import React from 'react';
import {connect} from 'react-redux';
import {toggleTodo} from '../action_creators.js'
import type {State$Todo,State$TodoList,State$App,State$VisibilityFilter,StoreType }
   from '../state_types.js';

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

const mapStateToTodoListProps = (state)=>{
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToTodoListProps = (dispatch)=>(
   { onTodoClick: (id)=>{ dispatch(toggleTodo(id)) } })

export const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)
