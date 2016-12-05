
// @flow
import type { State$TodoIDsByFilterMap, State$Filter, State$TodosByIDMap,State$Root}  from '../types/state_types'
import {S_Todo,TodoID} from '../types/state_types'
import type {A_TODO} from '../types/action_types'
import {Actions} from '../types/action_types'
import byIdReducer, * as fromById from './byIdReducer';

const createList = (filter:State$Filter)=>{
  return (state:TodoID[]=[],action:A_TODO) =>{
    switch (action.type){
      case Actions.RECIEVE_TODOS:
        if (action.filter !== filter){
          return state;
        }
        return action.serverResponse.map(todo=> todo.todoId);
      default:
        return state;
    }
  }
}

export default createList;
export const getIds = (state:TodoID[] ) :TodoID[]=> state;
