'use client';

import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Checkbox, Popconfirm, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import supabase from '@/lib/supabase';

const getValue = (obj, path) =>
  path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);

const setValue = (obj, path, value) => {
  const keys = path.split('.');
  const last = keys.pop();
  const newObj = { ...obj };
  let curr = newObj;
  for (const k of keys) {
    curr[k] = { ...(curr[k] || {}) };
    curr = curr[k];
  }
  curr[last] = value;
  return newObj;
};

export default function EditableTable({ data, columns, rowKey, storageKey }) {
  const [tableData, setTableData] = useState(data);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addedRowId, setAddedRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, tableData.length]);

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
    setFormData(JSON.parse(JSON.stringify(record)));
  };

  const cancel = () => {
    if (addedRowId) {
      setTableData((prev) => prev.filter((row) => row[rowKey] !== addedRowId));
      setAddedRowId(null);
    }
    setEditingId(null);
    setFormData({});
  };

  const persist = async (key, data) => {
    try {
      await fetch(`/api/save/${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // ignore errors writing to disk
    }
  };

  const save = async () => {
    setTableData((prev) => {
      const updated = prev.map((row) =>
        row[rowKey] === editingId ? formData : row
      );
      if (storageKey && typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(updated));
        persist(storageKey, updated);
      }
      return updated;
    });
    if (storageKey === 'locations') {
      try {
        if (addedRowId) {
          await supabase.from('locations').insert(formData);
        } else {
          await supabase
            .from('locations')
            .update(formData)
            .eq('id', editingId);
        }
      } catch {
        // ignore errors updating supabase
      }
    }
    setAddedRowId(null);
    cancel();
  };

  const deleteRow = async (id) => {
    setTableData((prev) => {
      const updated = prev.filter((row) => row[rowKey] !== id);
      if (storageKey && typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(updated));
        persist(storageKey, updated);
      }
      return updated;
    });
    if (storageKey === 'locations') {
      try {
        await supabase.from('locations').delete().eq('id', id);
      } catch {
        // ignore errors deleting from supabase
      }
    }
    if (editingId === id) {
      cancel();
    }
    if (addedRowId === id) {
      setAddedRowId(null);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => setValue(prev, key, value));
  };

  const addRow = () => {
    if (!isLoggedIn) return;
    const newId =
      tableData.reduce((max, row) => Math.max(max, row[rowKey]), 0) + 1;
    let newRow = { [rowKey]: newId };
    columns.forEach((col) => {
      if (col.dataIndex !== rowKey) {
        newRow = setValue(
          newRow,
          col.dataIndex,
          col.dataIndex === 'completed' ? false : ''
        );
      }
    });
    setTableData((prev) => [newRow, ...prev]);
    setCurrentPage(1);
    setEditingId(newId);
    setFormData(newRow);
    setAddedRowId(newId);
  };

  const renderCell = (col, record) => {
    const isEditing = record[rowKey] === editingId;
    const value = getValue(formData, col.dataIndex);
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
      return <Link href={href}>{getValue(record, col.dataIndex)}</Link>;
    }

    const cellValue = getValue(record, col.dataIndex);

    if (typeof cellValue === 'boolean') {
      return cellValue ? 'Yes' : 'No';
    }

    return cellValue;
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

  const collectValues = (obj) =>
    Object.values(obj)
      .map((v) => (v && typeof v === 'object' ? collectValues(v) : String(v)))
      .join(' ');

  const filteredData = tableData.filter((row) => {
    if (!search) return true;
    const values = collectValues(row).toLowerCase();
    return values.includes(search.toLowerCase());
  });
  const pagedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const tableName = storageKey
    ? storageKey.charAt(0).toUpperCase() + storageKey.slice(1)
    : '';

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ marginRight: 8 }}
        />
        {isLoggedIn && (
          <Button
            icon={<PlusOutlined />}
            onClick={addRow}
            style={{
              backgroundColor: '#55ab68',
              borderColor: '#55ab68',
              borderRadius: 30,
              color: '#fff',
            }}
          >
            {tableName}
          </Button>
        )}
      </div>
      <Table
        dataSource={pagedData}
        columns={cols}
        rowKey={rowKey}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
      {/* Add button moved to the header */}
    </>
  );
}
