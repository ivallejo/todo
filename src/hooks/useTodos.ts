import { useState, useCallback } from 'react';
import { Todo } from '../types';

/**
 * Hook personalizado para gestionar el estado de las tareas
 * Maneja las operaciones CRUD básicas: crear, leer, actualizar, eliminar
 */
export function useTodos() {
  // Estado inicial con algunas tareas de ejemplo
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Aprender TypeScript', completed: true },
    { id: 2, text: 'Practicar React Hooks', completed: false },
    { id: 3, text: 'Crear proyecto para entrevista', completed: false },
  ]);

  // Generador de IDs únicos
  const generateId = useCallback(() => {
    return Math.max(0, ...todos.map(t => t.id)) + 1;
  }, [todos]);

  /**
   * Añade una nueva tarea
   */
  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;

    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }, [generateId]);

  /**
   * Alterna el estado de completado de una tarea
   */
  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  /**
   * Elimina una tarea
   */
  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
