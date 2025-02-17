// models/Todo.js
// Import mongoose to define the schema
const mongoose = require('mongoose');

// Define the schema for a Todo item
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Todo', TodoSchema);

