'use client';

import EditableTable from './editable-table';
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

  return <EditableTable data={comments} columns={columns} />;
}
