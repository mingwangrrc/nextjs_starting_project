'use client';

import { useState, useEffect } from 'react';
import { Table, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';

export default function EditableTable({ data, columns, rowKey, storageKey }) {
  const [tableData, setTableData] = useState(data);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setTableData(JSON.parse(stored));
      } catch {
        localStorage.removeItem(storageKey);
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    } else {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, storageKey]);

  const edit = (record) => {
    setEditingId(record[rowKey]);
    setFormData(record);
  };

  const cancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const save = () => {
    setTableData((prev) => {
      const updated = prev.map((row) =>
        row[rowKey] === editingId ? formData : row
      );
      if (storageKey && typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      return updated;
    });
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

    if (typeof record[col.dataIndex] === 'boolean') {
      return record[col.dataIndex] ? 'Yes' : 'No';
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
