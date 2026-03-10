import { createClient } from '@/lib/supabase/server';
import { getReportStats } from '@/lib/db/reports';
import ReportsClient from './ReportsClient';

export default async function ReportsPage() {
  let data = {
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    totalItems: 0,
    dailySales: [] as { date: string; amount: number }[],
    topProducts: [] as { title: string; qty: number; revenue: number }[],
  };

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      data = await getReportStats(user.id, 30);
    }
  } catch {
    // DB not available, use empty data
  }

  return <ReportsClient data={data} />;
}
