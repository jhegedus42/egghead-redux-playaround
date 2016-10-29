import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import deepFreeze from 'deepfreeze'
import expect from 'expect'


const todos = (state=[], action) =>{
      switch (action.type){
        case 'ADD_TODO' : return [ ...state,
          { id:action.id, text:action.text, completed: false}];
        default :
          return state;
      }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id:0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id:0,
      text: 'Learn Redux',
      completed: false
    }

  ];

  deepFreeze(stateBefore);
  deepFreeze(action);
  expect( todos(stateBefore, action )).toEqual(stateAfter) ;
}

testAddTodo();
console.log('All  tests passed')

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span className={styles.blueBg}>module</span> local styles.</p>
        <p>Global bootstrap css import wo   rks too as you can see on the following button.</p>
        <p><a className="btn btn-primary btn-lg">Enjoy!</a></p>
      </div>
    )
  }
}
