
// @flow
// TodoReactElement
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import type {A_TOGGLE_TODO, ty_mk_RECEIVE_TODOS,ty_fetchTodos} from '../reducers/actions'
import * as actions from '../reducers/actions'
import type {State_Root} from '../reducers/root_Reducer.js'
import {getVisibleTodos,getIsFetching} from '../reducers/root_Reducer.js'
import type {State_Todo} from '../reducers/state/todo.js'
import type {State_Filter} from '../reducers/idsByFilterMap_Reducer.js'
import {TodoList} from './TodoList.js'

class Intermediate extends Component {
  props:{
    filter:State_Filter,
    mk_RECIEVE_TODOS:ty_mk_RECEIVE_TODOS,
    mk_A_TOGGLE_TODO:Function,
    fetchTodos:ty_fetchTodos,
    fetchTodos:ty_fetchTodos,
    todos:State_Todo[],
    isFetching:boolean,
    requestTodos:Function
  };
  fetchData(){
      const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }
  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps){
    if (this.props.filter!== prevProps.filter){
      this.fetchData();
    }
  }
  render (){
    const {mk_A_TOGGLE_TODO, todos, isFetching}=this.props;
    if (isFetching && !todos.length){
      return <p> Loading... </p>;
    }
    return <TodoList todos={todos} onTodoClick={mk_A_TOGGLE_TODO} />;
  }
}

// VisibleTodoList container component
const mapStateToTodoListProps = (state:State_Root, {params})=>{ // does not depend on the state shape anymore ...
  const filter=params.filter || 'all';
  return { todos: getVisibleTodos(state, filter),
           filter,
           isFetching: getIsFetching(state,filter)
         };  // getVisibleTodos knows about the state shape ...
};

export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps, actions
)(Intermediate));
