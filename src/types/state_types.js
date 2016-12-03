
// @flow
// states
import type {A_TODO } from './action_types.js';
import type { Store } from 'redux';
import {v4} from 'node-uuid';

export class TodoID{
 id:string;
 constructor() {this.id=v4();}
};


export class S_Todo  {
  text:string;
  completed:boolean;
  todoId:TodoID;
  constructor(text:string,todoId:TodoID,completed:boolean) {
    this.text = text;
    this.todoId=todoId;
    this.completed=completed;
  }

  static addTodo(text:string){
    return new S_Todo(text,new TodoID(),false);
  }

  static toggle(t:S_Todo):S_Todo {
    return new S_Todo(t.text,t.todoId,!t.completed);
  }

};


export type State$TodoMap ={ [key: string]: S_Todo};
export const addTodo = (s:State$TodoMap, t:S_Todo) : State$TodoMap=>
    {
      const k=t.todoId.id
      return {...s, [k]:t};
    }
export const getAllTodos = (s:State$TodoMap): S_Todo[] =>
   (Object.keys(s).map(k=>s[k]))

export type State$App = {
  todos:State$TodoMap
}

export type StoreType=Store <State$App, A_TODO>

export type State$Filter = 'all' | 'active' | 'completed';
