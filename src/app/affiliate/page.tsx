'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Users, Copy, DollarSign, TrendingUp, Share2, Gift, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'ANAJAK-8892';
  const referralLink = `https://anajak.com/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout 
      title="แนะนำเพื่อน (Affiliate)" 
      subtitle="ชวนเพื่อนมาขาย รับส่วนแบ่งรายได้ตลอดชีพ"
    >
      <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-12 shadow-xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ci-blue/20 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-ci-yellow text-xs font-bold mb-6 border border-white/10 backdrop-blur-md">
                <Gift className="w-3 h-3 mr-2" />
                โปรแกรมแนะนำเพื่อน
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                สร้างรายได้ <span className="text-transparent bg-clip-text bg-gradient-to-r from-ci-yellow to-orange-400">Passive Income</span><br />
                เพียงแชร์ลิงก์ของคุณ
              </h2>
              <p className="text-slate-300 text-lg mb-8 font-light leading-relaxed">
                รับค่าคอมมิชชั่น <span className="text-white font-bold">5%</span> จากทุกยอดขายของเพื่อนที่คุณแนะนำ ตลอดอายุการใช้งาน ไม่จำกัดจำนวนเพื่อน
              </p>
              
              {/* Copy Link Box */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl">
                <div className="flex-1 px-4 py-2 w-full text-center sm:text-left">
                  <p className="text-xs text-slate-400 mb-0.5">ลิงก์แนะนำของคุณ</p>
                  <p className="text-white font-mono text-sm truncate">{referralLink}</p>
                </div>
                <button 
                  onClick={handleCopy}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                    copied 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'คัดลอกแล้ว' : 'คัดลอกลิงก์'}
                </button>
              </div>
            </div>

            {/* Stats Cards Overlay */}
            <div className="hidden lg:grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                <div className="w-10 h-10 bg-ci-yellow/20 rounded-xl flex items-center justify-center text-ci-yellow mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">128</p>
                <p className="text-sm text-slate-400">เพื่อนที่สมัคร</p>
              </div>
              <div className="bg-gradient-to-br from-ci-blue to-blue-600 p-6 rounded-3xl shadow-xl transform translate-y-8">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">฿12,450</p>
                <p className="text-sm text-blue-100">รายได้รวมของคุณ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold">ค่าคอมมิชชั่นที่ถอนได้</p>
                <h3 className="text-2xl font-bold text-slate-800">฿2,450.00</h3>
              </div>
            </div>
            <button className="w-full py-3 bg-ci-blue text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-ci-blue/20">
              แจ้งถอนเงิน
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                 <Users className="w-6 h-6" />
               </div>
               <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">+3 คนในเดือนนี้</span>
             </div>
             <div>
               <p className="text-sm text-slate-500 font-bold">เพื่อนทั้งหมด</p>
               <h3 className="text-2xl font-bold text-slate-800">128 <span className="text-sm text-slate-400 font-normal">คน</span></h3>
             </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-6">
               <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                 <TrendingUp className="w-6 h-6" />
               </div>
             </div>
             <div>
               <p className="text-sm text-slate-500 font-bold">ยอดขายรวมจากเพื่อน</p>
               <h3 className="text-2xl font-bold text-slate-800">฿249,000</h3>
             </div>
          </div>
        </div>

        {/* How it works & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* How it works */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-lg font-bold text-slate-800">ขั้นตอนการทำงาน</h3>
            <div className="bg-white rounded-[2rem] border border-slate-100 p-6 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-8 bottom-0 w-0.5 bg-slate-100 z-0" />
              
              {[
                { step: 1, title: 'แชร์ลิงก์', desc: 'ส่งลิงก์ให้เพื่อนสมัครสมาชิก', icon: Share2, color: 'bg-blue-50 text-ci-blue' },
                { step: 2, title: 'เพื่อนขายของ', desc: 'เพื่อนเริ่มขายสินค้า POD', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
                { step: 3, title: 'รับเงินส่วนแบ่ง', desc: 'รับ 5% ทันทีเมื่อมีออเดอร์', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
              ].map((item) => (
                <div key={item.step} className="relative z-10 flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${item.color} shadow-sm border border-white`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mt-1">ขั้นตอนที่ {item.step}: {item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-ci-yellow/10 rounded-2xl p-4 border border-yellow-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-700 text-sm">เงื่อนไขการจ่ายเงิน</h4>
                <p className="text-xs text-yellow-600/80 mt-1">ระบบจะโอนเงินเข้า Wallet ของคุณอัตโนมัติทุกวันที่ 1 และ 16 ของเดือน (ยอดขั้นต่ำ 500 บาท)</p>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">ประวัติรายได้ล่าสุด</h3>
              <button className="text-sm font-bold text-ci-blue hover:underline">ดูทั้งหมด</button>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">วันที่</th>
                      <th className="px-6 py-4 font-bold">รายการ</th>
                      <th className="px-6 py-4 font-bold">จากเพื่อน</th>
                      <th className="px-6 py-4 font-bold text-right">ยอดเงิน</th>
                      <th className="px-6 py-4 font-bold text-center">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { date: '12 พ.ย. 67', desc: 'Commission (Order #8823)', from: 'Somchai.K', amount: 45.00, status: 'completed' },
                      { date: '12 พ.ย. 67', desc: 'Commission (Order #8821)', from: 'Jenny Shop', amount: 120.50, status: 'completed' },
                      { date: '11 พ.ย. 67', desc: 'Commission (Order #8809)', from: 'T-Shirt 99', amount: 85.00, status: 'pending' },
                      { date: '10 พ.ย. 67', desc: 'ถอนเงินเข้า Wallet', from: '-', amount: -1500.00, status: 'paid' },
                      { date: '09 พ.ย. 67', desc: 'Commission (Order #8755)', from: 'Somchai.K', amount: 210.00, status: 'completed' },
                    ].map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.date}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-slate-700">{item.desc}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{item.from}</td>
                        <td className={`px-6 py-4 text-right font-bold text-sm ${item.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.status === 'completed' && <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg">สำเร็จ</span>}
                          {item.status === 'pending' && <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-lg">รอตรวจสอบ</span>}
                          {item.status === 'paid' && <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">จ่ายแล้ว</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
