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
    <ul className="space-y-4 mt-4">
      {tasks.map((task, index) => (
        <li
          key={task._id}
          className={`flex items-center justify-between p-4 border rounded-lg ${
            task.completed ? 'bg-gray-100 line-through' : 'bg-white'
          }`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            {editingIndex === index ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="border rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="flex-grow">{task.text}</span>
            )}
          </div>
          <div className="space-x-3 ml-4">
            {editingIndex === index ? (
              <button
                onClick={() => handleSave(index)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(index, task)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </>
            )}
          </div>
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