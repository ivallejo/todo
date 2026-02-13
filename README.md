# Todo App - React Interview Project

Una aplicación de tareas construida con React, TypeScript, Vite y Tailwind CSS. Perfecta para demostrar conocimientos en entrevistas técnicas.

---

## 📁 Estructura del Proyecto

```
/todo-app
├── src/
│   ├── components/
│   │   ├── AddTodo.tsx      # Formulario para añadir tareas
│   │   ├── TodoItem.tsx      # Tarea individual
│   │   └── TodoList.tsx      # Lista de tareas
│   ├── hooks/
│   │   └── useTodos.ts       # Hook personalizado
│   ├── types/
│   │   └── index.ts          # Tipos TypeScript
│   ├── App.tsx              # Componente principal
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos Tailwind
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## 🏗️ Arquitectura de Componentes

```
┌─────────────────────────────────────────────────────┐
│                      App.tsx                         │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │              AddTodo.tsx                     │   │
│  │  [Input] + [Button] → onAdd(text)          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │              TodoList.tsx                    │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │           TodoItem.tsx               │    │   │
│  │  │  [✓] Texto [x] → onToggle | onDelete│    │   │
│  │  └─────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │           TodoItem.tsx               │    │   │
│  │  │  [✓] Texto [x] → onToggle | onDelete│    │   │
│  │  └─────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Conceptos de React - Explicaciones Simples

### 1. **¿Qué es React?**

React es una **biblioteca** (no un framework completo) de JavaScript para crear interfaces de usuario.

**Analogía simple:**
> Piensa en React como piezas de LEGO. Cada pieza es un componente que puedes reutilizar para construir algo más grande.

**Características principales:**
- Basado en componentes
- Declarativo (dices QUÉ quieres, no CÓMO hacerlo)
- Virtual DOM para optimización
- Unidirectional data flow (datos fluyen en una dirección)

---

### 2. **¿Qué es el Virtual DOM y Diffing Eficiente?**

**Problema anterior (antes de React):**
```
Usuario hace clic → Cambia dato → Actualiza TODO el DOM manualmente
```
Era tedioso y propenso a errores.

**Solución de React con Virtual DOM:**

```
┌─────────────────────────────────────────────────────────────┐
│                    QUÉ ES EL VIRTUAL DOM                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   DOM Real          Virtual DOM           React             │
│   (pagina)          (copia en            actualiza          │
│                     memoria)              solo lo            │
│                                           necesario          │
│   ┌─────┐          ┌─────┐                               │
│   │div 1│          │div 1│      SOLO CAMBIA             │
│   │ ┌──┐│    →     │ ┌──┐│      lo que                  │
│   │ │h1││          │ │h1││      necesita                │
│   │ └──┘│          │ └──┘│                               │
│   └─────┘          └─────┘                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Diffing Eficiente - Explicación Simple:**

"Diffing" significa **encontrar las diferencias**.

**Analogía:**
> Es como comparar dos fotos pixel por pixel para ver qué cambió. Pero React lo hace muy rápido porque solo compara lo que realmente importa.

**Cómo funciona:**

```
Estado Anterior                    Estado Nuevo
┌─────────────┐                   ┌─────────────┐
│ Todo 1 ✓    │                   │ Todo 1 ✓    │  ← IGUAL
├─────────────┤                   ├─────────────┤
│ Todo 2      │     DIFFING       │ Todo 2 ✓    │  ← CAMBIÓ
├─────────────┤    ─────────→     ├─────────────┤
│ Todo 3      │                   │ Todo 3      │  ← IGUAL
└─────────────┘                   └─────────────┘

Resultado: Solo actualiza el checkbox de Todo 2
```

**¿Por qué es eficiente?**
1. React crea una copia del DOM (Virtual DOM)
2. Compara el Virtual DOM anterior con el nuevo
3. Calcula las diferencias mínimas (diffing)
4. Solo actualiza lo que cambió en el DOM real

---

### 3. **¿Qué son los Hooks?**

Los hooks son **funciones especiales** que te permiten usar características de React en componentes funcionales.

**Analogía:**
> Los hooks son como "poderes" que le das a tus componentes.

**Hooks principales:**
- `useState` → Poder de guardar datos
- `useEffect` → Poder de hacer efectos secundarios
- `useCallback` → Poder de memorizar funciones
- `useMemo` → Poder de memorizar cálculos

---

### 4. **useState - El Hook más Básico**

```tsx
// SINTAXIS
const [variable, setVariable] = useState(valorInicial);
```

**Ejemplo simple:**

```tsx
import { useState } from 'react';

