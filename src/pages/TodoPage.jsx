import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { TodoStatus } from '../Interfaces/types';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = ({ title, description }) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: TodoStatus.ACTIVE,
      createdAt: new Date().toISOString()
    };
    setTodos([newTodo, ...todos]);
  };

  const handleUpdate = (id, { title, description }) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, title, description }
        : todo
    ));
    setEditingTodo(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu görevi silmek istediğinize emin misiniz?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleStatus = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === TodoStatus.ACTIVE
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE
          }
        : todo
    ));
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            TODO Uygulaması
          </h1>
          <p className="text-gray-600">
            Görevlerinizi ekleyin, düzenleyin ve yönetin
          </p>
        </div>

        <TodoForm
          onAdd={handleAdd}
          editingTodo={editingTodo}
          onUpdate={handleUpdate}
          onCancelEdit={handleCancelEdit}
        />

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Görevler</h2>
            <div className="text-sm text-gray-600">
              Toplam: {todos.length} görev
            </div>
          </div>
          <TodoList
            todos={todos}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;