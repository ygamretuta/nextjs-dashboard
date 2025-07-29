import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  return sql`
      SELECT invoices.amount, customers.name
      FROM invoices
               JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
  `;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
