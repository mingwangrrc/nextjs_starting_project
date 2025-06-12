import PostsTable from '@/components/posts-table';
import { promises as fs } from 'fs';
import path from 'path';

export default async function PostsPage() {
  const filePath = path.join('/Users/mingwang/Desktop', 'posts.json');
  let postsData;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    postsData = JSON.parse(file);
  } catch {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    postsData = await response.json();
  }
  const posts = postsData.map((post) => ({ ...post, tags: '' }));

  return (
    <main>
      <h1>Posts</h1>
      <PostsTable posts={posts} />
    </main>
  );
}
