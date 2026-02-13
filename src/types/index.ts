/**
 * Interfaz que representa una tarea en la aplicación
 */
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Props para el componente TodoItem
 */
export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * Props para el componente AddTodo
 */
export interface AddTodoProps {
  onAdd: (text: string) => void;
}

/**
 * Props para el componente TodoList
 */
export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
