import DashboardLayout from '@/components/DashboardLayout';
import { Search, SlidersHorizontal, Heart, ArrowRight, ChevronDown, ChevronRight, Star } from 'lucide-react';
import prisma from '@/lib/prisma';
import Link from 'next/link';

// Force dynamic rendering to ensure fresh data after seeding
export const dynamic = 'auto';

// Function to fetch products directly from DB (Server Side)
async function getProducts() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'asc' }
  });
  return products;
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
            
            {/* Search Bar & Sort (Horizontal) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 z-20">
              <div className="relative flex-1 w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหาสินค้า..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all hover:border-slate-300"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                 <span className="text-sm text-slate-500 whitespace-nowrap hidden sm:inline">เรียงตาม:</span>
                 <select className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-ci-blue/20 focus:border-ci-blue block p-2.5 cursor-pointer hover:border-slate-300 transition-all font-medium">
                    <option>แนะนำ</option>
                    <option>ราคา: ต่ำ - สูง</option>
                    <option>ราคา: สูง - ต่ำ</option>
                    <option>มาใหม่</option>
                 </select>
                 <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm sm:hidden">
                    <SlidersHorizontal className="w-4 h-4" />
                 </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/catalog/${product.id}`} className="group bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
                  
                  {/* Header: Image 1:1 Square */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                     {product.imageUrl && (
                       <img 
                         src={product.imageUrl} 
                         alt={product.title}
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       />
                     )}
                     
                     {/* Badges */}
                     <div className="absolute top-3 left-3 flex flex-col gap-2">
                       {product.badge && (
                         <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-md shadow-lg shadow-emerald-500/20 backdrop-blur-md">
                           {product.badge}
                         </span>
                       )}
                     </div>

                     <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-rose-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                        <Heart className="w-4 h-4" />
                     </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-bold text-slate-800 mb-0.5 group-hover:text-ci-blue transition-colors truncate text-base">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="w-full h-px bg-slate-50 mb-3"></div>

                    {/* Specs List - Detailed */}
                    <div className="space-y-1.5 text-xs mb-4 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-400 font-bold w-24">เกรดผ้า:</span>
                        <span className="text-slate-700 font-medium text-right flex-1">{product.fabricGrade || '-'}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-400 font-bold w-24">ประเภทเส้นใย:</span>
                        <span className="text-slate-700 font-medium text-right flex-1">{product.fiberType || '-'}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-400 font-bold w-24">เบอร์ผ้า / หนา:</span>
                        <span className="text-slate-700 font-medium text-right flex-1">{product.thickness || '-'}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-400 font-bold w-24">ไซส์:</span>
                        <span className="text-slate-700 font-medium text-right flex-1">{product.sizes?.join(', ') || '-'}</span>
                      </div>
                      
                      {/* Rating - New Line */}
                      <div className="flex justify-between items-center pt-1">
                         <span className="text-slate-400 font-bold w-24">รีวิว:</span>
                         <div className="flex items-center justify-end flex-1 gap-1">
                           <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                           </div>
                           <span className="text-[10px] text-slate-400 font-medium">(4.9)</span>
                         </div>
                      </div>
                      
                      {/* Colors - New Line */}
                      <div className="pt-2 border-t border-dashed border-slate-100 mt-2">
                        <span className="text-slate-400 font-bold block mb-1.5">สีที่เลือกได้:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.colors?.map((color, idx) => (
                            <div 
                              key={idx} 
                              className="w-5 h-5 rounded-full border border-slate-200 shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                          {(!product.colors || product.colors.length === 0) && <span className="text-slate-400">-</span>}
                        </div>
                      </div>
                    </div>

                    {/* Footer: Price */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
                       <div className="flex flex-col">
                         <p className="text-lg font-extrabold text-slate-800 leading-tight group-hover:text-ci-blue transition-colors">฿{Number(product.price).toFixed(0)}</p>
                         <div className="flex items-center gap-1 text-[10px] font-bold text-ci-blue bg-ci-blue/5 px-1.5 py-0.5 rounded mt-0.5 w-fit">
                            <span>สมาชิก ฿{(Number(product.price) * 0.9).toFixed(0)}</span>
                         </div>
                       </div>
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-ci-blue group-hover:text-white transition-all">
                          <ChevronRight className="w-5 h-5" />
                       </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
