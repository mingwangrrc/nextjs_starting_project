import PostsTable from '@/components/posts-table';

export default async function PostsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  return (
    <main>
      <h1>Posts</h1>
      <PostsTable posts={posts} />
    </main>
  );
}
