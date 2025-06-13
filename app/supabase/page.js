import SupabaseTable from '@/components/supabase-table';
import supabase from '@/lib/supabase';

export const metadata = {
  title: 'Supabase Table',
};

export default async function SupabasePage() {
  const columns = ['id', 'address', 'path_id', 'names'];
  const { data } = await supabase.from('Test_Address').select(columns.join(', '));

  return (
    <main>
      <h1>Supabase Table</h1>
      <SupabaseTable data={data || []} />
    </main>
  );
}
