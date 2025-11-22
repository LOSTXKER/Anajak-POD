'use client';

import { Bell, Plus, Search, Wallet, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonText?: string;
}

export default function Header({ 
  title, 
  subtitle, 
  showCreateButton = true,
  onCreateClick,
  createButtonText = 'ออกแบบสินค้าใหม่'
}: HeaderProps) {
  return (
    <header className="h-20 sticky top-0 z-30 px-6 lg:px-8 flex items-center justify-between bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 transition-all">
      
      {/* Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input 
            type="text" 
            placeholder="ค้นหาออเดอร์, สินค้า..." 
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all w-64 shadow-sm"
          />
        </div>

        {/* Wallet Status */}
        <div className="hidden md:flex items-center pl-4 pr-2 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-ci-blue/30 transition-colors">
          <div className="flex flex-col items-end mr-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Balance</span>
            <span className="text-sm font-bold text-slate-800 leading-none">฿4,500</span>
          </div>
          <button className="w-8 h-8 bg-ci-blue/10 hover:bg-ci-blue/20 text-ci-blue rounded-lg flex items-center justify-center transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-ci-blue hover:border-ci-blue/30 hover:shadow-md hover:-translate-y-0.5 transition-all group">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
        </button>

        {/* Create Button */}
        {showCreateButton && (
          <button 
            onClick={onCreateClick}
            className="hidden md:flex items-center px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-lg shadow-ci-blue/20 hover:shadow-ci-blue/40 hover:-translate-y-0.5 transition-all active:scale-95 bg-gradient-to-r from-ci-blue to-blue-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            {createButtonText}
          </button>
        )}
      </div>
    </header>
  );
}
