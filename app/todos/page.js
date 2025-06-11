import TodosTable from '@/components/todos-table';

export default async function TodosPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();

  return (
    <main>
      <h1>Todos</h1>
      <TodosTable todos={todos} />
    </main>
  );
}
