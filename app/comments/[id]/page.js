import Link from 'next/link';

export default async function CommentDetailPage({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${params.id}`);
  const comment = await response.json();

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
