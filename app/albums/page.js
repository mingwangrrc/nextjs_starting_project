import AlbumsTable from '@/components/albums-table';

export default async function AlbumsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  const albumsData = await response.json();
  const albums = albumsData.map((album) => ({ ...album, tags: '' }));

  return (
    <main>
      <h1>Albums</h1>
      <AlbumsTable albums={albums} />
    </main>
  );
}
