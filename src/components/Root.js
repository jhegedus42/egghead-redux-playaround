// @flow
import {TodoApp} from './TodoApp'
import React from 'react';
import {Provider} from 'react-redux';
import type {StoreType } from '../state_types.js';
import {Router, Route} from 'react-router';
const Root = ({store}:{store:StoreType})=> (
  <Provider store = {store}>
    <Router>
       <Route path='/' component ={TodoApp}/>
    </Router>
  </Provider>
);
export default Root;
