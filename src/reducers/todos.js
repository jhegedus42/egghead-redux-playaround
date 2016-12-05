// @flow
import type { State$TodoIDsByFilterMap, State$Filter, State$TodosByIDMap,State$Todos}  from '../types/state_types'
import {S_Todo,TodoID, getAllTodos} from '../types/state_types'
import {mk_A_ADD_TODO,mk_A_TOGGLE_TODO,Actions} from '../types/action_types'
import type {A_TODO} from '../types/action_types'
import {combineReducers} from 'redux'

const todosOld = (state:State$TodosByIDMap={}, action) :State$TodosByIDMap=>{ //reducer
      if (action.type === 'ADD_TODO'){
        const todo=S_Todo.addTodo(action.text);
        return { ... state, [todo.todoId.id] : todo};
      }
      if (action.type=== 'TOGGLE_TODO'){
          const id=action.todoId.id;
          const todo=state[id];
          return { ... state, [todo.todoId.id] : S_Todo.toggle(todo)};
      }
      return state;
};

const byIdReducer=(state:State$TodosByIDMap={},action:A_TODO):State$TodosByIDMap=>{
  switch (action.type){
    case 'RECIEVE_TODOS':
      const nextState:State$TodosByIDMap= {...state}; //shallow copy
      action.serverResponse.forEach(todo=>{
        nextState[todo.todoId.id]=todo;
      });
      return nextState;
  default:
    return state;
  }
};

const allIdsReducer=(state:TodoID[]=[],action:A_TODO):TodoID[]=>{
  switch (action.type){
    case Actions.RECIEVE_TODOS:
      if (action.filter !== 'all'){
        return state;
      }
      return action.serverResponse.map(todo=> todo.todoId);
    default:
      return state;
  }
}

const activeIdsReducer=(state:TodoID[]=[],action:A_TODO):TodoID[]=>{
  switch (action.type){
    case Actions.RECIEVE_TODOS:
      if (action.filter !== 'active'){
        return state;
      }
      return action.serverResponse.map(todo=> todo.todoId);
    default:
      return state;
  }
}

const completedIdsReducer=(state:TodoID[]=[],action:A_TODO):TodoID[]=>{
  switch (action.type){
    case Actions.RECIEVE_TODOS:
      if (action.filter !== 'completed'){
        return state;
      }
      return action.serverResponse.map(todo=> todo.todoId);
    default:
      return state;
  }
}

// const idsByFilterDummy=combineReducers({
//   all:allIdsReducer,
//   active:activeIdsReducer,
//   completed:completedIdsReducer,
// });

const idsByFilterReducer = (state:State$TodoIDsByFilterMap, action:A_TODO) : State$TodoIDsByFilterMap => ({
  all:allIdsReducer(state['all'], action),
  active:activeIdsReducer(state['active'], action),
  completed:completedIdsReducer(state['completed'],action)
});


export const getVisibleTodos  = (state:State$Todos, filter:State$Filter) : S_Todo[] => { // selector
  const ids= state.idsByFilter[filter];
  return ids.map(todoId=> state.byId[todoId.id]);
};

// const todosReducerDummy = combineReducers({
//   byIdReducer,
//   idsByFilterReducer
// });

const todosReducer = (state:State$Todos,action:A_TODO):State$Todos=>({
  byId:byIdReducer(state.byId, action),
  idsByFilter:idsByFilterReducer(state.idsByFilter, action)
})


export default todosReducer;
