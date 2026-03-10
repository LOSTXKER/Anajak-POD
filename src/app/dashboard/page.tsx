import { getDashboardStats as getDashboardStatsMock } from '@/lib/mockData';
import { getDashboardStats as getDashboardStatsFromDB } from '@/lib/db/dashboard';
import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  let stats;
  let topProducts;
  let weeklySales: { day: string; amount: number }[] = [];
  let weeklyTotal = 0;
  let dailyAvg = 0;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const dbStats = await getDashboardStatsFromDB(user.id);
      stats = dbStats.stats;
      topProducts = dbStats.topProducts;
      weeklySales = dbStats.weeklySales;
      weeklyTotal = dbStats.weeklyTotal;
      dailyAvg = dbStats.dailyAvg;
    }
  } catch {
    // Database not available
  }

  if (!stats) {
    const mockData = getDashboardStatsMock();
    stats = mockData.stats;
    topProducts = mockData.topProducts;
  }

  return (
    <DashboardClient
      stats={stats}
      topProducts={topProducts!}
      weeklySales={weeklySales}
      weeklyTotal={weeklyTotal}
      dailyAvg={dailyAvg}
    />
  );
}
