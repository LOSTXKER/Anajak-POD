import { prisma } from '@/lib/prisma'

export async function getProducts() {
  return prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'asc' },
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  })
}

export async function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { badge: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getProductsByCategory(category: string) {
  return prisma.product.findMany({
    where: {
      isPublished: true,
      suitableFor: { contains: category, mode: 'insensitive' },
    },
    orderBy: { createdAt: 'desc' },
  })
}
