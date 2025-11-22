import prisma from '@/lib/prisma';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  // Fetch aggregates
  const totalOrders = await prisma.order.count();
  
  // Calculate total sales
  const orders = await prisma.order.findMany({
    select: { totalAmount: true, status: true, createdAt: true }
  });
  
  const totalSales = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
  
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const processingOrders = orders.filter(o => o.status === 'PROCESSING').length;
  
  // Recent orders (last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentOrders = orders.filter(o => new Date(o.createdAt) >= oneWeekAgo).length;

  // Mock top products for now (would require OrderItem aggregation)
  const topProducts = [
    { title: 'เสื้อยืด Cotton 100%', sales: 48 },
    { title: 'เสื้อยืด Oversize', sales: 35 },
    { title: 'แก้วน้ำเก็บความเย็น', sales: 28 },
    { title: 'กระเป๋าผ้า Canvas', sales: 22 },
    { title: 'หมวกแก๊ป Premium', sales: 18 },
  ];

  const stats = {
    totalSales,
    totalOrders,
    pendingOrders,
    processingOrders,
    recentOrders
  };

  return <DashboardClient stats={stats} topProducts={topProducts} />;
}
