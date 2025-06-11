'use client';

import { Table } from 'antd';
import Link from 'next/link';

export default function UsersTable({ users }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link href={`/users/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'City',
      dataIndex: ['address', 'city'],
      key: 'city',
    },
  ];

  return <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />;
}
