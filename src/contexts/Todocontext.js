import { createContext, useReducer, useContext } from "react";
import { TodosReducer } from "../reducers/TodosReducer";
export const Todocontext = createContext([]);
export const TodoDispach=createContext([]);
export const TodosProvider = ({ children }) => {
  const [todos, dispach] = useReducer(TodosReducer, []);
  return (
    <>
      <Todocontext.Provider value={  todos }>
        <TodoDispach.Provider value={dispach}>
        {children}
        </TodoDispach.Provider>
      </Todocontext.Provider>
    </>
  );
};
export const useTodos = () => useContext(Todocontext);          
export const useTodosDispach = () => useContext(TodoDispach);   
