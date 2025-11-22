'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronLeft, ChevronRight, Package, Clock, AlertTriangle, CheckCircle2, MoreHorizontal, Calendar, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    title: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  createdAt: Date;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  user: {
    name: string | null;
  };
}

interface OrdersClientProps {
  initialOrders: Order[];
}

export default function OrdersClient({ initialOrders }: OrdersClientProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Filter orders based on activeTab
  const filteredOrders = activeTab === 'all' 
    ? initialOrders 
    : initialOrders.filter(o => o.status === activeTab.toUpperCase());

  const handleCreateOrder = () => {
    console.log('Create new order');
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string, text: string, border: string, icon: any, label: string }> = {
      CANCELLED: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', icon: XCircle, label: 'ยกเลิก' },
      PENDING: { bg: 'bg-ci-yellow/10', text: 'text-yellow-700', border: 'border-yellow-100', icon: Clock, label: 'รอชำระ' },
      PROCESSING: { bg: 'bg-ci-blue/10', text: 'text-ci-blue', border: 'border-blue-100', icon: Package, label: 'กำลังผลิต' },
      SHIPPED: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', icon: Package, label: 'จัดส่งแล้ว' },
      DELIVERED: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: CheckCircle2, label: 'สำเร็จ' },
    };

    const style = styles[status] || styles.PENDING;
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}>
        <Icon className="w-3.5 h-3.5 mr-1.5" />
        {style.label}
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
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
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
            { label: 'ออเดอร์ทั้งหมด', value: initialOrders.length, color: 'text-slate-800', bg: 'bg-white' },
            { label: 'รอชำระเงิน', value: initialOrders.filter(o => o.status === 'PENDING').length, color: 'text-yellow-700', bg: 'bg-ci-yellow/10' },
            { label: 'กำลังผลิต', value: initialOrders.filter(o => o.status === 'PROCESSING').length, color: 'text-ci-blue', bg: 'bg-ci-blue/10' },
            { label: 'สำเร็จ', value: initialOrders.filter(o => o.status === 'DELIVERED').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
              {/* Tabs - Updated Style to match Catalog */}
              <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'pending', label: 'รอชำระ' },
                  { id: 'processing', label: 'กำลังผลิต' },
                  { id: 'shipped', label: 'จัดส่งแล้ว' },
                  { id: 'delivered', label: 'สำเร็จ' },
                  { id: 'cancelled', label: 'ยกเลิก' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-bold rounded-xl whitespace-nowrap flex-shrink-0 transition-all border ${
                      activeTab === tab.id
                        ? 'bg-ci-blue text-white border-ci-blue shadow-md shadow-ci-blue/20'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                   <Filter className="w-5 h-5" />
                </button>
                {/* Updated Button: Outline Slate */}
                <button className="flex items-center px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors">
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
                  className="w-full pl-12 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all hover:border-slate-300"
                />
              </div>
              <div className="relative w-full md:w-64">
                <Calendar className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-12 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue appearance-none cursor-pointer transition-all font-medium text-slate-600 hover:border-slate-300">
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
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-ci-blue focus:ring-ci-blue"
                    />
                  </th>
                  <th className="px-6 py-5">ออเดอร์ #</th>
                  <th className="px-6 py-5">วันที่สั่งซื้อ</th>
                  <th className="px-6 py-5">ลูกค้า / ช่องทาง</th>
                  <th className="px-6 py-5">สถานะ</th>
                  <th className="px-6 py-5 text-right">ยอดรวม</th>
                  <th className="px-6 py-5">สินค้า</th>
                  <th className="px-6 py-5 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-slate-500">
                      ไม่พบรายการคำสั่งซื้อในสถานะนี้
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
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
                          #{order.orderNumber}
                        </span>
                        <div className="text-xs text-slate-400 mt-0.5">{order.items.length} รายการ</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-600">
                          {format(new Date(order.createdAt), 'dd MMM yyyy', { locale: th })}
                        </div>
                        <div className="text-xs text-slate-400">
                          {format(new Date(order.createdAt), 'HH:mm')} น.
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-sm">{order.user.name || 'ลูกค้าทั่วไป'}</div>
                        <div className="flex items-center gap-1 mt-1">
                           <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-bold border border-slate-200">
                             Anajak Store
                           </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-slate-800">฿{Number(order.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        {order.status === 'PENDING' && (
                          <div className="text-[10px] text-ci-red font-medium">ยังไม่ชำระ</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 font-medium truncate max-w-[150px]">
                          {order.items[0]?.product.title}
                          {order.items.length > 1 && ` (+${order.items.length - 1})`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
            <span className="text-sm text-slate-500 font-medium">
              แสดง <b>{filteredOrders.length > 0 ? 1 : 0}-{filteredOrders.length}</b> จาก <b>{filteredOrders.length}</b> รายการ
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
