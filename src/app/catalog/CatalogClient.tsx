'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  fabricGrade: string | null;
  fiberType: string | null;
  thickness: string | null;
  sizes: string[];
  colors: string[];
  badge: string | null;
  suitableFor: string | null;
}

export default function CatalogClient({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const filtered = useMemo(() => {
    let result = products;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.badge?.toLowerCase().includes(q) ||
        p.suitableFor?.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].reverse();
        break;
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <>
      {/* Search Bar & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 z-20">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="ค้นหาสินค้า..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue transition-all hover:border-slate-300"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
           <span className="text-sm text-slate-500 whitespace-nowrap hidden sm:inline">เรียงตาม:</span>
           <select
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value)}
             className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-ci-blue/20 focus:border-ci-blue block p-2.5 cursor-pointer hover:border-slate-300 transition-all font-medium"
           >
              <option value="recommended">แนะนำ</option>
              <option value="price-asc">ราคา: ต่ำ - สูง</option>
              <option value="price-desc">ราคา: สูง - ต่ำ</option>
              <option value="newest">มาใหม่</option>
           </select>
           <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm sm:hidden">
              <SlidersHorizontal className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg font-bold mb-2">ไม่พบสินค้าที่ค้นหา</p>
          <button onClick={() => setSearchQuery('')} className="text-ci-blue font-medium hover:underline">ล้างการค้นหา</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Link key={product.id} href={`/catalog/${product.id}`} className="group bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
              
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                 {product.imageUrl && (
                   <img 
                     src={product.imageUrl} 
                     alt={product.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                 )}
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
      )}
    </>
  );
}
