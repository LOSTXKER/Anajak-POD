'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Library, 
  ShoppingCart, 
  FolderHeart, 
  Store, 
  PlugZap, 
  Wallet, 
  BarChart3, 
  LogOut,
  CheckCircle2,
  ChevronRight,
  Users
} from 'lucide-react';

const menuItems = [
  {
    title: 'เมนูหลัก',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'ภาพรวม' },
      { href: '/dashboard/library', icon: Library, label: 'คลังของฉัน', badge: 'New' },
      { href: '/catalog', icon: Library, label: 'แคตตาล็อกสินค้า' },
      { href: '/orders', icon: ShoppingCart, label: 'รายการคำสั่งซื้อ', badge: 3 },
      { href: '/templates', icon: FolderHeart, label: 'เทมเพลตสินค้า' },
    ]
  },
  {
    title: 'เครื่องมือผู้ขาย',
    items: [
      { href: '/storefront', icon: Store, label: 'หน้าร้านของฉัน' },
      { href: '/integrations', icon: PlugZap, label: 'การเชื่อมต่อ' },
      { href: '/wallet', icon: Wallet, label: 'กระเป๋าเงิน & รายได้' },
      { href: '/reports', icon: BarChart3, label: 'รายงานยอดขาย' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100 hidden lg:flex flex-col z-40 h-screen sticky top-0 transition-all duration-300">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 mb-2">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ci-blue to-ci-red flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-ci-blue/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
              A
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-800 tracking-tight leading-none group-hover:text-ci-blue transition-colors">
              ANAJAK
            </span>
            <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
              Print on Demand
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar py-4">
        {menuItems.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <p className="px-4 text-[11px] font-bold text-slate-400/80 uppercase tracking-wider">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200 group overflow-hidden ${
                      isActive
                        ? 'bg-ci-blue/5 text-ci-blue font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-ci-blue rounded-r-full" />
                    )}
                    <Icon className={`w-5 h-5 mr-3 transition-colors ${
                      isActive ? 'text-ci-blue' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-rose-500 text-white py-0.5 px-2 rounded-full text-[10px] font-bold shadow-sm shadow-rose-200">
                        {item.badge}
                      </span>
                    )}
                    {!isActive && (
                      <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Affiliate Card (New) */}
      <div className="px-4 mb-2">
        <Link href="/affiliate" className="block bg-gradient-to-br from-ci-blue to-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-ci-blue/20 hover:shadow-ci-blue/30 hover:-translate-y-0.5 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl -mr-8 -mt-8"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-100 mb-0.5">แนะนำเพื่อน</p>
              <p className="text-[10px] text-white/80">รับค่าคอมฯ 5%</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/70 ml-auto group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm mb-3 group cursor-pointer hover:border-ci-blue/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="https://placehold.co/100x100/3973b2/ffffff?text=U" 
                className="w-10 h-10 rounded-full border border-slate-100 group-hover:ring-2 ring-ci-blue/20 transition-all"
                alt="User"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                 <CheckCircle2 className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 truncate text-sm group-hover:text-ci-blue transition-colors">คุณลูกค้า</h4>
              <div className="flex items-center text-xs text-slate-500">
                <span className="truncate">Pro Member</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-slate-50">
            <div className="flex justify-between text-[10px] font-medium mb-1.5">
              <span className="text-slate-400">ส่วนลดขั้นถัดไป</span>
              <span className="text-ci-blue font-bold">38 ชิ้น</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-ci-blue to-cyan-400 rounded-full w-[24%] animate-pulse"></div>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
          <LogOut className="w-4 h-4 mr-2" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}
