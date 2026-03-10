import { prisma } from '@/lib/prisma'

export async function getWallet(profileId: string) {
  return prisma.wallet.findUnique({
    where: { profileId },
  })
}

export async function getTransactions(profileId: string) {
  const wallet = await prisma.wallet.findUnique({
    where: { profileId },
    select: { id: true },
  })

  if (!wallet) return []

  return prisma.transaction.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: 'desc' },
  })
}
