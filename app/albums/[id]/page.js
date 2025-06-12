import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

export default async function AlbumDetailPage({ params }) {
  const filePath = path.join('/Users/mingwang/Desktop', 'albums.json');
  let album;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const albums = JSON.parse(file);
    album = albums.find((a) => a.id == params.id);
  } catch {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${params.id}`);
    album = await response.json();
  }

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
