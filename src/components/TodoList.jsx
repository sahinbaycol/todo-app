import TodoItem from './TodoItem';
import { TodoStatus } from '../Interfaces/types';

const TodoList = ({ todos, onDelete, onEdit, onToggleStatus }) => {
  const activeTodos = todos.filter(t => t.status === TodoStatus.ACTIVE);
  const completedTodos = todos.filter(t => t.status === TodoStatus.COMPLETED);

  return (
    <div className="space-y-6">
      {activeTodos.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-3">
            Aktif Görevler ({activeTodos.length})
          </h3>
          {activeTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-3">
            Tamamlanan Görevler ({completedTodos.length})
          </h3>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}

      {todos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Henüz görev eklenmemiş</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;