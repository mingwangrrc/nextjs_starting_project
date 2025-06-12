import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

export default async function PostDetailPage({ params }) {
  const filePath = path.join('/Users/mingwang/Desktop', 'posts.json');
  let post;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const posts = JSON.parse(file);
    post = posts.find((p) => p.id == params.id);
  } catch {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    post = await response.json();
  }

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
