import LocationsTable from '@/components/locations-table';
import { promises as fs } from 'fs';
import path from 'path';

export const metadata = {
  title: 'Locations',
};

export default async function LocationsPage() {
  const filePath = path.join(process.cwd(), 'locations.json');
  let locationsData;
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    locationsData = JSON.parse(file);
  } catch {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/locations`);
    locationsData = await response.json();
  }

  return (
    <main>
      <h1>Locations</h1>
      <LocationsTable locations={locationsData} />
    </main>
  );
}
