'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Search, Filter, Grid3x3, List, Edit2, Trash2, Copy, Eye, MoreHorizontal, Plus, Calendar, SlidersHorizontal, CheckCircle2, Clock, AlertCircle, ShoppingCart, Package, PenTool, Globe, Lock, MoreVertical } from 'lucide-react';
import { publishDesign, deleteDesign } from '@/app/actions/designs';

export default function TemplatesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<number | string | null>(null);

  interface Template {
    id: string | number;
    name: string;
    productType: string;
    updatedAt: string;
    status: string;
    price: number;
    cost: number;
    profit: number;
    image: string;
    variants: number;
    previewImage?: string;
    productName?: string;
  }

  const [templates, setTemplates] = useState<Template[]>([]);

  const statuses = useMemo(() => [
    { id: 'all', name: 'ทั้งหมด', count: templates.length },
    { id: 'published', name: 'วางขายแล้ว', count: templates.filter(t => t.status === 'published').length },
    { id: 'draft', name: 'แบบร่าง', count: templates.filter(t => t.status === 'draft').length },
    { id: 'private', name: 'ส่วนตัว', count: templates.filter(t => t.status === 'private').length },
  ], [templates]);

  useEffect(() => {
    const MOCK_TEMPLATES = [
      {
        id: 1,
        name: 'My Cool Summer T-Shirt',
        productType: 'Gildan Premium Cotton',
        updatedAt: '2 นาทีที่แล้ว',
        status: 'draft',
        price: 450,
        cost: 210,
        profit: 240,
        image: 'bg-blue-50',
        variants: 4
      },
      {
        id: 2,
        name: 'Minimalist Logo Hoodie',
        productType: 'Premium Pullover Hoodie',
        updatedAt: '2 ชั่วโมงที่แล้ว',
        status: 'published',
        price: 890,
        cost: 450,
        profit: 440,
        image: 'bg-slate-100',
        variants: 6
      },
      {
        id: 3,
        name: 'Staff Uniform 2024',
        productType: 'Polo Shirt',
        updatedAt: '1 วันที่แล้ว',
        status: 'private',
        price: 350,
        cost: 280,
        profit: 70,
        image: 'bg-indigo-50',
        variants: 2
      },
      {
        id: 4,
        name: 'Coffee Mug - Cats Lover',
        productType: 'Ceramic Mug 11oz',
        updatedAt: '3 วันที่แล้ว',
        status: 'published',
        price: 290,
        cost: 120,
        profit: 170,
        image: 'bg-amber-50',
        variants: 1
      },
      {
        id: 5,
        name: 'Tote Bag - Save Earth',
        productType: 'Canvas Tote Bag',
        updatedAt: '5 วันที่แล้ว',
        status: 'published',
        price: 199,
        cost: 85,
        profit: 114,
        image: 'bg-green-50',
        variants: 1
      },
      {
        id: 6,
        name: 'Red Typography Tee',
        productType: 'Anajak Oversized Tee',
        updatedAt: '1 สัปดาห์ที่แล้ว',
        status: 'draft',
        price: 590,
        cost: 250,
        profit: 340,
        image: 'bg-red-50',
        variants: 3
      }
    ];

    const saved = localStorage.getItem('anajak_templates');
    let savedTemplates: Template[] = [];
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            savedTemplates = parsed.map((item: Partial<Template> & { productName?: string }) => ({
                ...item,
                productType: item.productName || 'Custom Product',
                updatedAt: 'เมื่อสักครู่',
                cost: Math.round((item.price ?? 0) * 0.6),
                profit: Math.round((item.price ?? 0) * 0.4),
                image: '',
            }));
        } catch (e) { console.error(e); }
    }
    
    setTemplates([...savedTemplates, ...MOCK_TEMPLATES]);
  }, []);

  const handleUpdateStatus = (id: number | string, newStatus: string) => {
    const updatedTemplates = templates.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTemplates(updatedTemplates);
    setActiveDropdown(null);

    const saved = localStorage.getItem('anajak_templates');
    if (saved) {
      const parsed = JSON.parse(saved);
      const updatedSaved = parsed.map((t: Partial<Template>) =>
        t.id === id ? { ...t, status: newStatus } : t
      );
      localStorage.setItem('anajak_templates', JSON.stringify(updatedSaved));
    }

    if (typeof id === 'string' && newStatus === 'published') {
      publishDesign(id).catch(() => {});
    }
  };

  const handleDeleteTemplate = (id: number | string) => {
    if (!confirm('คุณต้องการลบผลงานนี้หรือไม่?')) return;
    setTemplates(prev => prev.filter(t => t.id !== id));
    setActiveDropdown(null);

    const saved = localStorage.getItem('anajak_templates');
    if (saved) {
      const parsed = JSON.parse(saved);
      localStorage.setItem('anajak_templates', JSON.stringify(parsed.filter((t: Partial<Template>) => t.id !== id)));
    }

    if (typeof id === 'string') {
      deleteDesign(id).catch(() => {});
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchStatus = selectedStatus === 'all' || template.status === selectedStatus;
    const matchSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-3 h-3 mr-1.5" />
            วางขายแล้ว
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600">
            <Edit2 className="w-3 h-3 mr-1.5" />
            แบบร่าง
          </span>
        );
      case 'private':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">
            <Eye className="w-3 h-3 mr-1.5" />
            ส่วนตัว
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="ผลงานของฉัน (My Designs)" subtitle="จัดการแบบร่างและสินค้าที่คุณออกแบบไว้" showCreateButton={true} createButtonText="ออกแบบสินค้าใหม่">
      <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
        
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-10 text-white shadow-2xl shadow-slate-200 group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-ci-blue/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold text-ci-yellow mb-4">
                <PenTool className="w-3 h-3" />
                Creative Studio
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                จัดการผลงานและสั่งผลิตสินค้า
              </h2>
              <p className="text-slate-400 max-w-xl text-lg font-light">
                รวมทุกดีไซน์ของคุณไว้ที่นี่ สั่งผลิตสินค้าตัวอย่าง หรือเริ่มขายจริงได้ทันที
              </p>
            </div>
            
            <div className="flex gap-4 shrink-0">
              <div className="text-center px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white mb-1">{statuses.find(s => s.id === 'all')?.count ?? 0}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">ผลงานทั้งหมด</p>
              </div>
              <div className="text-center px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-3xl font-bold text-emerald-400 mb-1">{statuses.find(s => s.id === 'published')?.count ?? 0}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">วางขายแล้ว</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-sm relative z-30">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Status Tabs */}
            <div className="flex bg-slate-100/80 p-1.5 rounded-2xl overflow-x-auto no-scrollbar max-w-full w-full md:w-auto">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    selectedStatus === status.id
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {status.name}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${
                    selectedStatus === status.id ? 'bg-slate-100 text-slate-600' : 'bg-white text-slate-400'
                  }`}>
                    {status.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="ค้นหาผลงาน..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all"
                />
              </div>
              
              <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Content */}
        {filteredTemplates.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : 'flex-col'}`}
              >
                {/* Image Area */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 rounded-2xl' : 'aspect-square'} ${template.image || 'bg-slate-100'} flex-shrink-0`}>
                  {template.previewImage ? (
                    <img src={template.previewImage} alt={template.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400/40 p-8 text-center">
                      <div className="flex flex-col items-center transform group-hover:scale-110 transition-transform duration-500">
                        <span className="text-4xl mb-2 opacity-50">👕</span>
                      </div>
                    </div>
                  )}

                  {/* Floating Actions (Hover) */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <button onClick={() => window.location.href = '/designer'} className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-lg hover:scale-110 hover:text-ci-blue transition-all" title="แก้ไขดีไซน์">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteTemplate(template.id)} className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-lg hover:scale-110 hover:text-ci-red transition-all" title="ลบ">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Status Badge (Absolute for Grid) */}
                  {viewMode === 'grid' && (
                    <div className="absolute top-4 left-4 z-10">
                      {getStatusBadge(template.status)}
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div className={`flex-1 flex flex-col ${viewMode === 'grid' ? 'p-6' : 'py-2 pr-4'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{template.productType}</p>
                      <h3 className="font-bold text-slate-800 text-lg line-clamp-1 group-hover:text-ci-blue transition-colors cursor-pointer">
                        {template.name}
                      </h3>
                    </div>
                    {viewMode === 'list' && (
                      <div className="ml-4">
                        {getStatusBadge(template.status)}
                      </div>
                    )}
                    {viewMode === 'grid' && (
                      <div className="relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === template.id ? null : template.id)}
                          className="text-slate-300 hover:text-slate-600 transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {activeDropdown === template.id && (
                          <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-1">
                              <button 
                                onClick={() => handleUpdateStatus(template.id, 'published')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${template.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
                              >
                                <Globe className="w-4 h-4" />
                                <span>วางขาย (Public)</span>
                                {template.status === 'published' && <CheckCircle2 className="w-3 h-3 ml-auto" />}
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(template.id, 'private')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${template.status === 'private' ? 'bg-amber-50 text-amber-600' : 'text-slate-600 hover:bg-slate-50'}`}
                              >
                                <Lock className="w-4 h-4" />
                                <span>ส่วนตัว (Private)</span>
                                {template.status === 'private' && <CheckCircle2 className="w-3 h-3 ml-auto" />}
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(template.id, 'draft')}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${template.status === 'draft' ? 'bg-slate-100 text-slate-600' : 'text-slate-600 hover:bg-slate-50'}`}
                              >
                                <Edit2 className="w-4 h-4" />
                                <span>แบบร่าง (Draft)</span>
                                {template.status === 'draft' && <CheckCircle2 className="w-3 h-3 ml-auto" />}
                              </button>
                            </div>
                            <div className="border-t border-slate-100 p-1">
                               <button
                                  onClick={() => handleDeleteTemplate(template.id)}
                                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                               >
                                  <Trash2 className="w-4 h-4" />
                                  <span>ลบผลงาน</span>
                               </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5" />
                      {template.updatedAt}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      {template.variants} แบบ
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">กำไร/ชิ้น</p>
                        <div className="flex items-center gap-1.5">
                           <span className="text-lg font-extrabold text-emerald-600">+฿{template.profit}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">ราคาขาย</p>
                        <span className="text-sm font-bold text-slate-700">฿{template.price}</span>
                      </div>
                    </div>

                  <div className="flex gap-2">
                    {template.status === 'draft' ? (
                      <>
                        <button onClick={() => window.location.href = '/designer'} className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                          <Edit2 className="w-4 h-4" />
                          แก้ไข
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(template.id, 'published')}
                          className="flex-1 py-2.5 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-xl hover:bg-emerald-200 transition-all flex items-center justify-center gap-2"
                        >
                          <Globe className="w-4 h-4" />
                          วางขาย
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          const cartItem = { id: template.id, name: template.name, productType: template.productType, price: template.price, cost: template.cost, quantity: 1, image: template.previewImage || '' };
                          const existing = JSON.parse(localStorage.getItem('anajak_cart') || '[]');
                          existing.push(cartItem);
                          localStorage.setItem('anajak_cart', JSON.stringify(existing));
                          window.location.href = '/cart';
                        }}
                        className="flex-1 py-2.5 bg-ci-blue text-white text-sm font-bold rounded-xl hover:bg-ci-blueDark shadow-lg shadow-ci-blue/20 transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        สั่งผลิตเลย
                      </button>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Card */}
            <button onClick={() => window.location.href = '/designer'} className="group flex flex-col items-center justify-center min-h-[300px] bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-ci-blue/50 hover:bg-blue-50/30 transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all mb-4 text-ci-blue">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-600 group-hover:text-ci-blue transition-colors">สร้างผลงานใหม่</h3>
              <p className="text-sm text-slate-400 mt-1">เริ่มออกแบบสินค้าของคุณ</p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">ไม่พบผลงานที่ค้นหา</h3>
            <p className="text-slate-500">ลองเปลี่ยนคำค้นหา หรือตัวกรองสถานะดูใหม่อีกครั้ง</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedStatus('all'); }}
              className="mt-6 text-ci-blue font-bold hover:underline"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
