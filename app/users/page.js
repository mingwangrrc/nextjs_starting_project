import { Table } from 'antd';
import Link from 'next/link';

export default async function UsersPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

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

  return (
    <main>
      <h1>Users</h1>
      <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
    </main>
  );
}

