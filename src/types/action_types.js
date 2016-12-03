
// @flow
// actions
import type {S_Todo,State$TodoMap,State$App,StoreType,TodoID }
       from './state_types.js';
import {v4} from 'node-uuid';

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

export type A_TODO= A_TOGGLE_TODO | A_ADD_TODO;
