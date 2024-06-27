import React, { useState } from 'react';

function Create({ fetchTodos }) {
  const [task, setTask] = useState('');

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        const response = await fetch('http://localhost:5001/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task }),
        });
        const data = await response.json();
        fetchTodos();  // Fetch the updated list of todos
        setTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <div className="create_form">
      <input 
        type="text" 
        placeholder="Enter Task" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
      />
      <button type="button" onClick={handleAddTask}>Add</button>
    </div>
  );
}

export default Create;
