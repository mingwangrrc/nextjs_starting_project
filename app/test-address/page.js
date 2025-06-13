import SupabaseTable from '@/components/supabase-table';
import supabase from '@/lib/supabase';

export const metadata = {
  title: 'Test Address',
};

export default async function TestAddressPage() {
  const { data } = await supabase.from('Test_Address').select('*');

  return (
    <main>
      <h1>Test Address</h1>
      <SupabaseTable data={data || []} />
    </main>
  );
}
