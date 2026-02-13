import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';

// Componente principal de la app
function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  // Contadores de tareas
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="max-w-xl mx-auto px-5 py-8 min-h-screen">
      <Header 
        total={totalTodos} 
        completed={completedTodos} 
        pending={pendingTodos} 
      />
      
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
