import { prisma } from '@/lib/prisma'

export async function getReportStats(profileId: string, days: number = 30) {
  const since = new Date()
  since.setDate(since.getDate() - days)

  const orders = await prisma.order.findMany({
    where: {
      profileId,
      createdAt: { gte: since },
    },
    include: {
      items: {
        include: { product: { select: { title: true } } },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const totalItems = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0,
  )

  // Sales by day (for chart)
  const salesByDay = new Map<string, number>()
  for (const order of orders) {
    const dayKey = order.createdAt.toISOString().split('T')[0]
    salesByDay.set(dayKey, (salesByDay.get(dayKey) ?? 0) + Number(order.totalAmount))
  }

  const dailySales = [...salesByDay.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, amount]) => ({ date, amount }))

  // Top products
  const productSales = new Map<string, { title: string; qty: number; revenue: number }>()
  for (const order of orders) {
    for (const item of order.items) {
      const title = item.product.title
      const existing = productSales.get(title) ?? { title, qty: 0, revenue: 0 }
      existing.qty += item.quantity
      existing.revenue += Number(item.unitPrice) * item.quantity
      productSales.set(title, existing)
    }
  }

  const topProducts = [...productSales.values()]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    totalItems,
    dailySales,
    topProducts,
  }
}
