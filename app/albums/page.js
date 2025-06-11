import AlbumsTable from '@/components/albums-table';

export default async function AlbumsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  const albums = await response.json();

  return (
    <main>
      <h1>Albums</h1>
      <AlbumsTable albums={albums} />
    </main>
  );
}
