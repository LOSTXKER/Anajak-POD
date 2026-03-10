'use client';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { X } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonText?: string;
  headerCenter?: ReactNode;
}

export default function DashboardLayout({ 
  children, 
  title, 
  subtitle,
  showCreateButton,
  onCreateClick,
  createButtonText,
  headerCenter
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 z-50 animate-in slide-in-from-left duration-300">
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-white/90 text-slate-500 hover:text-slate-800 shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={title} 
          subtitle={subtitle}
          showCreateButton={showCreateButton}
          onCreateClick={onCreateClick}
          createButtonText={createButtonText}
          centerContent={headerCenter}
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
