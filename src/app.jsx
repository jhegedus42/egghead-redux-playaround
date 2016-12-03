// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore'
import Root from './components/Root'

const store = configureStore();
const root        =  document.getElementById('root')

ReactDOM.render  (<Root store={store} />, root );
