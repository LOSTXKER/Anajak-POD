import { prisma } from '@/lib/prisma'

export async function getOrders(profileId: string) {
  return prisma.order.findMany({
    where: { profileId },
    include: {
      items: {
        include: {
          product: { select: { title: true, imageUrl: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getOrderById(orderId: string, profileId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, profileId },
    include: {
      items: {
        include: {
          product: true,
          design: true,
        },
      },
    },
  })
}

export async function getRecentOrders(profileId: string, limit = 5) {
  return prisma.order.findMany({
    where: { profileId },
    include: {
      items: {
        include: {
          product: { select: { title: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}
