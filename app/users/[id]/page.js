import Link from 'next/link';
export default async function UserDetailPage({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await response.json();

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
