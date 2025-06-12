import AlbumsTable from '@/components/albums-table';
import { promises as fs } from 'fs';
import path from 'path';

export default async function AlbumsPage() {
  const filePath = path.join(process.cwd(), 'albums.json');
  let albumsData;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    albumsData = JSON.parse(file);
  } catch {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    albumsData = await response.json();
  }
  const albums = albumsData.map((album) => ({ ...album, tags: '' }));

  return (
    <main>
      <h1>Albums</h1>
      <AlbumsTable albums={albums} />
    </main>
  );
}
