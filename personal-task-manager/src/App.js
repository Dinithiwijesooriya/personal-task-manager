import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import axios from 'axios';

function App() {
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
    refreshTasks(); // Fetch tasks when component mounts
  }, []);

  const addTask = async (text) => {
    try {
      await axios.post('http://localhost:5000/tasks', { text, completed: false });
      refreshTasks(); // Refresh tasks after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTaskCompletion = async (index) => {
    try {
      const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
      await axios.put(`http://localhost:5000/tasks/${tasks[index]._id}`, updatedTask);
      refreshTasks(); // Refresh tasks after toggling completion
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const removeTask = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${tasks[index]._id}`);
      refreshTasks(); // Refresh tasks after removing
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const editTask = async (index, newText) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${tasks[index]._id}`, { text: newText, completed: tasks[index].completed });
      refreshTasks(); // Refresh tasks after editing
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
    <div className="App">
      <h1>Personal Task Manager</h1>
      <TaskInput addTask={addTask} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
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

export default App;




