import logo from "./logo.svg";
import "./App.css";
import Todolist from "./components/Todolist";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import MysnackBar from "./components/MysnackBar";
import {ToastProvider} from './contexts/ToastContext';
import {TodosProvider} from './contexts/Todocontext'
const Theme = createTheme({
  typography: { fontFamily: ["opensans"] },
  palette: {
    primary: { main: "#004d40" },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "lecture of book1",
    details: "fffffffff",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "lecture of book2",
    details: "fffffffff",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "lecture of book3",
    details: "fffffffff",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  
  return (
    <ThemeProvider theme={Theme}>
    <TodosProvider >
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#191b1f",
            }}
          >
          
              <Todolist />
          
          </div>
        </ToastProvider>
    </TodosProvider >
    </ThemeProvider>
  );
}

export default App;
