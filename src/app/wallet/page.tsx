import { getWallet as getWalletMock, getTransactions as getTransactionsMock } from '@/lib/mockData';
import { getWallet as getWalletFromDB, getTransactions as getTransactionsFromDB } from '@/lib/db/wallet';
import { createClient } from '@/lib/supabase/server';
import WalletClient from './WalletClient';

export default async function WalletPage() {
  let walletData;
  let transactionsData;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const dbWallet = await getWalletFromDB(user.id);
      const dbTransactions = await getTransactionsFromDB(user.id);

      if (dbWallet) {
        walletData = { balance: Number(dbWallet.balance) };
        transactionsData = dbTransactions.map((t) => ({
          id: t.id,
          amount: Number(t.amount),
          type: t.type,
          createdAt: t.createdAt,
        }));
      }
    }
  } catch {
    // Database not available
  }

  if (!walletData) {
    const mockWallet = getWalletMock();
    const mockTransactions = getTransactionsMock();
    walletData = { balance: mockWallet.balance };
    transactionsData = mockTransactions.map((t) => ({
      id: t.id,
      amount: t.amount,
      type: t.type,
      createdAt: t.createdAt,
    }));
  }

  return <WalletClient wallet={walletData} transactions={transactionsData!} />;
}
