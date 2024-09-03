import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const refreshTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const addTask = async (text) => {
    try {
      await axios.post('http://localhost:5000/tasks', { text, completed: false });
      refreshTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskCompletion = async (index) => {
    try {
      const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
      await axios.put(`http://localhost:5000/tasks/${tasks[index]._id}`, updatedTask);
      refreshTasks();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const removeTask = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${tasks[index]._id}`);
      refreshTasks();
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const editTask = async (index, newText) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${tasks[index]._id}`, { text: newText, completed: tasks[index].completed });
      refreshTasks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Personal Task Manager</h1>
      <TaskInput addTask={addTask} />
      <div className="flex space-x-4 my-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} shadow hover:bg-blue-600`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} shadow hover:bg-blue-600`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} shadow hover:bg-blue-600`}
        >
          Completed
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        removeTask={removeTask}
        editTask={editTask}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<TaskManager />} />} />
      </Routes>
    </Router>
  );
}

export default App;
