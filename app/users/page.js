import UsersTable from '@/components/users-table';
import { promises as fs } from 'fs';
import path from 'path';

export default async function UsersPage() {
  const filePath = path.join(process.cwd(), 'users.json');
  let usersData;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    usersData = JSON.parse(file);
  } catch {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    usersData = await response.json();
  }
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
