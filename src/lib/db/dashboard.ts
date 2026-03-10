import { prisma } from '@/lib/prisma'

export async function getDashboardStats(profileId: string) {
  const [orders, wallet] = await Promise.all([
    prisma.order.findMany({
      where: { profileId },
      include: {
        items: {
          include: { product: { select: { title: true } } },
        },
      },
    }),
    prisma.wallet.findUnique({
      where: { profileId },
    }),
  ])

  const totalOrders = orders.length
  const totalSales = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0)
  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length
  const processingOrders = orders.filter((o) => o.status === 'PROCESSING').length

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const recentOrders = orders.filter((o) => o.createdAt >= oneWeekAgo).length

  // Aggregate top products from order items
  const productSales = new Map<string, number>()
  for (const order of orders) {
    for (const item of order.items) {
      const title = item.product.title
      productSales.set(title, (productSales.get(title) ?? 0) + item.quantity)
    }
  }

  const topProducts = [...productSales.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([title, sales]) => ({ title, sales }))

  // Weekly sales chart data
  const dayNames = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
  const weeklySales: { day: string; amount: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    const dayEnd = new Date(dayStart.getTime() + 86400000)
    const dayTotal = orders
      .filter((o) => o.createdAt >= dayStart && o.createdAt < dayEnd)
      .reduce((sum, o) => sum + Number(o.totalAmount), 0)
    weeklySales.push({ day: dayNames[d.getDay()], amount: dayTotal })
  }

  const weeklyTotal = weeklySales.reduce((sum, d) => sum + d.amount, 0)
  const dailyAvg = weeklyTotal / 7

  return {
    stats: {
      totalSales,
      totalOrders,
      pendingOrders,
      processingOrders,
      recentOrders,
      walletBalance: wallet ? Number(wallet.balance) : 0,
    },
    topProducts,
    weeklySales,
    weeklyTotal,
    dailyAvg,
  }
}
