import TodosTable from '@/components/todos-table';

export default async function TodosPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todosData = await response.json();
  const todos = todosData.map((todo) => ({ ...todo, tags: '' }));

  return (
    <main>
      <h1>Todos</h1>
      <TodosTable todos={todos} />
    </main>
  );
}
