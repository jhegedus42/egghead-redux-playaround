
// @flow
// TodoReactElement
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import type {A_TOGGLE_TODO} from '../types/action_types'
import {mk_A_TOGGLE_TODO} from '../types/action_types'
import type {TodoID,S_Todo,State$TodoMap,State$App,StoreType } from '../types/state_types.js';
import {getVisibleTodos} from '../reducers/reducers'
import {fetchTodos} from '../fakeDB.js'
import {TodoList} from './TodoList.js'
class Intermediate extends Component {
  componentDidMount(){
    fetchTodos(this.props.filter).then(todos=>
    console.log(this.props.filter,todos));
  }
  componentDidUpdate(prevProps){
    if (this.props.filter!== prevProps.filter){
      fetchTodos(this.props.filter).then(todos=>
      console.log(this.props.filter,todos));
    }
  }

  render (){
    return <TodoList {...this.props} />;
  }
}


// VisibleTodoList container component


const mapStateToTodoListProps = (state:State$App, {params})=>{ // does not depend on the state shape anymore ...
  const filter=params.filter || 'all';
  return { todos: getVisibleTodos(state, filter),filter };  // getVisibleTodos knows about the state shape ...
};

export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  {onTodoClick:mk_A_TOGGLE_TODO}
)(Intermediate));
