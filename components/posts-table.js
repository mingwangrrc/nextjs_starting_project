'use client';

import { Table } from 'antd';
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

  return <Table dataSource={posts} columns={columns} rowKey="id" pagination={false} />;
}
