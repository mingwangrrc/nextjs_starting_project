'use client';

import { Table } from 'antd';
import Link from 'next/link';

export default function CommentsTable({ comments }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link href={`/comments/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  return <Table dataSource={comments} columns={columns} rowKey="id" pagination={false} />;
}
