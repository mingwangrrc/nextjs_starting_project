'use client';

import { useState } from 'react';
import { Table, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';

export default function EditableTable({ data, columns, rowKey }) {
  const [tableData, setTableData] = useState(data);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const edit = (record) => {
    setEditingId(record[rowKey]);
    setFormData(record);
  };

  const cancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const save = () => {
    setTableData((prev) =>
      prev.map((row) => (row[rowKey] === editingId ? formData : row))
    );
    cancel();
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const renderCell = (col, record) => {
    const isEditing = record[rowKey] === editingId;
    const value = formData[col.dataIndex];
    if (isEditing && col.editable !== false) {
      if (col.dataIndex === 'completed') {
        return (
          <Checkbox
            checked={value}
            onChange={(e) => handleChange(col.dataIndex, e.target.checked)}
          />
        );
      }
      return (
        <Input
          value={value}
          onChange={(e) => handleChange(col.dataIndex, e.target.value)}
        />
      );
    }

    if (col.renderLink) {
      const href =
        typeof col.renderLink === 'function'
          ? col.renderLink(record)
          : col.renderLink;
      return <Link href={href}>{record[col.dataIndex]}</Link>;
    }

    return record[col.dataIndex];
  };

  const cols = columns.map((col) => ({
    ...col,
    render: (text, record) => renderCell(col, record),
  }));

  cols.push({
    title: 'Actions',
    key: 'actions',
    render: (_, record) => {
      const editable = record[rowKey] === editingId;
      return editable ? (
        <>
          <Button type="link" onClick={save}>
            Save
          </Button>
          <Button type="link" onClick={cancel}>
            Cancel
          </Button>
        </>
      ) : (
        <Button type="link" onClick={() => edit(record)}>
          Edit
        </Button>
      );
    },
  });

  return <Table dataSource={tableData} columns={cols} rowKey={rowKey} pagination={false} />;
}
