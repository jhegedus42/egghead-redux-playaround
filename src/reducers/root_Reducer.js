// @flow
import type {  State_Filter, State_Filter_To_TodoIDs_Map}  from './idsByFilterMap_Reducer.js'
import idsByFilterReducer, * as idsByFilter from './idsByFilterMap_Reducer.js'
import type {  State_TodosByIDMap }  from './todosByIdMap_Reducer.js'
import {State_Todo,TodoID} from './state/todo.js'
import byIdReducer,* as todosByIds from './todosByIdMap_Reducer'
import type {A_TODO} from './actions'

export type State_Root = {
  byId:       State_TodosByIDMap;
  idsByFilter:State_Filter_To_TodoIDs_Map;
}

const initState={
                    byId:{
                    },
                    idsByFilter:{
                      all:{ids:[], isFetching:false},
                      active:{ids:[], isFetching:false},
                      completed:{ids:[], isFetching:false}
                    }
                }

// root reducer

const rootReducer = (state:State_Root=initState, action:A_TODO):State_Root=>({
  byId:byIdReducer(state.byId, action),
  idsByFilter:idsByFilterReducer(state.idsByFilter, action)
})

export default rootReducer;

//helpers

export const getVisibleTodos  = (state:State_Root, filter:State_Filter) : State_Todo[] => { // selector
  const ids= idsByFilter.getIds(state.idsByFilter[filter]);
  return ids.map(todoId=> todosByIds.getTodo(state.byId,todoId.id));
};

export const getIsFetching = (state:State_Root, filter:State_Filter) => idsByFilter.getIsFetching(state.idsByFilter[filter]);
