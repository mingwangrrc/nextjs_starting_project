'use client';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import EditableTable from './editable-table';

export default function LocationsTable({ initialLocations }) {
  const [locations, setLocations] = useState(initialLocations);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('locations')
        .select('*')
        .order('id');
      if (data) setLocations(data);
    }
    load();

    const channel = supabase
      .channel('public:locations')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'locations' },
        (payload) => {
          setLocations((prev) => {
            if (payload.eventType === 'INSERT') {
              return [...prev, payload.new];
            }
            if (payload.eventType === 'UPDATE') {
              return prev.map((row) =>
                row.id === payload.new.id ? payload.new : row
              );
            }
            if (payload.eventType === 'DELETE') {
              return prev.filter((row) => row.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
