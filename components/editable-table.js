'use client';

import { Table, Button, Input } from 'antd';
import { useState } from 'react';

function getValue(record, dataIndex) {
  if (Array.isArray(dataIndex)) {
    return dataIndex.reduce((acc, key) => acc && acc[key], record);
  }
  return record[dataIndex];
}

function setValue(record, dataIndex, value) {
  if (!Array.isArray(dataIndex)) {
    return { ...record, [dataIndex]: value };
  }
  if (dataIndex.length === 0) {
    return record;
  }
  const [head, ...rest] = dataIndex;
  return {
    ...record,
    [head]: setValue(record[head] || {}, rest, value),
  };
}

export default function EditableTable({ data, columns }) {
  const [tableData, setTableData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (id, dataIndex, value) => {
    setTableData(prev =>
      prev.map(row => (row.id === id ? setValue(row, dataIndex, value) : row))
    );
  };

  const columnsWithEdit = columns.map(col => {
    if (!col.dataIndex) return col;
    return {
      ...col,
      render: (text, record) =>
        isEditing ? (
          <Input
            value={getValue(record, col.dataIndex)}
            onChange={e => handleChange(record.id, col.dataIndex, e.target.value)}
          />
        ) : col.render ? (
          col.render(text, record)
        ) : (
          text
        ),
    };
  });

  return (
    <>
      <Button onClick={() => setIsEditing(prev => !prev)} style={{ marginBottom: 16 }}>
        {isEditing ? 'Done' : 'Edit'}
      </Button>
      <Table dataSource={tableData} columns={columnsWithEdit} rowKey="id" pagination={false} />
    </>
  );
}
