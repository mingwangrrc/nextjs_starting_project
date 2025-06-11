'use client';

import EditableTable from './editable-table';

export default function CommentsTable({ comments }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      renderLink: (record) => `/comments/${record.id}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      editable: true,
    },
  ];

  return <EditableTable data={comments} columns={columns} rowKey="id" />;
}
