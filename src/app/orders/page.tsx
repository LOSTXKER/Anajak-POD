'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronLeft, ChevronRight, Package, Clock, AlertTriangle, CheckCircle2, MoreHorizontal, Calendar } from 'lucide-react';

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const handleCreateOrder = () => {
    console.log('Create new order');
  };

  const orders = [
    {
      id: 'ORD-0082',
      date: '12 พ.ย. 2568',
      customer: 'สมชาย ใจดี',
      channel: 'Shopee',
      total: 450.00,
      items: 1,
      shipping: '-',
      status: 'problem',
      statusText: 'มีปัญหา'
    },
    {
      id: 'ORD-0081',
      date: '11 พ.ย. 2568',
      customer: 'คุณลูกค้า (ฉันเอง)',
      channel: 'Anajak.POD',
      total: 1200.00,
      items: 3,
      shipping: '-',
      status: 'pending',
      statusText: 'รอชำระเงิน'
    },
    {
      id: 'ORD-0080',
      date: '10 พ.ย. 2568',
      customer: 'จิราพร การค้า',
      channel: 'Anajak.POD',
      total: 8500.00,
      items: 12,
      shipping: 'Flash Express',
      status: 'processing',
      statusText: 'กำลังผลิต'
    },
    {
      id: 'ORD-0079',
      date: '9 พ.ย. 2568',
      customer: 'Peter Pan',
      channel: 'Anajak.POD (Pro)',
      total: 2150.00,
      items: 5,
      shipping: 'Kerry Express',
      status: 'shipped',
      statusText: 'จัดส่งแล้ว'
    },
    {
      id: 'ORD-0078',
      date: '9 พ.ย. 2568',
      customer: 'วิชัย มงคล',
      channel: 'Lazada',
      total: 390.00,
      items: 1,
      shipping: 'J&T Express',
      status: 'processing',
      statusText: 'กำลังผลิต (DTF)'
    },
  ];

  const getStatusBadge = (status: string, text: string) => {
    const styles = {
      problem: { bg: 'bg-ci-red/10', text: 'text-ci-red', border: 'border-ci-red/20', icon: AlertTriangle },
      pending: { bg: 'bg-ci-yellow/10', text: 'text-yellow-700', border: 'border-yellow-100', icon: Clock },
      processing: { bg: 'bg-ci-blue/10', text: 'text-ci-blue', border: 'border-blue-100', icon: Package },
      shipped: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: CheckCircle2 },
    };

    const style = styles[status as keyof typeof styles] || styles.pending;
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}>
        <Icon className="w-3.5 h-3.5 mr-1.5" />
        {text}
      </span>
    );
  };

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(order => order.id));
    }
  };

  return (
    <DashboardLayout 
      title="รายการคำสั่งซื้อ"
      subtitle="จัดการออเดอร์ทั้งหมดของคุณได้ที่นี่"
      showCreateButton={true}
      onCreateClick={handleCreateOrder}
      createButtonText="สร้างออเดอร์"
    >
      <div className="max-w-[1600px] mx-auto space-y-8 pb-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'ออเดอร์ทั้งหมด', value: '12', color: 'text-slate-800', bg: 'bg-white' },
            { label: 'รอชำระเงิน', value: '8', color: 'text-yellow-700', bg: 'bg-ci-yellow/10' },
            { label: 'กำลังผลิต', value: '4', color: 'text-ci-blue', bg: 'bg-ci-blue/10' },
            { label: 'จัดส่งแล้ว', value: '35', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border border-slate-100 ${stat.bg} flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-default`}>
               <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
               <span className="text-xs text-slate-500 font-medium mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          {/* Tabs & Filters Header */}
          <div className="border-b border-slate-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Tabs */}
              <div className="flex space-x-1 bg-slate-100/50 p-1 rounded-xl overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'pending', label: 'รอชำระ' },
                  { id: 'processing', label: 'กำลังผลิต' },
                  { id: 'shipped', label: 'จัดส่งแล้ว' },
                  { id: 'problem', label: 'มีปัญหา' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                   <Filter className="w-5 h-5" />
                </button>
                <button className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Search & Date Filter */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหาด้วยเลขที่ออเดอร์, ชื่อลูกค้า, เบอร์โทร..."
                  className="w-full pl-12 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all"
                />
              </div>
              <div className="relative w-full md:w-64">
                <Calendar className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-12 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue appearance-none cursor-pointer transition-all font-medium text-slate-600">
                  <option>ทุกช่วงเวลา</option>
                  <option>วันนี้</option>
                  <option>เมื่อวาน</option>
                  <option>7 วันล่าสุด</option>
                  <option>30 วันล่าสุด</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-5 text-center w-16">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === orders.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-ci-blue focus:ring-ci-blue"
                    />
                  </th>
                  <th className="px-6 py-5">ออเดอร์ #</th>
                  <th className="px-6 py-5">วันที่สั่งซื้อ</th>
                  <th className="px-6 py-5">ลูกค้า / ช่องทาง</th>
                  <th className="px-6 py-5">สถานะ</th>
                  <th className="px-6 py-5 text-right">ยอดรวม</th>
                  <th className="px-6 py-5">การจัดส่ง</th>
                  <th className="px-6 py-5 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-slate-50 transition-colors group ${selectedOrders.includes(order.id) ? 'bg-ci-blue/5' : ''}`}
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                        className="w-4 h-4 rounded border-slate-300 text-ci-blue focus:ring-ci-blue"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-700 group-hover:text-ci-blue transition-colors cursor-pointer">
                        #{order.id}
                      </span>
                      <div className="text-xs text-slate-400 mt-0.5">{order.items} รายการ</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-600">{order.date}</div>
                      <div className="text-xs text-slate-400">14:30 น.</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 text-sm">{order.customer}</div>
                      <div className="flex items-center gap-1 mt-1">
                         <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-bold border border-slate-200">
                           {order.channel}
                         </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status, order.statusText)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-bold text-slate-800">฿{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                      {order.status === 'pending' && (
                        <div className="text-[10px] text-ci-red font-medium">ยังไม่ชำระ</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 font-medium">{order.shipping}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
            <span className="text-sm text-slate-500 font-medium">
              แสดง <b>1-5</b> จาก <b>12</b> รายการ
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="p-2 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50 hover:bg-white hover:text-slate-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1 px-2">
                 <button className="w-8 h-8 rounded-lg bg-ci-blue text-white font-bold text-sm shadow-sm">1</button>
                 <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 font-bold text-sm transition-colors">2</button>
                 <button className="w-8 h-8 rounded-lg text-slate-500 hover:bg-slate-100 font-bold text-sm transition-colors">3</button>
              </div>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-700 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
