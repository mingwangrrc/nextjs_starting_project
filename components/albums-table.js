'use client';

import EditableTable from './editable-table';

export default function AlbumsTable({ albums }) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      renderLink: (record) => `/albums/${record.id}`,
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      editable: true,
    },
  ];

  return (
    <EditableTable
      data={albums}
      columns={columns}
      rowKey="id"
      storageKey="albums"
    />
  );
}
