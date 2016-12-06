
// @flow
import {TodoID} from './state/todo.js'
import type {A_TODO} from '../reducers/actions'
import {Actions} from '../reducers/actions'

type State_FetchedIDs={
    ids:TodoID[],
    isFetching:boolean
}

export type State_Filter = 'all' | 'active' | 'completed';

export type State_Filter_To_TodoIDs_Map = {
  all: State_FetchedIDs;
  active: State_FetchedIDs;
  completed : State_FetchedIDs;
}

const fetchedIDsByFilterMap_Reducer_Factory= (filter:State_Filter)=> {
  const ids= (state:TodoID[]=[],action:A_TODO) =>{
    switch (action.type){
      case Actions.RECIEVE_TODOS:
        if (action.filter !== filter){
          return state;
        }
        return action.serverResponse.map(todo=> todo.todoId);
      default:
        return state;
    }
  };
  const isFetching = (state=false, action:A_TODO) =>{
      switch (action.type){
        case Actions.REQUEST_TODOS:
          if (action.filter !== filter){
            return state;
          }
          return true;
        case Actions.RECIEVE_TODOS:
          if (action.filter !== filter){
            return state;
          }
          return false;
        default:
          return state;
      }
  };
  const combined =(state:State_FetchedIDs,action:A_TODO)=>({
    ids:ids(state.ids,action),
    isFetching:isFetching(state.isFetching,action)
  })
  return combined;
}

const idsByFilterReducer = (state:State_Filter_To_TodoIDs_Map, action:A_TODO) : State_Filter_To_TodoIDs_Map => ({
  all:fetchedIDsByFilterMap_Reducer_Factory('all')(state['all'], action),
  active:fetchedIDsByFilterMap_Reducer_Factory('active')(state['active'], action),
  completed:fetchedIDsByFilterMap_Reducer_Factory('completed')(state['completed'],action)
});

export default idsByFilterReducer

export const getIds = (state:State_FetchedIDs ) :TodoID[]=> state.ids;
export const getIsFetching = (state:State_FetchedIDs)=> {
//  console.log('getIsFetching: '+state);
  return state.isFetching;}
