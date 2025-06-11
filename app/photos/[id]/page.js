import Link from 'next/link';

export default async function PhotoDetailPage({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${params.id}`);
  const photo = await response.json();

  return (
    <main>
      <h1>{photo.title}</h1>
      <img src={photo.url} alt={photo.title} />
      <p>Album ID: {photo.albumId}</p>
      <p>
        <Link href="/photos">Back to Photos</Link>
      </p>
    </main>
  );
}
