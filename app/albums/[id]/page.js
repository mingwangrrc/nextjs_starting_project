import Link from 'next/link';

export default async function AlbumDetailPage({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${params.id}`);
  const album = await response.json();

  return (
    <main>
      <h1>{album.title}</h1>
      <p>User ID: {album.userId}</p>
      <p>
        <Link href="/albums">Back to Albums</Link>
      </p>
    </main>
  );
}
