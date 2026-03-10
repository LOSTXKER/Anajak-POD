'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Download, Filter, PieChart, Package } from 'lucide-react';
import { format } from 'date-fns';

interface ReportData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  totalItems: number;
  dailySales: { date: string; amount: number }[];
  topProducts: { title: string; qty: number; revenue: number }[];
}

export default function ReportsClient({ data }: { data: ReportData }) {
  const [dateRange, setDateRange] = useState('30 วัน');

  const maxDailySale = Math.max(...data.dailySales.map(d => d.amount), 1);

  const handleExport = () => {
    const headers = ['Date', 'Revenue'];
    const rows = data.dailySales.map(d => [d.date, d.amount.toFixed(2)]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxProductRevenue = Math.max(...data.topProducts.map(p => p.revenue), 1);

  return (
    <DashboardLayout title="รายงานยอดขาย" subtitle="วิเคราะห์ข้อมูลเชิงลึกเพื่อเพิ่มยอดขายของคุณ">
      <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
            {['7 วัน', '30 วัน', '3 เดือน', '1 ปี'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  dateRange === range 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={handleExport} className="flex items-center px-4 py-2.5 bg-ci-blue text-white rounded-xl text-sm font-bold hover:bg-ci-blueDark transition-all shadow-lg shadow-ci-blue/20">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'รายได้รวม', value: `฿${data.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500' },
            { title: 'จำนวนออเดอร์', value: data.totalOrders.toLocaleString(), icon: BarChart3, color: 'bg-ci-blue' },
            { title: 'มูลค่าเฉลี่ย/ออเดอร์', value: `฿${data.avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: TrendingUp, color: 'bg-purple-500' },
            { title: 'สินค้าที่ขายได้', value: data.totalItems.toLocaleString(), icon: Package, color: 'bg-orange-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-800">ยอดขายรายวัน</h3>
            </div>
            
            {data.dailySales.length > 0 ? (
              <>
                <div className="h-80 flex items-end justify-between gap-2 px-4">
                  {data.dailySales.map((day, i) => {
                    const pct = (day.amount / maxDailySale) * 100;
                    return (
                      <div key={i} className="w-full bg-slate-50 rounded-t-xl relative group cursor-pointer h-full flex items-end">
                        <div 
                          className="w-full bg-ci-blue/80 hover:bg-ci-blue transition-all rounded-t-xl relative"
                          style={{ height: `${Math.max(pct, 2)}%` }}
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            ฿{day.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>{data.dailySales[0]?.date}</span>
                  <span>{data.dailySales[data.dailySales.length - 1]?.date}</span>
                </div>
              </>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-400">
                <p>ยังไม่มีข้อมูลยอดขาย</p>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">สินค้าขายดี Top 5</h3>
            {data.topProducts.length > 0 ? (
              <div className="space-y-6">
                {data.topProducts.slice(0, 5).map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-700 truncate mr-2">{item.title}</span>
                      <span className="text-slate-900 whitespace-nowrap">฿{item.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-ci-blue to-cyan-400 rounded-full"
                        style={{ width: `${(item.revenue / maxProductRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">ยังไม่มีข้อมูลสินค้า</p>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
