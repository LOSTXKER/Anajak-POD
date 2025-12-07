import { getWallet, getTransactions } from '@/lib/mockData';
import WalletClient from './WalletClient';

export default function WalletPage() {
  const wallet = getWallet();
  const transactions = getTransactions();

  const serializedWallet = {
    balance: wallet.balance,
  };

  const serializedTransactions = transactions.map((t) => ({
    id: t.id,
    amount: t.amount,
    type: t.type,
    createdAt: t.createdAt,
  }));

  return <WalletClient wallet={serializedWallet} transactions={serializedTransactions} />;
}
