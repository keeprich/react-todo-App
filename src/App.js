import React, { useState, useRef, useEffect } from 'react';
import NavBar from './NavBar';
import ToDoList from './ToDoList';
import uuidv4 from 'uuid/v4';
// import logo from './logo.svg';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // Add effect for storing our todo lists

  useEffect(() => {
    const storedTodos = JSON.parse( localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

// tick and untick todo lists
function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(todo =>todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

  function handleAddTodo(e) {
const name = todoNameRef.current.value

if (name === '') 
return 
setTodos(prevTodos => {
  return [...prevTodos, {id: uuidv4(), name: name, complete:false}]
})
todoNameRef.current.value = null
  }

  function handelAddTodos() {
    const newTodos =todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <NavBar/>
  <ToDoList todos={todos} toggleTodo = {toggleTodo}/>
  <input ref={todoNameRef} type="text"/>
<button onClick={handleAddTodo}>Add to Do</button>
<button onClick = {handelAddTodos}>Clear completed todo</button>
<div>{todos.filter(todo => !todo.complete).length} Left to do</div>
  </>

    )
     
}





export default App;
