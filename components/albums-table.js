'use client';

import EditableTable from './editable-table';
import Link from 'next/link';

export default function AlbumsTable({ albums }) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link href={`/albums/${record.id}`}>{text}</Link>,
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
  ];

  return <EditableTable data={albums} columns={columns} />;
}
