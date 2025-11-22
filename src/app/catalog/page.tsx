'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Search, SlidersHorizontal, ArrowRight, Ruler, Palette as PaletteIcon, Printer, Truck, Heart, Tag, ChevronDown } from 'lucide-react';

const products = [
  { name: 'Gildan Premium Cotton', sizes: 'XS - 3XL', colors: 24, methods: 'DTG, DTF', delivery: '1-3 วัน', price: 150, memberPrice: 145, badge: 'ขายดีที่สุด 🏆' },
  { name: 'Anajak Oversized Tee', sizes: 'S - 2XL', colors: 8, methods: 'DTG, DTF', delivery: '1-3 วัน', price: 220, memberPrice: 210, badge: 'มาใหม่ ✨', badgeColor: 'purple' },
  { name: 'Standard Canvas Tote', sizes: '14" x 16"', colors: 2, methods: 'DTF, Subli', delivery: '1-2 วัน', price: 85, memberPrice: 80 },
  { name: 'Premium Pullover Hoodie', sizes: 'S - 3XL', colors: 12, methods: 'DTF Only', delivery: '2-4 วัน', price: 450, memberPrice: 435 },
  { name: 'Basic Cap', sizes: 'One Size', colors: 6, methods: 'DTF, Embroid', delivery: '3-5 วัน', price: 180, memberPrice: 170 },
  { name: 'Ceramic Mug 11oz', sizes: '11oz', colors: 1, methods: 'Sublimation', delivery: '1-2 วัน', price: 120, memberPrice: 110, badge: 'กำไรสูง 💰', badgeColor: 'green' },
];

export default function CatalogPage() {
  return (
    <DashboardLayout title="สินค้าทั้งหมด" showCreateButton={false}>
      <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
        {/* Promotion Banner */}
        <div 
          className="rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden flex items-center shadow-2xl shadow-ci-blue/20 group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-[20s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-ci-blue/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center px-4 py-1.5 bg-white/10 text-ci-yellow text-xs font-bold rounded-full mb-6 backdrop-blur-md border border-white/10">
              🔥 Hot Item of the Month
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Oversized Tee Collection<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Streetwear Style</span>
            </h2>
            <p className="text-slate-300 mb-8 text-lg font-light max-w-lg leading-relaxed">
              ทรงสวย ผ้าหนานุ่ม สไตล์เกาหลี เหมาะสำหรับทำแบรนด์ Streetwear กำไรต่อตัวสูงถึง 150 บาท
            </p>
            <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-50 hover:scale-105 transition-all shadow-lg flex items-center">
              ดูรายละเอียดสินค้า
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="relative z-30 -mx-4 px-4 md:-mx-8 md:px-8 pb-4 pt-2 bg-slate-50/95 backdrop-blur-sm transition-all">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between max-w-[1600px] mx-auto">
            
            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar mask-linear-fade">
              {['ทั้งหมด', 'เสื้อยืด (T-Shirts)', 'ฮู้ด & สเวตเตอร์', 'กระเป๋าผ้า', 'แก้วน้ำ', 'หมวก', 'Accessories'].map((cat, idx) => (
                <button 
                  key={idx}
                  className={`px-5 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap flex-shrink-0 transition-all ${
                    idx === 0 
                      ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex gap-3 flex-shrink-0">
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหาสินค้า..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all shadow-sm"
                />
              </div>
              <button className="flex items-center px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                ตัวกรอง
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="group bg-white rounded-[2.5rem] p-4 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 border border-slate-100 relative flex flex-col h-full hover:-translate-y-2">
              {product.badge && (
                <div className="absolute top-6 left-6 z-20">
                  <span className={`px-3 py-1.5 ${product.badgeColor === 'purple' ? 'bg-purple-500 text-white' : product.badgeColor === 'green' ? 'bg-emerald-500 text-white' : 'bg-ci-yellow text-slate-900'} text-[10px] font-bold rounded-full shadow-lg shadow-black/5`}>
                    {product.badge}
                  </span>
                </div>
              )}
              
              <div className="relative aspect-[4/5] bg-slate-100 rounded-[2rem] mb-5 overflow-hidden group-hover:shadow-inner transition-all">
                <div className="w-full h-full flex items-center justify-center text-slate-400 p-8 text-center bg-gradient-to-br from-slate-50 to-slate-100">
                   <div className="space-y-2">
                     <span className="text-4xl">👕</span>
                     <p className="text-xs font-medium uppercase tracking-wider">{product.name}</p>
                   </div>
                </div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 gap-3 backdrop-blur-[2px]">
                  <button className="w-full py-3.5 bg-white text-slate-900 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform flex items-center justify-center">
                    <PaletteIcon className="w-4 h-4 mr-2" />
                    ออกแบบสินค้า
                  </button>
                  <button className="w-full py-3.5 bg-white/20 text-white backdrop-blur-md border border-white/40 rounded-xl font-bold hover:bg-white/30 transition-all flex items-center justify-center">
                    รายละเอียด
                  </button>
                </div>

                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:text-rose-500 hover:scale-110 z-20 translate-y-2 group-hover:translate-y-0 duration-300">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="px-2 pb-2 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 text-lg truncate mb-2 group-hover:text-ci-blue transition-colors">{product.name}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                   <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-100">
                     <Ruler className="w-3 h-3 mr-1" /> {product.sizes}
                   </span>
                   <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-100">
                     <PaletteIcon className="w-3 h-3 mr-1" /> {product.colors} สี
                   </span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">ราคาเริ่มต้น</p>
                    <span className="text-2xl font-extrabold text-slate-800 leading-none">฿{product.price}</span>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gradient-to-r from-ci-blue/10 to-cyan-500/10 border border-ci-blue/10">
                      <Tag className="w-3 h-3 mr-1.5 text-ci-blue" />
                      <span className="text-xs font-bold text-ci-blue">
                        ฿{product.memberPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
