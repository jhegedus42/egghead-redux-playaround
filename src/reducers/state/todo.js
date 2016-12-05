
// @flow
import type { Store } from 'redux';
import {v4} from 'node-uuid';

export class TodoID{
 id:string;
 constructor() {this.id=v4();}
};

export class State_Todo  {
  text:string;
  completed:boolean;
  todoId:TodoID;
  constructor(text:string,todoId:TodoID,completed:boolean) {
    this.text = text;
    this.todoId=todoId;
    this.completed=completed;
  }

  static addTodo(text:string){
    return new State_Todo(text,new TodoID(),false);
  }

  static toggle(t:State_Todo):State_Todo {
    return new State_Todo(t.text,t.todoId,!t.completed);
  }

};
