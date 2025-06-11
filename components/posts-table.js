'use client';

import EditableTable from './editable-table';
import Link from 'next/link';

export default function PostsTable({ posts }) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link href={`/posts/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  return <EditableTable data={posts} columns={columns} />;
}
