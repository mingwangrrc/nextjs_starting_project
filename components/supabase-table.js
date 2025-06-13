'use client';
import { Table } from 'antd';

export default function SupabaseTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const columns = Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key,
  }));

  const rowKey = data[0].id ? 'id' : columns[0].key;

  return <Table dataSource={data} columns={columns} rowKey={rowKey} pagination={false} />;
}
