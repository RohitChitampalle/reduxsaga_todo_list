// src/App.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosRequest, createTodoRequest, updateTodoRequest, deleteTodoRequest } from './/components/features/todo/todoSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleCreateTodo = () => {
    if (newTodo.trim()) {
      dispatch(createTodoRequest({ title: newTodo, completed: false }));
      setNewTodo('');
    }
  };

  const handleUpdateTodo = (todo) => {
    setEditingTodo(todo);
    setEditTodoTitle(todo.title);
  };

  const handleSaveEditTodo = () => {
    if (editTodoTitle.trim() && editingTodo) {
      dispatch(updateTodoRequest({ ...editingTodo, title: editTodoTitle }));
      setEditingTodo(null);
      setEditTodoTitle('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoRequest(id));
  };

  // Filter items based on search query
  const filteredItems = items.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Todo List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button className="btn btn-primary mt-2" onClick={handleCreateTodo}>Add Todo</button>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search todos"
        />
      </div>
      <ul className="list-group">
        {filteredItems.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTodo && editingTodo.id === todo.id ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                />
                <div>
                  <button className="btn btn-sm btn-primary me-2" onClick={handleSaveEditTodo}>
                    Save
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditingTodo(null)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleUpdateTodo(todo)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-success me-2" onClick={() => dispatch(updateTodoRequest({ ...todo, completed: !todo.completed }))}>
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
