import SupabaseTable from '@/components/supabase-table';
import supabase from '@/lib/supabase';

export const metadata = {
  title: 'Supabase Table',
};

// Force this route to be dynamic so Supabase queries run on every request
export const dynamic = 'force-dynamic';

export default async function SupabasePage() {
  const columns = ['id', 'address', 'path_id', 'names'];
  const { data, error } = await supabase
    .from('Test_Address')
    .select(columns.join(', '));

  if (error) {
    console.error('Supabase error:', error.message);
  }

  return (
    <main>
      <h1>Supabase Table</h1>
      <SupabaseTable data={data || []} />
    </main>
  );
}
