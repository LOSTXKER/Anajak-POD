'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, MoreHorizontal, Calendar, Download, ChevronDown, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface Transaction {
  id: string;
  amount: number;
  type: string;
  createdAt: Date;
}

interface WalletData {
  balance: number;
}

interface WalletClientProps {
  wallet: WalletData;
  transactions: Transaction[];
}

export default function WalletClient({ wallet, transactions }: WalletClientProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  // Calculate stats from real data (simple version)
  const totalIncome = transactions
    .filter(t => ['SALE', 'DEPOSIT'].includes(t.type))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => ['WITHDRAWAL', 'PURCHASE'].includes(t.type))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getTransactionIcon = (type: string) => {
    const icons: Record<string, { icon: any, bg: string, text: string, label: string }> = {
      SALE: { icon: ArrowDownLeft, bg: 'bg-emerald-100', text: 'text-emerald-600', label: 'รายได้จากการขาย' },
      DEPOSIT: { icon: Wallet, bg: 'bg-ci-blue/10', text: 'text-ci-blue', label: 'เติมเงินเข้ากระเป๋า' },
      WITHDRAWAL: { icon: ArrowUpRight, bg: 'bg-rose-100', text: 'text-rose-600', label: 'ถอนเงินออก' },
      PURCHASE: { icon: CreditCard, bg: 'bg-purple-100', text: 'text-purple-600', label: 'ชำระค่าบริการ' },
    };
    
    const style = icons[type] || icons.SALE;
    const Icon = style.icon;
    
    return { Icon, style };
  };

  return (
    <DashboardLayout 
      title="กระเป๋าเงิน & รายได้"
      subtitle="ติดตามยอดเงินและธุรกรรมการเงินของคุณ"
      showCreateButton={false}
    >
      <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
        
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Balance */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-ci-blue/20 rounded-full blur-[60px] -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-[50px] -ml-16 -mb-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">ยอดเงินคงเหลือ</span>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                   <Wallet className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-8 tracking-tight">฿{wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-slate-900 hover:bg-slate-50 px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center">
                  <ArrowDownLeft className="w-4 h-4 mr-2" />
                  เติมเงิน
                </button>
                <button className="flex-1 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 active:scale-95 border border-white/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  ถอนเงิน
                </button>
              </div>
            </div>
          </div>

          {/* Total Income */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">รายได้รวม (ทั้งหมด)</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">฿{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              <div className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                +12.5%
                <span className="text-emerald-400 ml-1 font-medium">จากเดือนก่อน</span>
              </div>
            </div>
          </div>

          {/* Pending Balance */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-ci-yellow/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">รอดำเนินการ</span>
                <div className="w-10 h-10 rounded-xl bg-ci-yellow/10 flex items-center justify-center text-yellow-600">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">฿0.00</h3>
              <p className="text-sm font-medium text-slate-400">
                ไม่มีรายการค้าง
              </p>
            </div>
          </div>
        </div>

        {/* Transactions History */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">ประวัติการทำธุรกรรม</h2>
                <p className="text-sm text-slate-500">รายการเคลื่อนไหวล่าสุด</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Updated Button: Outline Slate */}
                <button className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.map((transaction) => {
              const { Icon, style } = getTransactionIcon(transaction.type);
              return (
                <div
                  key={transaction.id}
                  className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center ${style.text} shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-slate-800 text-base mb-1 group-hover:text-ci-blue transition-colors">{style.label}</h4>
                          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1">
                               <Calendar className="w-3 h-3" />
                               {format(transaction.createdAt, 'dd MMM yyyy • HH:mm', { locale: th })}
                            </span>
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                              {transaction.id.substring(0, 8)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-bold ${
                              transaction.amount > 0 ? 'text-emerald-600' : 'text-slate-800'
                            }`}
                          >
                            {transaction.amount > 0 ? '+' : ''}฿{Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 mt-1">
                            สำเร็จ
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
            <button className="text-sm font-bold text-slate-500 hover:text-ci-blue transition-colors">
              โหลดเพิ่มเติม...
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
