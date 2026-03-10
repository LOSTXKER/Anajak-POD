import { prisma } from '@/lib/prisma'

export async function getDesigns(profileId: string) {
  return prisma.design.findMany({
    where: { profileId },
    include: {
      product: { select: { title: true, imageUrl: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })
}

export async function getDesignById(designId: string, profileId: string) {
  return prisma.design.findFirst({
    where: { id: designId, profileId },
    include: { product: true },
  })
}
