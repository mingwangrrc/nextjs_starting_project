import LocationsTable from '@/components/locations-table';
import supabase from '@/lib/supabase';

export const metadata = {
  title: 'Supabase Table',
};

export default async function SupabaseTablePage() {
  const { data: tableData } = await supabase
    .from('locations')
    .select('*')
    .order('id');

  return (
    <main>
      <h1>Supabase Locations</h1>
      <LocationsTable initialLocations={tableData || []} />
    </main>
  );
}
