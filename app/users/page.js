import UsersTable from '@/components/users-table';

export default async function UsersPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const usersData = await response.json();
  const users = usersData.map((user) => ({
    ...user,
    city: user.address?.city,
    tags: '',
  }));

  return (
    <main>
      <h1>Users</h1>
      <UsersTable users={users} />
    </main>
  );
}
