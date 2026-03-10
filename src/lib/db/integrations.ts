import { prisma } from '@/lib/prisma'

export async function getIntegrations(profileId: string) {
  return prisma.integration.findMany({
    where: { profileId },
    orderBy: { createdAt: 'desc' },
  })
}
