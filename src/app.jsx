// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux';
import { createStore , combineReducers} from 'redux'

import type {State$Todo,State$TodoList,State$App,State$VisibilityFilter,StoreType }
   from './state_types.js';

import {VisibleTodoList} from './TodoList.js'
import {AddTodo} from './AddTodo.js'
import {Footer} from './Footer.js'
//import type {StoreType } from './state_types.js';

import {todoApp}  from './reducers.js'

import {loadState, saveState} from './localStorage.js';
import throttle from 'lodash/throttle';

//TodoApp component

const TodoApp = () :React$Element<any> => {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }

Provider.childContextTypes={
  store:React.PropTypes.object
};
const persistedState   = loadState();

const root        =  document.getElementById('root')
const s:StoreType =  createStore (todoApp, persistedState);
s.subscribe(throttle (()=>{saveState({todos: s.getState().todos});},1000));
console.log(s.getState())
ReactDOM.render  ( React.createElement (Provider, {store : s, children:<TodoApp/>}), root );
