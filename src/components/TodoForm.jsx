import { useState, useEffect } from 'react';
import { Save, X, Plus } from 'lucide-react';

const TodoForm = ({ onAdd, editingTodo, onUpdate, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTodo) {
      onUpdate(editingTodo.id, { title, description });
    } else {
      onAdd({ title, description });
    }

    setTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingTodo ? 'Görevi Güncelle' : 'Yeni Görev Ekle'}
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Görev başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Görev açıklaması"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="3"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {editingTodo ? (
            <>
              <Save size={18} />
              Güncelle
            </>
          ) : (
            <>
              <Plus size={18} />
              Ekle
            </>
          )}
        </button>
        {editingTodo && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X size={18} />
            İptal
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoForm;