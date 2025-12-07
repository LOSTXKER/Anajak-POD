import { getDashboardStats } from '@/lib/mockData';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  const { stats, topProducts } = getDashboardStats();

  return <DashboardClient stats={stats} topProducts={topProducts} />;
}
