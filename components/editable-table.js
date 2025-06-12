'use client';

import { useState, useEffect } from 'react';
import { Table, Input, Button, Checkbox, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function EditableTable({ data, columns, rowKey, storageKey }) {
  const [tableData, setTableData] = useState(data);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addedRowId, setAddedRowId] = useState(null);

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

  useEffect(() => {
    const updateLogin = () => {
      if (typeof window === 'undefined') return;
      try {
        setIsLoggedIn(!!localStorage.getItem('currentUser'));
      } catch {
        setIsLoggedIn(false);
      }
    };

    updateLogin();
    window.addEventListener('userChange', updateLogin);
    return () => window.removeEventListener('userChange', updateLogin);
  }, []);

  const edit = (record) => {
    if (!isLoggedIn) return;
    setEditingId(record[rowKey]);
    setFormData(record);
  };

  const cancel = () => {
    if (addedRowId) {
      setTableData((prev) => prev.filter((row) => row[rowKey] !== addedRowId));
      setAddedRowId(null);
    }
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
    setAddedRowId(null);
    cancel();
  };

  const deleteRow = (id) => {
    setTableData((prev) => {
      const updated = prev.filter((row) => row[rowKey] !== id);
      if (storageKey && typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      return updated;
    });
    if (editingId === id) {
      cancel();
    }
    if (addedRowId === id) {
      setAddedRowId(null);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addRow = () => {
    if (!isLoggedIn) return;
    const newId =
      tableData.reduce((max, row) => Math.max(max, row[rowKey]), 0) + 1;
    const newRow = { [rowKey]: newId };
    columns.forEach((col) => {
      if (col.dataIndex !== rowKey) {
        newRow[col.dataIndex] = col.dataIndex === 'completed' ? false : '';
      }
    });
    setTableData((prev) => [...prev, newRow]);
    setEditingId(newId);
    setFormData(newRow);
    setAddedRowId(newId);
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

  if (isLoggedIn) {
    cols.push({
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const editable = record[rowKey] === editingId;
        return editable ? (
          <>
            <Button key="save" type="link" onClick={save}>
              Save
            </Button>
            <Button key="cancel" type="link" onClick={cancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => edit(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete this item?"
              onConfirm={() => deleteRow(record[rowKey])}
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    });
  }

  const filteredData = tableData.filter((row) => {
    if (!search) return true;
    const values = Object.values(row).join(' ').toLowerCase();
    return values.includes(search.toLowerCase());
  });

  return (
    <>
      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16 }}
        allowClear
      />
      <Table
        dataSource={filteredData}
        columns={cols}
        rowKey={rowKey}
        pagination={false}
      />
      {isLoggedIn && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={addRow}
          style={{ position: 'fixed', bottom: 24, right: 24 }}
        />
      )}
    </>
  );
}
