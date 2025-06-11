import CommentsTable from '@/components/comments-table';

export default async function CommentsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const commentsData = await response.json();
  const comments = commentsData.map((comment) => ({ ...comment, tags: '' }));

  return (
    <main>
      <h1>Comments</h1>
      <CommentsTable comments={comments} />
    </main>
  );
}
