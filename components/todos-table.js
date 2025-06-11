'use client';

import { Table } from 'antd';
import Link from 'next/link';

export default function TodosTable({ todos }) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link href={`/todos/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: completed => (completed ? 'Yes' : 'No'),
    },
  ];

  return <Table dataSource={todos} columns={columns} rowKey="id" pagination={false} />;
}