function Contador() {
  // valor = 0, setValor = función para cambiar valor
  const [cuenta, setCuenta] = useState(0);
  
  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      <button onClick={() => setCuenta(cuenta + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

**¿Qué hace useState?**
1. Crea un espacio de memoria para guardar un valor
2. Devuelve el valor actual y una función para cambiarlo
3. Cuando cambias el valor, React re-renderiza el componente

---

### 5. **useCallback - Memorizar Funciones**

```tsx
const miFuncion = useCallback(() => {
  // código
}, [dependencias]);
```

**¿Cuándo usarlo?**
- Cuando pasas funciones como props a componentes hijos
- Cuando la función es dependencia de otros hooks

**Ejemplo en nuestra app:**

```tsx
// Esta función se recrea SOLO cuando cambia 'todos'
const generateId = useCallback(() => {
  return Math.max(0, ...todos.map(t => t.id)) + 1;
}, [todos]);
```

**¿Por qué no crearla siempre?**
Si la creas siempre, los componentes hijos que reciben esta función pensarán que algo cambió y se re-renderizarán innecesariamente.

---

### 6. **Componentes y Props**

**Componente** = Función que retorna JSX

**Props** = Parámetros que le pasas a un componente

```tsx
// src/components/TodoItem.tsx
interface TodoItemProps {
  todo: Todo;           // prop de tipo objeto
  onToggle: () => void; // prop de tipo función
  onDelete: () => void; // prop de tipo función
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <span onClick={onToggle}>{todo.text}</span>
      <button onClick={onDelete}>X</button>
    </li>
  );
}
```

**Flujo de datos:**

```
App (tiene los datos)
   │
   ├───► AddTodo (recibe onAdd)
   │
   └───► TodoList (recibe todos, onToggle, onDelete)
            │
            └───► TodoItem (recibe todo, onToggle, onDelete)
```

---

### 7. **Custom Hooks - Tu Propio Hook**

Un custom hook es **tu propia función** que usa otros hooks.

```tsx
// src/hooks/useTodos.ts
import { useState, useCallback } from 'react';
import { Todo } from '../types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = useCallback((text: string) => {
    const nuevoTodo = { id: 1, text, completed: false };
    setTodos([...todos, nuevoTodo]);
  }, [todos]);
  
  return { todos, addTodo };
}
```

**Ventajas:**
- Lógica reutilizable
- Código más organizado
- Separas lógica de presentación

---

### 8. **Renderizado de Listas**

```tsx
// map transforma cada elemento en JSX
{todos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

**¿Por qué es importante el `key`?**
React usa `key` para identificar qué elementos cambiaron.

```
SIN key: React no sabe cuál es cuál
CON key: React sabe exactamente qué cambió
```

---

## 🎨 Tailwind CSS - Explicación Simple

Tailwind usa **clases utilitarias** pequeñas que haces "拼" (combinar) para crear diseños.

**Sin Tailwind (CSS tradicional):**
```css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

**Con Tailwind:**
```tsx
<button class="bg-blue-500 text-white px-5 py-2 rounded">
  Click me
</button>
```

**Ventajas:**
- No nombras clases (adiós "btn-primary-blue-success")
- Estilos inline pero organizados
- Responsive fácil: `md:bg-blue-500 lg:bg-green-500`
- Hover states: `hover:bg-blue-600`

---

## ❓ PREGUNTAS DE ENTREVISTA - CON RESPUESTAS SIMPLES

### 1. ¿Qué es React?

**Respuesta simple:**
> React es una biblioteca de JavaScript para crear interfaces de usuario. Usas componentes (como piezas de LEGO) para construir tu aplicación. React maneja las actualizaciones del DOM automáticamente.

---

### 2. ¿Qué es el Virtual DOM?

**Respuesta simple:**
> El Virtual DOM es una copia ligera del DOM real en memoria. Cuando cambias algo, React compara el Virtual DOM anterior con el nuevo y solo actualiza lo que cambió. Es como comparar dos versiones de un documento solo para ver qué líneas cambiaron.

---

### 3. ¿Qué es el Diffing?

**Respuesta simple:**
> Diffing es el proceso de comparar dos cosas para encontrar diferencias. En React, compara el Virtual DOM anterior con el nuevo para encontrar qué elementos cambiaron. Esto hace que las actualizaciones sean muy rápidas.

---

### 4. ¿Componentes controlados vs no controlados?

**Componente Controlado:**
```tsx
// React controla el valor
const [texto, setTexto] = useState('');
<input value={texto} onChange={(e) => setTexto(e.target.value)} />
```

**Componente No Controlado:**
```tsx
// El DOM controla el valor
const inputRef = useRef();
<input ref={inputRef} />
```

**Respuesta simple:**
> Controlado = React maneja el valor del input.
> No controlado = El input maneja su propio valor y usas ref para acceder a él.

---

### 5. ¿useState vs useReducer?

| useState | useReducer |
|----------|------------|
| Para estados simples | Para estados complejos |
| Un valor | Múltiples valores relacionados |
| setValor(nuevo) | dispatch(acción) |

**Respuesta simple:**
> useState es como una variable simple. useReducer es como un pequeño máquina de estados con acciones.

---

### 6. ¿useEffect cuándo se ejecuta?

```tsx
useEffect(() => {
  console.log('Se ejecuta');
}, [dependencias]); // ← Se ejecuta cuando esto cambia
```

**Casos:**
- Sin segundo argumento → Se ejecuta en cada render
- Array vacío `[]` → Se ejecuta solo una vez (al montar)
- Con dependencias → Se ejecuta cuando cambian

**Respuesta simple:**
> useEffect es para hacer cosas después de renderizar. Lo que esté en el array de dependencias determina cuándo se ejecuta.

---

### 7. ¿Qué es la prop `key` en listas?

**Respuesta simple:**
> La key es un identificador único que ayuda a React a saber qué elementos cambiaron, se agregaron o eliminaron. Sin key, React tiene que重新renderizar todo.

---

### 8. ¿Por qué usar TypeScript?

**Respuesta simple:**
> TypeScript añade tipos a JavaScript. Esto significa que tu IDE puede ayudarte a encontrar errores antes de ejecutar el código. Es como tener un profesor que revisa tu tarea antes de entregarla.

---

### 9. ¿Qué es JSX?

**Respuesta simple:**
> JSX es una extensión de JavaScript que te permite escribir HTML dentro de JavaScript. Babel lo convierte a JavaScript que el navegador entiende.

```jsx
// Esto es JSX
const elemento = <h1>Hola</h1>;
```

---

### 10. ¿Qué es un componente de orden superior (HOC)?

**Respuesta simple:**
> Un HOC es una función que recibe un componente y retorna un componente nuevo con funcionalidad adicional. Es como envolver un regalo con papel adicional.

---

### 11. ¿Qué son las dependencias en useEffect/useCallback?

**Respuesta simple:**
> Las dependencias son un array que le dice a React: "Ejecuta esta función SOLO cuando estos valores cambien". Si pones un valor en el array, la función se recreará/ejecutará cuando ese valor cambie.

---

### 12. ¿React usa Virtual DOM o DOM real?

**Respuesta simple:**
> Usa ambos. Mantiene un Virtual DOM en memoria para hacer cálculos rápidos (diffing), pero las actualizaciones finales van al DOM real del navegador.

---

## 📦 Instalación y Ejecución

```bash
# Verificar node
node -v

# Instalar dependencias
npm install

# Ejecutar desarrollo
npm run dev

# Construir producción
npm build
```

---

## 🎯 Conceptos Clave para Recordar

| Concepto | Descripción Simple |
|----------|-------------------|
| Virtual DOM | Copia ligera para comparar cambios |
| Diffing | Encontrar diferencias entre dos versiones |
| useState | Guardar datos que cambian |
| useCallback | Memorizar funciones |
| useEffect | Hacer algo después de renderizar |
| Props | Datos que fluyen de padre a hijo |
| Key | Identificador único en listas |
| TypeScript | JavaScript con tipos |

---

## 💡 Tips para la Entrevista

1. **Habla en voz alta** - Explica tu razonamiento
2. **Usa analogías** - Comparaciones simples ayudan
3. **Dibuja diagramas** - Visualiza el flujo de datos
4. **Conecta conceptos** - Muestra cómo se relacionan
5. **Sé honesto** - Si no sabes, di que aprenderás

---

¡Buena suerte con tu entrevista! 🍀

**Recuerda:** 
- Los entrevistadores quieren ver tu proceso de pensamiento
- No importa si te equivocas, importa cómo razonas
- Practica explicando conceptos en voz alta
