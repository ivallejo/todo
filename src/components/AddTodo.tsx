import { useState, type FormEvent } from 'react';
import { AddTodoProps } from '../types';

/**
 * Componente para añadir nuevas tareas
 * Maneja el formulario de entrada de texto
 */
export function AddTodo({ onAdd }: AddTodoProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        className="flex-1 px-4 py-3 text-base border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 text-base font-semibold text-white bg-blue-500 border-none rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
      >
        Agregar
      </button>
    </form>
  );
}
