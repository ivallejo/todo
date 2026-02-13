// Tipo que representa una tarea
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Props para el componente TodoItem
export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// Props para el componente AddTodo
export interface AddTodoProps {
  onAdd: (text: string) => void;
}

// Props para el componente TodoList
export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}
