// @flow

import {AddTodo} from './AddTodo.js'
import React from 'react';
import {VisibleTodoList} from './TodoList.js'
import {Footer} from './Footer.js'
import {Provider} from 'react-redux';
export const TodoApp = () :React$Element<any> => {
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
