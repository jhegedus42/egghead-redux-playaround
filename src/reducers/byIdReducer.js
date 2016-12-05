// @flow
import type {State$TodosByIDMap,S_Todo} from '../types/state_types'
import type {A_TODO} from '../types/action_types'
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

export default byIdReducer;
export const getTodo = (state:State$TodosByIDMap,id:string) :S_Todo=> state[id];
