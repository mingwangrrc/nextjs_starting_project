import PhotosTable from '@/components/photos-table';

export default async function PhotosPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photos = await response.json();

  return (
    <main>
      <h1>Photos</h1>
      <PhotosTable photos={photos} />
    </main>
  );
}
