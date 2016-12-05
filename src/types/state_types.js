
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


export type State$TodosByIDMap ={ [key: string]: S_Todo};
export const addTodo = (s:State$TodosByIDMap, t:S_Todo) : State$TodosByIDMap=> {
    const k=t.todoId.id
    return {...s, [k]:t};
}

export type State$TodoIDsByFilterMap = {
  all: TodoID[];
  active: TodoID[];
  completed : TodoID[];
}

export const getAllTodos = (s:State$TodosByIDMap): S_Todo[] => (Object.keys(s).map(k=>s[k]))

export type State$Todos = {
  byId:State$TodosByIDMap;
  idsByFilter:State$TodoIDsByFilterMap;
}

export type State$Root = {
  todos:State$Todos
}

export type StoreType=Store <State$Root, A_TODO>

export type State$Filter = 'all' | 'active' | 'completed';
