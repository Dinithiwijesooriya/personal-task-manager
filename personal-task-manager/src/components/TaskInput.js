import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState('');

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Handle input change and capitalize first letter
  const handleChange = (e) => {
    const inputText = e.target.value;
    setTaskText(capitalizeFirstLetter(inputText));
  };

  // Handle add task
  const handleAddTask = async () => {
    if (taskText) {
      try {
        await addTask(taskText);
        setTaskText(''); // Clear the input field
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <input
        type="text"
        value={taskText}
        onChange={handleChange}
        className="border rounded-lg py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your task..."
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;


//We use useState to manage the input state.
//handleSubmit is triggered when the form is submitted. It checks if the input is not empty and then calls the addTask function passed as a prop.