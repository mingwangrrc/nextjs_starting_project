import SupabaseTable from '@/components/supabase-table';
import supabase from '@/lib/supabase';

export const metadata = {
  title: 'Supabase Table',
};

export default async function SupabasePage() {
  const { data } = await supabase.from('Test_Address').select('*');

  return (
    <main>
      <h1>Supabase Table</h1>
      <SupabaseTable data={data || []} />
    </main>
  );
}
