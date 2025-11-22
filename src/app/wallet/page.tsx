'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, MoreHorizontal, Calendar, Download, ChevronDown, TrendingUp } from 'lucide-react';

export default function WalletPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const transactions = [
    {
      id: 'TXN-001',
      date: '12 พ.ย. 2568',
      time: '14:32',
      type: 'income',
      description: 'รายได้จากการขาย',
      orderRef: '#ORD-0082',
      amount: 270.00,
      status: 'completed'
    },
    {
      id: 'TXN-002',
      date: '11 พ.ย. 2568',
      time: '09:15',
      type: 'expense',
      description: 'ค่าใช้จ่ายในการผลิต',
      orderRef: '#ORD-0081',
      amount: -180.00,
      status: 'completed'
    },
    {
      id: 'TXN-003',
      date: '10 พ.ย. 2568',
      time: '16:45',
      type: 'income',
      description: 'รายได้จากการขาย (ส่งฟรี)',
      orderRef: '#ORD-0080',
      amount: 1250.00,
      status: 'completed'
    },
    {
      id: 'TXN-004',
      date: '10 พ.ย. 2568',
      time: '11:20',
      type: 'topup',
      description: 'เติมเงินเข้ากระเป๋า',
      orderRef: '-',
      amount: 5000.00,
      status: 'completed'
    },
    {
      id: 'TXN-005',
      date: '9 พ.ย. 2568',
      time: '13:30',
      type: 'withdrawal',
      description: 'ถอนเงินเข้าบัญชี xxx-xxx-1234',
      orderRef: '-',
      amount: -2500.00,
      status: 'pending'
    },
  ];

  const getTransactionIcon = (type: string) => {
    const icons = {
      income: { icon: ArrowDownLeft, bg: 'bg-emerald-100', text: 'text-emerald-600' },
      expense: { icon: ArrowUpRight, bg: 'bg-rose-100', text: 'text-rose-600' },
      topup: { icon: Wallet, bg: 'bg-ci-blue/10', text: 'text-ci-blue' },
      withdrawal: { icon: CreditCard, bg: 'bg-purple-100', text: 'text-purple-600' },
    };
    const style = icons[type as keyof typeof icons];
    const Icon = style.icon;
    
    return (
      <div className={`w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center ${style.text} shadow-sm group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
    );
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
              <h2 className="text-4xl font-bold mb-8 tracking-tight">฿4,500.00</h2>
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
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">รายได้รวม (เดือนนี้)</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">฿8,450.00</h3>
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
              <h3 className="text-3xl font-bold text-slate-800 mb-2">฿2,500.00</h3>
              <p className="text-sm font-medium text-slate-400">
                คาดว่าจะได้รับภายใน 24 ชม.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
             <div className="flex items-center justify-between mb-8">
               <div>
                 <h3 className="text-xl font-bold text-slate-800">วิเคราะห์รายได้</h3>
                 <p className="text-sm text-slate-500 mt-1">ภาพรวมกระแสเงินสดของคุณ</p>
               </div>
               <div className="flex bg-slate-100 p-1 rounded-xl">
                 {['7 วัน', '30 วัน', 'ปีนี้'].map((period, idx) => (
                   <button 
                    key={idx}
                    className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${idx === 1 ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     {period}
                   </button>
                 ))}
               </div>
             </div>
             
             {/* Mock Chart */}
             <div className="h-64 w-full bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100 flex items-end justify-between px-6 pb-0 pt-6 relative overflow-hidden">
                {/* Grid lines */}
                <div className="absolute inset-0 px-6 py-6 flex flex-col justify-between pointer-events-none">
                   <div className="w-full h-[1px] bg-slate-100"></div>
                   <div className="w-full h-[1px] bg-slate-100"></div>
                   <div className="w-full h-[1px] bg-slate-100"></div>
                   <div className="w-full h-[1px] bg-slate-100"></div>
                </div>
                
                {/* Bars */}
                {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 100].map((h, i) => (
                  <div key={i} className="w-full mx-1 bg-ci-blue/10 rounded-t-lg relative group hover:bg-ci-blue/20 transition-colors" style={{ height: `${h}%` }}>
                     <div className="absolute bottom-0 left-0 right-0 bg-ci-blue w-full rounded-t-lg opacity-80" style={{ height: `${h * 0.4}%` }}></div>
                     
                     {/* Tooltip */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                       ฿{(h * 100).toLocaleString()}
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Quick Actions / Summary */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
             <h3 className="text-xl font-bold text-slate-800 mb-6">สรุปประจำเดือน</h3>
             <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <ArrowDownLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">รายรับ</p>
                      <p className="text-lg font-bold text-emerald-600">+฿12,450</p>
                    </div>
                  </div>
               </div>
               
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">รายจ่าย</p>
                      <p className="text-lg font-bold text-rose-600">-฿4,200</p>
                    </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-100">
                 <p className="text-sm text-slate-500 mb-4">ยอดขายสูงสุดของคุณมาจากสินค้าประเภท <span className="font-bold text-slate-800">T-Shirts</span></p>
                 <button className="w-full py-3 text-sm font-bold text-ci-blue bg-ci-blue/10 hover:bg-ci-blue/20 rounded-xl transition-colors">
                   ดูรายงานฉบับเต็ม
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Transactions History */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">ประวัติการทำธุรกรรม</h2>
                <p className="text-sm text-slate-500">รายการเคลื่อนไหวล่าสุดทั้งหมด 48 รายการ</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                   <select className="appearance-none bg-white pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-ci-blue/20 cursor-pointer hover:border-slate-300">
                     <option>ทุกประเภท</option>
                     <option>รายได้</option>
                     <option>ค่าใช้จ่าย</option>
                   </select>
                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                <button className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  {getTransactionIcon(transaction.type)}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1 group-hover:text-ci-blue transition-colors">{transaction.description}</h4>
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1">
                             <Calendar className="w-3 h-3" />
                             {transaction.date} • {transaction.time}
                          </span>
                          {transaction.orderRef !== '-' && (
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                              {transaction.orderRef}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            transaction.amount > 0 ? 'text-emerald-600' : 'text-slate-800'
                          }`}
                        >
                          {transaction.amount > 0 ? '+' : ''}฿{Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        {transaction.status === 'pending' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-ci-yellow/10 text-yellow-700 mt-1">
                            รอดำเนินการ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
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
