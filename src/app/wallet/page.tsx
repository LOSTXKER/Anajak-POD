import prisma from '@/lib/prisma';
import WalletClient from './WalletClient';

export default async function WalletPage() {
  // Fetch wallet for the demo user
  const user = await prisma.user.findFirst({
    where: { email: 'demo@anajak.com' },
    include: { wallet: true }
  });

  if (!user || !user.wallet) {
    return <div>Wallet not found</div>;
  }

  const transactions = await prisma.transaction.findMany({
    where: { walletId: user.wallet.id },
    orderBy: { createdAt: 'desc' }
  });

  // Serialize Decimal to Number
  const serializedWallet = {
    balance: Number(user.wallet.balance)
  };

  const serializedTransactions = transactions.map(t => ({
    id: t.id,
    amount: Number(t.amount),
    type: t.type,
    createdAt: t.createdAt
  }));

  return <WalletClient wallet={serializedWallet} transactions={serializedTransactions} />;
}
