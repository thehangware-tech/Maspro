import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  const result = await sql`SELECT 1 as connected`;
  console.log('Database connected successfully!', result);
}

main().catch(console.error);
