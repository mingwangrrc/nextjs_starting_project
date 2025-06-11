'use client';

import EditableTable from './editable-table';
import Link from 'next/link';

export default function PhotosTable({ photos }) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link href={`/photos/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Album ID',
      dataIndex: 'albumId',
      key: 'albumId',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnailUrl',
      render: url => <img src={url} alt="thumb" style={{ width: 50 }} />,
    },
  ];

  return <EditableTable data={photos} columns={columns} />;
}
