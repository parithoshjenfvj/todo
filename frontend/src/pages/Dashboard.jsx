import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, CheckCircle, Circle, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todo/getall', {
        withCredentials: true
      });
      if (response.data.todo) {
        setTodos(response.data.todo);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/');
      } else {
        setError('Failed to fetch todos');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post('http://localhost:3000/todo/create', {
        title: newTodo
      }, { withCredentials: true });
      
      if (response.data.todo) {
        setTodos([...todos, response.data.todo]);
        setNewTodo('');
      }
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleUpdateTodo = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const response = await axios.put(`http://localhost:3000/todo/update/${id}`, {
        status: newStatus
      }, { withCredentials: true });
      
      if (response.data.todo) {
        setTodos(todos.map(t => t._id === id ? { ...t, status: newStatus } : t));
      }
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:3000/todo/delete/${id}`, {
        withCredentials: true
      });
      setTimeout(() => {
        setTodos(todos.filter(t => t._id !== id));
        setDeletingId(null);
      }, 300); // Wait for animation
    } catch (err) {
      setDeletingId(null);
      setError('Failed to delete todo');
    }
  };

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header animate-fade-in-up">
        <div className="header-content">
          <h1 className="auth-title">My Tasks</h1>
          <button onClick={handleLogout} className="btn-icon" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="dashboard-main animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="auth-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          {error && (
            <div className="message-banner message-error">
              {error}
            </div>
          )}

          <form onSubmit={handleCreateTodo} className="todo-form">
            <div className="input-wrapper" style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ marginTop: 0, width: 'auto', padding: '0 1.25rem' }}>
                <Plus size={20} />
              </button>
            </div>
          </form>

          <div className="todo-list">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>
            ) : todos.length === 0 ? (
              <div className="empty-state">No tasks yet. Add one above!</div>
            ) : (
              todos.map((todo, index) => (
                <div 
                  key={todo._id} 
                  className={`todo-item animate-fade-in-up ${todo.status === 'completed' ? 'completed' : ''} ${deletingId === todo._id ? 'animate-pop-out' : ''}`}
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="todo-content" onClick={() => handleUpdateTodo(todo._id, todo.status)}>
                    <button className={`todo-check ${todo.status === 'completed' ? 'checked' : ''}`}>
                      {todo.status === 'completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </button>
                    <span className="todo-text">{todo.title}</span>
                  </div>
                  <div className="todo-actions">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTodo(todo._id);
                      }} 
                      className="btn-icon delete"
                      title="Delete task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
