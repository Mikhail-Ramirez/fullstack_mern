// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to hold the list of todos and the current input text
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // useEffect hook to fetch todos from the backend when the component mounts
  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  /**
   * handleSubmit
   * Handles the form submission to add a new todo.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    // Post the new todo to the backend
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        // Prepend the new todo to the existing list
        setTodos([newTodo, ...todos]);
        setText('');
      })
      .catch((err) => console.error('Error adding todo:', err));
  };

  /**
   * handleDelete
   * Deletes a todo from the backend when its checkbox is clicked.
   */
  const handleDelete = (id) => {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted todo from state
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error('Error deleting todo:', err));
  };

  return (
    <div className="App">
      <h1>MERN Todo App</h1>
      {/* Form to add a new todo */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      {/* List of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {/* Checkbox: clicking it will delete the todo */}
            <input
              type="checkbox"
              onChange={() => handleDelete(todo._id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

