// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore'
import Root from './components/Root'
import {fetchTodos} from './fakeDB.js'

fetchTodos('all').then(todos=> console.log(todos));

const store = configureStore();
const root        =  document.getElementById('root')

ReactDOM.render  (<Root store={store} />, root );
