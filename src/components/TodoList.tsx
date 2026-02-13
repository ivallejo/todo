import { TodoListProps } from '../types';
import { TodoItem } from './TodoItem';

// Muestra la lista de tareas
export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-base">
        <p>No hay tareas aún. ¡Agrega una nueva!</p>
      </div>
    );
  }

  return (
    <ul className="list-none p-0 flex flex-col gap-2.5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
