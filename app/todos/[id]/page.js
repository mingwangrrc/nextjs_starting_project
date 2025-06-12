import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

export default async function TodoDetailPage({ params }) {
  const filePath = path.join('/Users/mingwang/Desktop', 'todos.json');
  let todo;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const todos = JSON.parse(file);
    todo = todos.find((t) => t.id == params.id);
  } catch {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
    todo = await response.json();
  }

  return (
    <main>
      <h1>{todo.title}</h1>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <p>
        <Link href="/todos">Back to Todos</Link>
      </p>
    </main>
  );
}
