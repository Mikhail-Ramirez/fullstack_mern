// server.js
// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB (adjust the URI as needed)
mongoose.connect('mongodb://localhost:27017/mern-todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import and use the todos route
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

