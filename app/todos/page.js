import TodosTable from '@/components/todos-table';
import { promises as fs } from 'fs';
import path from 'path';

export default async function TodosPage() {
  const filePath = path.join('/Users/mingwang/Desktop', 'todos.json');
  let todosData;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    todosData = JSON.parse(file);
  } catch {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    todosData = await response.json();
  }
  const todos = todosData.map((todo) => ({ ...todo, tags: '' }));

  return (
    <main>
      <h1>Todos</h1>
      <TodosTable todos={todos} />
    </main>
  );
}
