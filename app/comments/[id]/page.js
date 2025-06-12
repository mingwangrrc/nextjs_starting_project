import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

export default async function CommentDetailPage({ params }) {
  const filePath = path.join('/Users/mingwang/Desktop', 'comments.json');
  let comment;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const comments = JSON.parse(file);
    comment = comments.find((c) => c.id == params.id);
  } catch {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${params.id}`);
    comment = await response.json();
  }

  return (
    <main>
      <h1>{comment.name}</h1>
      <p>{comment.body}</p>
      <p>Email: {comment.email}</p>
      <p>
        <Link href="/comments">Back to Comments</Link>
      </p>
    </main>
  );
}
