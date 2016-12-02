
// @flow
// AddTodo component
import React from 'react';
import {connect} from 'react-redux';

import {addTodo} from '../action_creators.js'

const AddTodoPres  = ( arg : {dispatch: Function}): React$Element<any> =>{
  const dispatch= arg.dispatch
  let input;
  return (
    <div>
      <input ref ={ node => {input=node;} } />
      <button onClick={() =>{ dispatch(addTodo(input.value)); input.value='';}}>
        Add Todo
      </button>
    </div>
  )
}

export const AddTodo= connect (
  null,
  dispatch => {
    return {dispatch};
  }
)(AddTodoPres); //wtf is dispatch ?
