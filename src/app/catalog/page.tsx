import DashboardLayout from '@/components/DashboardLayout';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { getProducts as getProductsFromDB } from '@/lib/db/products';
import { getProducts as getProductsMock } from '@/lib/mockData';
import Link from 'next/link';
import CatalogClient from './CatalogClient';

async function getProducts() {
  try {
    const products = await getProductsFromDB()
    if (products.length > 0) return products.map(p => ({ ...p, price: Number(p.price) }))
  } catch {
    // Database not available, fall through to mock
  }
  return getProductsMock()
}

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <DashboardLayout title="สินค้าทั้งหมด" showCreateButton={false}>
      <div className="max-w-[1600px] mx-auto pb-12">
        
        {/* Promotion Banner */}
        <div className="rounded-[2rem] p-8 mb-8 text-white relative overflow-hidden flex items-center shadow-2xl shadow-ci-blue/20 group min-h-[220px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-[20s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-ci-blue/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          
          <div className="relative z-10 max-w-3xl w-full">
            <div className="flex flex-col items-start gap-4">
               <span className="inline-flex items-center px-3 py-1 bg-white/10 text-ci-yellow text-[10px] font-bold rounded-full backdrop-blur-md border border-white/10">
                🔥 New Collection 2025
              </span>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight tracking-tight">
                  Premium Quality<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">For Your Brand</span>
                </h2>
                <p className="text-slate-300 text-sm font-light max-w-md leading-relaxed hidden md:block">
                  ยกระดับแบรนด์ของคุณด้วยเสื้อยืดคุณภาพสูง เกรดส่งออก พร้อมงานสกรีนที่คมชัดที่สุด
                </p>
              </div>
              
              <button className="mt-2 px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 hover:scale-105 transition-all shadow-lg flex items-center text-sm">
                ดูสินค้าแนะนำ
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            
            {/* Section 1: Highlights */}
            <div className="space-y-1">
               <h3 className="text-sm font-bold text-slate-900 px-3 py-2">หมวดหมู่แนะนำ</h3>
               <div className="w-full h-px bg-slate-100 my-2"></div>
               
               {['สินค้าขายดี', 'สินค้าใหม่', 'โปรโมชั่นพิเศษ'].map((item, idx) => (
                 <button key={idx} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-ci-blue hover:bg-slate-50 rounded-lg transition-colors font-medium">
                   {item}
                 </button>
               ))}
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Section 2: Categories */}
            <div className="space-y-1">
               <h3 className="text-sm font-bold text-slate-900 px-3 py-2 mb-1">สินค้าทั้งหมด</h3>
               
               {/* Active Category Group */}
               <div className="space-y-1">
                 <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-900 bg-slate-50 rounded-lg">
                    เสื้อผ้า
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                 </button>
                 
                 <div className="pl-4 space-y-0.5 pt-1">
                   <button className="w-full text-left px-3 py-1.5 text-sm text-ci-blue font-bold border-l-2 border-ci-blue bg-ci-blue/5">
                     ทั้งหมด
                   </button>
                   
                   {['เสื้อยืด (T-Shirt)', 'เสื้อ Oversize', 'เสื้อ Polo', 'Hoodie / Sweatshirt', 'เสื้อกล้าม / แขนกุด'].map((item, idx) => (
                      <button key={idx} className="w-full text-left px-3 py-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                        {item}
                      </button>
                   ))}
                 </div>
               </div>

               <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors mt-2">
                  กระเป๋า
                  <ChevronRight className="w-4 h-4 text-slate-400" />
               </button>
               <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  หมวก
                  <ChevronRight className="w-4 h-4 text-slate-400" />
               </button>
               <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  สินค้าอื่นๆ
                  <ChevronRight className="w-4 h-4 text-slate-400" />
               </button>
            </div>
            
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-full">
            <CatalogClient products={products} />

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
