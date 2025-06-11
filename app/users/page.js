import UsersTable from '@/components/users-table';

export default async function UsersPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();


  return (
    <main>
      <h1>Users</h1>
      <UsersTable users={users} />
    </main>
  );
}

