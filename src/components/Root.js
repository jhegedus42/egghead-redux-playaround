// @flow
import {TodoApp} from './TodoApp'
import React from 'react';
import {Provider} from 'react-redux';
import type {StoreType } from '../types/state_types.js';
import {Router, Route} from 'react-router';
import { browserHistory } from 'react-router'
const Root = ({store}:{store:StoreType})=> (
  <Provider store = {store}>
    <Router history={browserHistory}>
       <Route path='/(:filter)' component ={TodoApp}/>
    </Router>
  </Provider>
);
export default Root;
