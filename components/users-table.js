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
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'Street',
      dataIndex: 'address.street',
      key: 'street',
      editable: true,
    },
    {
      title: 'Suite',
      dataIndex: 'address.suite',
      key: 'suite',
      editable: true,
    },
    {
      title: 'City',
      dataIndex: 'address.city',
      key: 'city',
      editable: true,
    },
    {
      title: 'Zip',
      dataIndex: 'address.zipcode',
      key: 'zipcode',
      editable: true,
    },
    {
      title: 'Lat',
      dataIndex: 'address.geo.lat',
      key: 'lat',
      editable: true,
    },
    {
      title: 'Lng',
      dataIndex: 'address.geo.lng',
      key: 'lng',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      editable: true,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      editable: true,
    },
    {
      title: 'Company',
      dataIndex: 'company.name',
      key: 'company',
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
      data={users}
      columns={columns}
      rowKey="id"
      storageKey="users"
    />
  );
}
