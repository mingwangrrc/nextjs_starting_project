import Link from 'next/link';

export default async function TodoDetailPage({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const todo = await response.json();

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
