'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Download, Filter, PieChart } from 'lucide-react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30days');

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
            <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              กำหนดเอง
            </button>
            <button className="flex items-center px-4 py-2.5 bg-ci-blue text-white rounded-xl text-sm font-bold hover:bg-ci-blueDark transition-all shadow-lg shadow-ci-blue/20">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'รายได้รวม', value: '฿124,500', change: '+12.5%', isPositive: true, icon: DollarSign, color: 'bg-emerald-500' },
            { title: 'จำนวนออเดอร์', value: '1,245', change: '+8.2%', isPositive: true, icon: BarChart3, color: 'bg-ci-blue' },
            { title: 'กำไรสุทธิ', value: '฿45,200', change: '-2.1%', isPositive: false, icon: TrendingUp, color: 'bg-purple-500' },
            { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', isPositive: true, icon: PieChart, color: 'bg-orange-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
                  stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.change}
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
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="h-80 flex items-end justify-between gap-2 px-4">
              {[65, 40, 75, 55, 80, 95, 60, 45, 70, 85, 50, 65, 90, 75, 60].map((h, i) => (
                <div key={i} className="w-full bg-slate-50 rounded-t-xl relative group cursor-pointer h-full flex items-end">
                  <div 
                    className="w-full bg-ci-blue/80 hover:bg-ci-blue transition-all rounded-t-xl relative"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      ฿{(h * 150).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>1 พ.ย.</span>
              <span>15 พ.ย.</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">สินค้าขายดี Top 5</h3>
            <div className="space-y-6">
              {[
                { name: 'Oversized Tee (Black)', sales: '฿12,500', percent: 80 },
                { name: 'Canvas Tote Bag', sales: '฿8,200', percent: 65 },
                { name: 'Ceramic Mug', sales: '฿5,400', percent: 45 },
                { name: 'Hoodie Premium', sales: '฿4,800', percent: 30 },
                { name: 'Sticker Pack', sales: '฿2,100', percent: 15 },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-700">{item.name}</span>
                    <span className="text-slate-900">{item.sales}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-ci-blue to-cyan-400 rounded-full group-hover:scale-x-105 transition-transform origin-left duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              ดูรายงานสินค้าทั้งหมด
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
