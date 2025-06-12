import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
export default async function UserDetailPage({ params }) {
  const filePath = path.join('/Users/mingwang/Desktop', 'users.json');
  let user;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(file);
    user = users.find((u) => u.id == params.id);
  } catch {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    user = await response.json();
  }

  return (
    <main>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <p>City: {user.address?.city}</p>
      <p>
        <Link href="/users">Back to Users</Link>
      </p>
    </main>
  );
}
