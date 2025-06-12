'use client';
import EditableTable from './editable-table';

export default function LocationsTable({ locations }) {
  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    },
    {
      title: 'Path ID',
      dataIndex: 'pathId',
      key: 'pathId',
      editable: true,
    },
  ];

  return (
    <EditableTable
      data={locations}
      columns={columns}
      rowKey="id"
      storageKey="locations"
    />
  );
}
