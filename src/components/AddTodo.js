
// @flow
// AddTodo component
import React from 'react';
import {connect} from 'react-redux';
import type {A_ADD_TODO} from '../reducers/actions'
import {mk_A_ADD_TODO} from '../reducers/actions'

const AddTodoPres  = ( arg : {dispatch: Function}): React$Element<any> =>{
  const dispatch= arg.dispatch
  let input;
  return (
    <div>
      <input ref ={ node => {input=node;} } />
      <button onClick={
        () =>
        {
          dispatch(mk_A_ADD_TODO(input.value));
          input.value='';}
      }>
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
