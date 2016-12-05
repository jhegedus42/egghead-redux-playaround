// @flow
import type { State$TodoIDsByFilterMap, State$Filter, State$TodosByIDMap,State$Root}  from '../types/state_types'
import {S_Todo,TodoID} from '../types/state_types'
import type {A_TODO} from '../types/action_types'
import byIdReducer, * as fromById from './byIdReducer';
import createList, * as fromList from './createList';

const initState={
                        byId:{
                        },
                        idsByFilter:{
                          all:[],
                          active:[],
                          completed:[]
                        }
                }




const idsByFilterReducer = (state:State$TodoIDsByFilterMap, action:A_TODO) : State$TodoIDsByFilterMap => ({
  all:createList('all')(state['all'], action),
  active:createList('active')(state['active'], action),
  completed:createList('completed')(state['completed'],action)
});


export const getVisibleTodos  = (state:State$Root, filter:State$Filter) : S_Todo[] => { // selector
  const ids= fromList.getIds(state.idsByFilter[filter]);
  return ids.map(todoId=> fromById.getTodo(state.byId,todoId.id));
};


const todosReducer = (state:State$Root=initState, action:A_TODO):State$Root=>({
  byId:byIdReducer(state.byId, action),
  idsByFilter:idsByFilterReducer(state.idsByFilter, action)
})


export default todosReducer;
