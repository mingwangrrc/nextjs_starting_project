'use client';

import EditableTable from './editable-table';

export default function TodosTable({ todos }) {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      editable: true,
      renderLink: (record) => `/todos/${record.id}`,
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      editable: true,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      editable: true,
    },
  ];

  return (
    <EditableTable
      data={todos}
      columns={columns}
      rowKey="id"
      storageKey="todos"
    />
  );
}
