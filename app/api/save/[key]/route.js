import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  try {
    const key = params.key;
    const data = await request.json();
    const dir = process.cwd();
    const filePath = path.join(dir, `${key}.json`);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
