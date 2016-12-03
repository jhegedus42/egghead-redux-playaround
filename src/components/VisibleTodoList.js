
// @flow
// TodoReactElement
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import type {A_TOGGLE_TODO, ty_mk_RECEIVE_TODOS} from '../types/action_types'
import * as actions from '../types/action_types'
import type {TodoID,S_Todo,State$TodoMap,State$App,StoreType,State$Filter } from '../types/state_types.js';
import {getVisibleTodos} from '../reducers/reducers'
import {fetchTodos} from '../fakeDB.js'
import {TodoList} from './TodoList.js'
class Intermediate extends Component {
  props:{filter:State$Filter, mk_RECIEVE_TODOS:ty_mk_RECEIVE_TODOS,toggleTodo:Function};
  fetchData(){
      const {filter, mk_RECIEVE_TODOS} = this.props;
      fetchTodos(filter).then( todos=>
        {
          const t=mk_RECIEVE_TODOS(filter,todos);
          //console.log(t);
        }
      );
    }
  componentDidMount(){
    this.fetchData()
  }
  componentDidUpdate(prevProps){
    if (this.props.filter!== prevProps.filter){
      this.fetchData()
    }
  }
  render (){
    const {toggleTodo, ...rest}=this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />;
  }
}


// VisibleTodoList container component


const mapStateToTodoListProps = (state:State$App, {params})=>{ // does not depend on the state shape anymore ...
  const filter=params.filter || 'all';
  return { todos: getVisibleTodos(state, filter),filter };  // getVisibleTodos knows about the state shape ...
};

export const VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,actions
)(Intermediate));
