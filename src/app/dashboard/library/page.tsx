'use client';

import { useState, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Download, 
  Edit2, 
  Image as ImageIcon, 
  FileText,
  FolderOpen,
  LayoutGrid,
  List
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock Data
const MOCK_ASSETS = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80', name: 'My Dog Logo', date: '2023-11-20', size: '1.2 MB', dimensions: '1024x1024' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80', name: 'Vintage Badge', date: '2023-11-18', size: '0.8 MB', dimensions: '800x800' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=300&q=80', name: 'Abstract Art', date: '2023-11-15', size: '2.5 MB', dimensions: '2048x2048' },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80', name: 'Geometric Pattern', date: '2023-11-05', size: '1.8 MB', dimensions: '1500x1500' },
];

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAssets = MOCK_ASSETS.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <DashboardLayout title="คลังรูปภาพ" subtitle="จัดการรูปภาพและไฟล์กราฟิกของคุณ">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">คลังรูปภาพ</h1>
            <p className="text-slate-500">จัดการรูปภาพและไฟล์กราฟิกของคุณ</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="file" ref={fileInputRef} className="hidden" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-ci-blue/20 hover:-translate-y-0.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>อัปโหลดรูปใหม่</span>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="ค้นหารูปภาพ..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-auto md:ml-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-ci-blue/10 text-ci-blue' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-ci-blue/10 text-ci-blue' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {filteredAssets.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-ci-blue/5 hover:border-ci-blue/30 transition-all">
                  <div className="aspect-square bg-slate-50 relative overflow-hidden">
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button className="p-2 bg-white rounded-full text-slate-700 hover:text-ci-blue hover:scale-110 transition-all" title="ดาวน์โหลด">
                         <Download className="w-4 h-4" />
                       </button>
                       <button className="p-2 bg-white rounded-full text-slate-700 hover:text-red-500 hover:scale-110 transition-all" title="ลบ">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                       <div className="min-w-0">
                          <h3 className="font-bold text-sm text-slate-800 truncate group-hover:text-ci-blue transition-colors" title={asset.name}>{asset.name}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">{asset.date}</p>
                       </div>
                       <button className="text-slate-300 hover:text-ci-blue">
                          <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                       <span>{asset.size}</span>
                       <span>{asset.dimensions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-700">ชื่อไฟล์</th>
                    <th className="px-6 py-4 font-bold text-slate-700">ประเภท</th>
                    <th className="px-6 py-4 font-bold text-slate-700">วันที่เพิ่ม</th>
                    <th className="px-6 py-4 font-bold text-slate-700">ขนาด</th>
                    <th className="px-6 py-4 font-bold text-slate-700 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                             <img src={asset.url} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold text-slate-700">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold capitalize bg-blue-50 text-blue-700">
                           รูปภาพ
                         </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{asset.date}</td>
                      <td className="px-6 py-4 text-slate-500">{asset.size}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-900" title="ดาวน์โหลด"><Download className="w-4 h-4" /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600" title="ลบ"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
               <FolderOpen className="w-8 h-8 text-slate-300" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-1">ไม่พบรูปภาพ</h3>
             <p className="text-slate-500 text-sm mb-6">ลองปรับคำค้นหาหรืออัปโหลดรูปภาพใหม่</p>
             <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:shadow transition-all">
               อัปโหลดรูปภาพ
             </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
