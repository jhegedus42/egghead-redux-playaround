// @flow
import {v4} from 'node-uuid';
import type {State_TodosByIDMap} from './reducers/todosByIdMap_Reducer.js';
import type {State_Filter} from './reducers/idsByFilterMap_Reducer.js';
import {getAllTodos,addTodo} from './reducers/todosByIdMap_Reducer.js';
import {State_Todo} from './reducers/state/todo.js'

const getFakeDB = ():State_TodosByIDMap =>{
  const s={}
  const s2=addTodo(s,State_Todo.toggle(State_Todo.addTodo("egy")));
  const s3=addTodo(s2,State_Todo.addTodo("ketto"));
  const s4=addTodo(s3,State_Todo.addTodo("harom"));
  return s4;
};

const fdb=getFakeDB();

const fakeDB:State_Todo[]=getAllTodos(fdb);

const delay = (ms) => new Promise(resolve=> setTimeout(resolve,ms));

export const fetchTodos = (filter:State_Filter) :Promise<State_Todo[]> =>
  delay(5000).then(()=>{
    switch (filter) {
      case 'all':
        return fakeDB;
      case 'active':
        return fakeDB.filter(t=>!t.completed);
      case 'completed':
        return fakeDB.filter(t=>t.completed);
    };
    throw new Error('vazzeg');
  });
