import PostsTable from '@/components/posts-table';

export default async function PostsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const postsData = await response.json();
  const posts = postsData.map((post) => ({ ...post, tags: '' }));

  return (
    <main>
      <h1>Posts</h1>
      <PostsTable posts={posts} />
    </main>
  );
}
