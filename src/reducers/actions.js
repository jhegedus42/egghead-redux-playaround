
// @flow
// actions
import type {State_Todo,TodoID} from './state/todo.js'
import {v4} from 'node-uuid';
import *  as fakeDB from '../fakeDB';
import type {State_Filter} from './idsByFilterMap_Reducer.js'

// all actions

export const Actions ={
  RECIEVE_TODOS:'RECIEVE_TODOS',
  REQUEST_TODOS:'REQUEST_TODOS'
}

// add todo action

export type A_ADD_TODO = {
    text:string;
    type:'ADD_TODO';
}

export const mk_A_ADD_TODO = (text:string) : A_ADD_TODO =>
    ({ text:text, type : 'ADD_TODO'});

// toggle todo action

export type A_TOGGLE_TODO = {
    todoId:TodoID;
    type:'TOGGLE_TODO'
}

export const mk_A_TOGGLE_TODO = (todoId:TodoID) : A_TOGGLE_TODO =>
    ({todoId:todoId, type : 'TOGGLE_TODO'});

// receive todos action

export type A_RECIEVE_TODOS = {
  type:'RECIEVE_TODOS',
  filter:State_Filter,
  serverResponse:State_Todo[]
}

export type ty_mk_RECEIVE_TODOS=
    (filter:State_Filter,serverResponse:State_Todo[]) => A_RECIEVE_TODOS

const mk_RECIEVE_TODOS : ty_mk_RECEIVE_TODOS= (filter,
  serverResponse) =>({
   type : Actions.RECIEVE_TODOS,
   filter,
   serverResponse
});

// fetch todos action

export type ty_fetchTodos =(filter:State_Filter) =>
    (dispatch:Function)=> Promise<void>

export const fetchTodos : ty_fetchTodos =(filter)=>(dispatch)=> {
  dispatch(requestTodos(filter));
  return fakeDB.fetchTodos(filter).then(response =>
     dispatch(mk_RECIEVE_TODOS(filter,response)));
};

// request todos

export const requestTodos = (filter:State_Filter) => ({
  type: Actions.REQUEST_TODOS,
  filter
})

// combined action
export type A_TODO= A_TOGGLE_TODO | A_ADD_TODO | A_RECIEVE_TODOS;
