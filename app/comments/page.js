import CommentsTable from '@/components/comments-table';
import { promises as fs } from 'fs';
import path from 'path';

export default async function CommentsPage() {
  const filePath = path.join('/Users/mingwang/Desktop', 'comments.json');
  let commentsData;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    commentsData = JSON.parse(file);
  } catch {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    commentsData = await response.json();
  }
  const comments = commentsData.map((comment) => ({ ...comment, tags: '' }));

  return (
    <main>
      <h1>Comments</h1>
      <CommentsTable comments={comments} />
    </main>
  );
}
