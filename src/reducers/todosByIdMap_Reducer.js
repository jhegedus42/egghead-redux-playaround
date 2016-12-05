// @flow
import type {State_Todo} from './state/todo'
import type {A_TODO} from './actions'
// state type
export type State_TodosByIDMap ={ [key: string]: State_Todo};

// state modifier
export const addTodo = (s:State_TodosByIDMap, t:State_Todo) : State_TodosByIDMap=> {
    const k=t.todoId.id
    return {...s, [k]:t};
}

// reducer
const byIdReducer=(state:State_TodosByIDMap={},action:A_TODO):State_TodosByIDMap=>{
  switch (action.type){
    case 'RECIEVE_TODOS':
      const nextState:State_TodosByIDMap= {...state}; //shallow copy
      action.serverResponse.forEach(todo=>{
        nextState[todo.todoId.id]=todo;
      });
      return nextState;
  default:
    return state;
  }
};

// state views
export const getAllTodos = (s:State_TodosByIDMap): State_Todo[] => (Object.keys(s).map(k=>s[k]))
export const getTodo = (state:State_TodosByIDMap,id:string) :State_Todo=> state[id];

//default export

export default byIdReducer;
