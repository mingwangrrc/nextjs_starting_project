import Link from 'next/link';

export default async function PostDetailPage({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await response.json();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>
        <Link href="/posts">Back to Posts</Link>
      </p>
    </main>
  );
}
