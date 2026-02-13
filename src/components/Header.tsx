import { TodoStatsProps } from '../types';

// Muestra el titulo y las estadisticas
export function Header({ total, completed, pending }: TodoStatsProps) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Mis Tareas</h1>
      <div className="flex justify-center gap-5 flex-wrap">
        <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          Total: <strong>{total}</strong>
        </span>
        <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          Pendientes: <strong>{pending}</strong>
        </span>
        <span className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          Completadas: <strong>{completed}</strong>
        </span>
      </div>
    </header>
  );
}
