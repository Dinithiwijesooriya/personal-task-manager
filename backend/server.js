// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Port for the backend server

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Task schema and model
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// API routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
