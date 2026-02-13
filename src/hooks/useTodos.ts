import { useState, useCallback } from 'react';
import { Todo } from '../types';

// Hook para manejar las tareas
export function useTodos() {
  // Lista de tareas
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Aprender TypeScript', completed: true },
    { id: '2', text: 'Practicar React Hooks', completed: false },
    { id: '3', text: 'Crear proyecto para entrevista', completed: false },
  ]);

  // Crea un ID único para cada tarea
  const generateId = () => crypto.randomUUID();

  // Añadir nueva tarea
  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;

    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, [generateId]);

  // Marcar tarea como completada o no
  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Eliminar tarea
  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
