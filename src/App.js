import React, {useEffect, useState} from 'react';
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Typography from "@material-ui/core/Typography";
import {v4 as uuid} from "uuid";
import buildYear from "./components/buildYear";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";
// {

//   state: {
//     drivers: [
//       {'John':[{
//         taskName: 'pickup', 
//         date: new Date()}]},
//       {'Ben':[{
//         taskName: 'pickup', 
//         date: new Date()}]},
//       {'Ken':[{
//         taskName: 'pickup', 
//         date: new Date()}]}
//     ]
//   }
// 
//   setDrivers: () => { .... }
// 
// }



class Task {
  constructor(name, location, description, id) {
    this.name = name;
    this.location = location;
    this.description = description;
    this.id = id;
  }

  addTask(task) {
    
  }
}


function App() {
  const initialTasks = [
    {
      1: {
        driver: "John",
        task: "Pick-up",
        location: "Toronto",
        description: "Refrigerators x10, Washing Machines x20"
      }
    }
  ];

  const initialDrivers = {
    John: [],
    Ben: [],
    Ken: []
  };

  const [tasks, setTasks] = useState(initialTasks);

  const [drivers, setDrivers] = useState(initialDrivers);

  const initialYear = buildYear();

  const [year, setYear] = useState(initialYear);
  
  

  function addTask(driverName) {
    const newTask = {taskname: 'dropoff', date: new Date()};
    const driver = drivers[driverName];
    const driverCopy = [...driver].push(newTask);
    setDrivers({
      ...drivers,
      [driverName]: driverCopy
    });
  }

  function handleClick(event) {
    event.preventDefault();
    addTask('John');
  }

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <form>
        <select name="Drivers" id="Drivers">
        <option value="Driver Selection">Driver Selection</option>
        <option value="John">John</option>
        <option value="Ben">Ben</option>
        <option value="Ken">Ken</option>
        </select>
        <button onClick={handleClick}>
          add task
        </button>
      </form>
    </div>
  );
}

export default App;

{/* <div className="App">
        <Typography style={{padding: 16}} variant="h1">rosedispatch</Typography>
        <TodoForm addTodo={addTodo} />
        <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        removeTodo={removeTodo}/>
    </div> */}