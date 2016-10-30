import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import deepFreeze from 'deepfreeze'
import expect from 'expect'
var _ = require('lodash')

const todo = (todo, action) => {
  switch (action.type){
      case 'ADD_TODO' :
          return { id:action.id, text:action.text, completed: false};
      case 'TOGGLE_TODO':
        if (todo.id !== action.id) {return todo;}
          return {...todo,completed:!todo.completed};
  }
}

const todos = (state=[], action) =>{
      switch (action.type){
        case 'ADD_TODO' : return [ ...state, todo(undefined, action)];
        case 'TOGGLE_TODO': return _.map(state, (td) => todo(td, action));
        default : return state;
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

const testToggleTodo = () => {
          const stateBefore = [
            {
              id:0,
              text:'Learn Redux',
              completed:false
            },
            {
              id:1,
              text:'Go tripping',
              completed:false
            }
          ];

          const action = {
            type:'TOGGLE_TODO',
            id:1
          };

          const stateAfter = [
            {
              id:0,
              text:'Learn Redux',
              completed:false
            },
            {
              id:1,
              text:'Go tripping',
              completed:true
            }
          ];
          deepFreeze(stateBefore);
          deepFreeze(action);
          expect(todos(stateBefore,action)).toEqual(stateAfter)
}

const a={bela:'42',eves:false}
console.log(a)
console.log({...a,eves:true})

testAddTodo();
testToggleTodo();
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
