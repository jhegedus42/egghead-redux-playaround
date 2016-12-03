// @flow
import {v4} from 'node-uuid';
import type {State$TodoMap,State$Filter} from './types/state_types';
import {S_Todo,addTodo,getAllTodos} from './types/state_types';

const getFakeDB = ():State$TodoMap =>{
  const s={}
  const s2=addTodo(s,S_Todo.addTodo("egy"));
  const s3=addTodo(s2,S_Todo.addTodo("ketto"));
  const s4=addTodo(s3,S_Todo.addTodo("harom"));
  return s4;
};

const fdb=getFakeDB();

const fakeDB:S_Todo[]=getAllTodos(fdb);

const delay = (ms) => new Promise(resolve=> setTimeout(resolve,ms));

export const fetchTodos = (filter:State$Filter) :Promise<S_Todo[]> =>
  delay(500).then(()=>{
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
