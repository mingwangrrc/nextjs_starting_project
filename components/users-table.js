'use client';

import EditableTable from './editable-table';

export default function UsersTable({ users }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      renderLink: (record) => `/users/${record.id}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      editable: true,
    },
  ];

  return (
    <EditableTable
      data={users}
      columns={columns}
      rowKey="id"
      storageKey="users"
    />
  );
}
