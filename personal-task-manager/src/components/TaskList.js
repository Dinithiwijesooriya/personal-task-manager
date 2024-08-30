import React, { useState } from 'react';

function TaskList({ tasks, toggleTaskCompletion, removeTask, editTask }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleEdit = (index, task) => {
    setEditingIndex(index);
    setEditingText(task.text);
  };

  const handleSave = async (index) => {
    try {
      await editTask(index, editingText);
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {editingIndex === index ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              {task.text}
            </>
          )}
          {editingIndex === index ? (
            <button onClick={() => handleSave(index)}>Save</button>
          ) : (
            <>
              <button onClick={() => handleEdit(index, task)}>Edit</button>
              <button onClick={() => removeTask(index)}>Remove</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;





//The TaskList component takes tasks and removeTask as props.
//It maps over the tasks array and displays each task with a "Remove" button.
//We added the ability to edit tasks. When the "Edit" button is clicked, the task text becomes an input field, allowing the user to modify it.
//The "Save" button saves the changes and exits edit mode.