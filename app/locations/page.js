import LocationsTable from '@/components/locations-table';
import supabase from '@/lib/supabase';

export const metadata = {
  title: 'Locations',
};

export default async function LocationsPage() {
  const { data: locationsData } = await supabase
    .from('locations')
    .select('*')
    .order('id');

  return (
    <main>
      <h1>Locations</h1>
      <LocationsTable initialLocations={locationsData} />
    </main>
  );
}
