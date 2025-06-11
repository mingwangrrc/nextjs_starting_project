'use client';

import EditableTable from './editable-table';
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

  return <EditableTable data={users} columns={columns} />;
}
