'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, ChevronRight, Star, ArrowRight, ChevronDown } from 'lucide-react';
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

const HIGHLIGHT_CATEGORIES = ['สินค้าขายดี', 'สินค้าใหม่', 'โปรโมชั่นพิเศษ'];

const MAIN_CATEGORIES = [
  {
    name: 'เสื้อผ้า',
    subcategories: ['เสื้อยืด (T-Shirt)', 'เสื้อ Oversize', 'เสื้อ Polo', 'Hoodie / Sweatshirt', 'เสื้อกล้าม / แขนกุด'],
  },
  { name: 'กระเป๋า', subcategories: [] },
  { name: 'หมวก', subcategories: [] },
  { name: 'สินค้าอื่นๆ', subcategories: [] },
];

export default function CatalogClient({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('เสื้อผ้า');
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const toggleLike = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const scrollToProducts = () => {
    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      const cat = selectedCategory.toLowerCase();
      result = result.filter(p => {
        const searchable = [p.title, p.description, p.badge, p.suitableFor]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchable.includes(cat);
      });
    }

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
  }, [products, searchQuery, sortBy, selectedCategory]);

  return (
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

            <button
              onClick={scrollToProducts}
              className="mt-2 px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 hover:scale-105 transition-all shadow-lg flex items-center text-sm"
            >
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

             {HIGHLIGHT_CATEGORIES.map((item, idx) => (
               <button
                 key={idx}
                 onClick={() => setSelectedCategory(selectedCategory === item ? 'all' : item)}
                 className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                   selectedCategory === item
                     ? 'text-ci-blue bg-ci-blue/5 font-bold'
                     : 'text-slate-600 hover:text-ci-blue hover:bg-slate-50'
                 }`}
               >
                 {item}
               </button>
             ))}
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          {/* Section 2: Categories */}
          <div className="space-y-1">
             <h3 className="text-sm font-bold text-slate-900 px-3 py-2 mb-1">สินค้าทั้งหมด</h3>

             {MAIN_CATEGORIES.map((cat) => (
               <div key={cat.name} className="space-y-1">
                 <button
                   onClick={() => {
                     if (cat.subcategories.length > 0) {
                       setExpandedCategory(prev => prev === cat.name ? null : cat.name);
                     }
                     setSelectedCategory(cat.name);
                   }}
                   className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                     selectedCategory === cat.name || cat.subcategories.some(s => s === selectedCategory)
                       ? 'font-bold text-slate-900 bg-slate-50'
                       : 'font-medium text-slate-600 hover:bg-slate-50'
                   }`}
                 >
                   {cat.name}
                   {expandedCategory === cat.name
                     ? <ChevronDown className="w-4 h-4 text-slate-500" />
                     : <ChevronRight className="w-4 h-4 text-slate-400" />
                   }
                 </button>

                 {expandedCategory === cat.name && cat.subcategories.length > 0 && (
                   <div className="pl-4 space-y-0.5 pt-1">
                     <button
                       onClick={() => setSelectedCategory(cat.name)}
                       className={`w-full text-left px-3 py-1.5 text-sm ${
                         selectedCategory === cat.name
                           ? 'text-ci-blue font-bold border-l-2 border-ci-blue bg-ci-blue/5'
                           : 'text-slate-500 hover:text-slate-800 transition-colors'
                       }`}
                     >
                       ทั้งหมด
                     </button>

                     {cat.subcategories.map((sub, idx) => (
                       <button
                         key={idx}
                         onClick={() => setSelectedCategory(sub)}
                         className={`w-full text-left px-3 py-1.5 text-sm ${
                           selectedCategory === sub
                             ? 'text-ci-blue font-bold border-l-2 border-ci-blue bg-ci-blue/5'
                             : 'text-slate-500 hover:text-slate-800 transition-colors'
                         }`}
                       >
                         {sub}
                       </button>
                     ))}
                   </div>
                 )}
               </div>
             ))}
          </div>

        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full" id="product-grid">

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

          {/* Active filter indicator */}
          {selectedCategory !== 'all' && (
            <div className="flex items-center gap-2 mb-4 px-1">
              <span className="text-sm text-slate-500">กรอง:</span>
              <span className="inline-flex items-center px-3 py-1 bg-ci-blue/10 text-ci-blue text-sm font-bold rounded-lg">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-2 hover:text-ci-blue/70">&times;</button>
              </span>
            </div>
          )}

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p className="text-lg font-bold mb-2">ไม่พบสินค้าที่ค้นหา</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-ci-blue font-medium hover:underline">ล้างการค้นหา</button>
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
                     <button
                       onClick={(e) => toggleLike(e, product.id)}
                       className={`absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all ${
                         likedProducts.includes(product.id) ? 'text-rose-500 opacity-100' : 'text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100'
                       }`}
                     >
                        <Heart className={`w-4 h-4 ${likedProducts.includes(product.id) ? 'fill-current' : ''}`} />
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

        </div>
      </div>
    </div>
  );
}
