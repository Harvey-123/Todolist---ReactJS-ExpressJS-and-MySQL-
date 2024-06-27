import React, { useState, useEffect } from 'react';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';

function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5001/get');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTaskDone = async (id) => {
    try {
      await fetch(`http://localhost:5001/put/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchTodos();  // Fetch the updated list of todos
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await fetch(`http://localhost:5001/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchTodos();  // Fetch the updated list of todos
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create fetchTodos={fetchTodos} />
      {todos.length === 0 ? (
        <div><h2>No Task</h2></div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo.id}>
            <div className="checkbox" onClick={() => toggleTaskDone(todo.id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div onClick={() => removeTask(todo.id)}>
              <span><BsFillTrashFill className="icon" /></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
