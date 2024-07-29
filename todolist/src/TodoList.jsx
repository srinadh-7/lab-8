import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(new Array(tasks.length).fill(false));

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, newTask]);
    setNewTask('');
    setCompletedTasks([...completedTasks, false]);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? editTask : task));
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditTask('');
  };

  const toggleTaskCompletion = (index) => {
    const updatedCompletedTasks = completedTasks.map((completed, i) => (i === index ? !completed : completed));
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={() => handleSaveTask(index)} className="save-button">Save</button>
              </>
            ) : (
              <div className="task-container">
                <span
                  onClick={() => toggleTaskCompletion(index)}
                  className={completedTasks[index] ? 'completed' : ''}
                >
                  {task}
                </span>
                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
