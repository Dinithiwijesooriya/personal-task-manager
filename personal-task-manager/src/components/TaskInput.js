import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskText, setTaskText] = useState('');

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
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default TaskInput;



//We use useState to manage the input state.
//handleSubmit is triggered when the form is submitted. It checks if the input is not empty and then calls the addTask function passed as a prop.