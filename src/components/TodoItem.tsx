import { TodoItemProps } from '../types';

/**
 * Componente que renderiza una tarea individual
 * Muestra el texto con funcionalidad de marcar como completada y eliminar
 */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 cursor-pointer accent-blue-500"
        />
        <span
          className={`text-base transition-colors ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-2 text-sm text-red-600 bg-transparent border-none rounded cursor-pointer hover:bg-red-50 transition-colors"
        aria-label="Eliminar tarea"
      >
        ✕
      </button>
    </li>
  );
}
