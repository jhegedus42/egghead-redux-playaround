// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux';
import { createStore , combineReducers} from 'redux'


import {VisibleTodoList} from './TodoList.js'
import {AddTodo} from './AddTodo.js'
import {Footer} from './Footer.js'
import type {StoreType } from './state_types.js';

import {todoApp}  from './reducers.js'


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

const root        =  document.getElementById('root')
const s:StoreType =  createStore (todoApp)
ReactDOM.render  ( React.createElement (Provider, {store : s, children:<TodoApp/>}), root );
