import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';
import { TodoStatus } from '../Interfaces/types';

const TodoItem = ({ todo, onDelete, onEdit, onToggleStatus }) => {
  const isCompleted = todo.status === TodoStatus.COMPLETED;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 ${
      isCompleted ? 'border-green-500 opacity-75' : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => onToggleStatus(todo.id)}
              className="focus:outline-none"
            >
              {isCompleted ? (
                <CheckCircle2 className="text-green-500" size={24} />
              ) : (
                <Circle className="text-gray-400" size={24} />
              )}
            </button>
            <h3 className={`text-lg font-semibold ${
              isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {todo.title}
            </h3>
          </div>
          {todo.description && (
            <p className={`ml-9 text-gray-600 ${
              isCompleted ? 'line-through' : ''
            }`}>
              {todo.description}
            </p>
          )}
          <p className="ml-9 text-xs text-gray-400 mt-2">
            Oluşturulma: {new Date(todo.createdAt).toLocaleString('tr-TR')}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(todo)}
            disabled={isCompleted}
            className={`p-2 rounded-lg transition-colors ${
              isCompleted
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50'
            }`}
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;