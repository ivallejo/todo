import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';

/**
 * Componente principal de la aplicación
 * Gestiona el estado global de las tareas
 */
function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  // Calcular estadísticas
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="max-w-xl mx-auto px-5 py-8 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Mis Tareas</h1>
        <div className="flex justify-center gap-5 flex-wrap">
          <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            Total: <strong>{totalTodos}</strong>
          </span>
          <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            Pendientes: <strong>{pendingTodos}</strong>
          </span>
          <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            Completadas: <strong>{completedTodos}</strong>
          </span>
        </div>
      </header>

      <main className="bg-gray-50 p-5 rounded-xl">
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}

export default App;
