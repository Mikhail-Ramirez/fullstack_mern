// routes/todos.js
// Import Express and create a router
const express = require('express');
const router = express.Router();

// Import the Todo model
const Todo = require('../models/Todo');

/**
 * GET /api/todos
 * Retrieves all todo items from the database.
 */
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/todos
 * Creates a new todo item.
 */
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /api/todos/:id
 * Deletes a todo item by its ID.
 */
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    await todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export the router to be used in server.js
module.exports = router;

