
// @flow
// actions
import type {S_Todo,State$TodoMap,State$App,StoreType,TodoID,State$Filter }
       from './state_types.js';
import {v4} from 'node-uuid';
import *  as fakeDB from '../fakeDB';

export type ty_fetchTodos =(filter:State$Filter) =>
  Promise<A_RECIEVE_TODOS>
export const fetchTodos : ty_fetchTodos =(filter)=> (
  fakeDB.fetchTodos(filter).then(response =>
    mk_RECIEVE_TODOS(filter,response)));

export type A_ADD_TODO = {
    text:string;
    type:'ADD_TODO';
}
export const mk_A_ADD_TODO = (text:string) : A_ADD_TODO =>
(  { text:text, type : 'ADD_TODO'});

export type A_TOGGLE_TODO = {
    todoId:TodoID;
    type:'TOGGLE_TODO'
}
export const mk_A_TOGGLE_TODO = (todoId:TodoID) : A_TOGGLE_TODO =>
(  {todoId:todoId, type : 'TOGGLE_TODO'});



export type A_RECIEVE_TODOS = {
  type:'RECIEVE_TODOS',
  filter:State$Filter,
  serverResponse:S_Todo[]
}
export type ty_mk_RECEIVE_TODOS=(filter:State$Filter,
  serverResponse:S_Todo[]) => A_RECIEVE_TODOS

const mk_RECIEVE_TODOS : ty_mk_RECEIVE_TODOS= (filter,
  serverResponse) =>({
   type : 'RECIEVE_TODOS',
   filter,
   serverResponse
});



export type A_TODO= A_TOGGLE_TODO | A_ADD_TODO;
