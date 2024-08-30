import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;

//We use useState to manage the input state.
//handleSubmit is triggered when the form is submitted. It checks if the input is not empty and then calls the addTask function passed as a prop.