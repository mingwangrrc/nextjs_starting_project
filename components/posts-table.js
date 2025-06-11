'use client';

import EditableTable from './editable-table';

export default function PostsTable({ posts }) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      renderLink: (record) => `/posts/${record.id}`,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      editable: true,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      editable: true,
    },
  ];

  return (
    <EditableTable
      data={posts}
      columns={columns}
      rowKey="id"
      storageKey="posts"
    />
  );
}
