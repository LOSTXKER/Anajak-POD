'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  Heart, 
  Star, 
  CheckCircle2, 
  Info, 
  Ruler, 
  Truck, 
  Palette, 
  Lightbulb, 
  ShoppingCart, 
  Minus, 
  Plus,
  ChevronRight,
  Share2,
  Layers,
  Scissors,
  Scaling
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number; // Decimal is serialized to number
  imageUrl: string | null;
  fabricGrade: string | null;
  fiberType: string | null;
  thickness: string | null;
  sizes: string[];
  colors: string[];
  badge: string | null;
  suitableFor: string | null;
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'size' | 'care' | 'reviews'>('details');
  const [mainImage, setMainImage] = useState(product.imageUrl || '');
  const [liked, setLiked] = useState(false);

  const memberPrice = Math.floor(product.price * 0.9); // Mock calculation

  // Mock gallery images (using the main image repeatedly for demo if only one exists)
  const galleryImages = [
    product.imageUrl,
    product.imageUrl, // Mock side view
    product.imageUrl, // Mock back view
    product.imageUrl  // Mock detail view
  ].filter(Boolean) as string[];

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc') setQuantity(q => q + 1);
  };

  return (
    <DashboardLayout 
      title="รายละเอียดสินค้า"
      subtitle={`สินค้า > ${product.title}`}
    >
      <div className="max-w-[1600px] mx-auto pb-20">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-slate-500 mb-8 font-medium">
          <Link href="/catalog" className="hover:text-ci-blue transition-colors">แคตตาล็อก</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-800 font-bold">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            <div className="aspect-square bg-white rounded-[2.5rem] mb-6 border border-slate-200/60 overflow-hidden relative group shadow-sm">
              {mainImage && (
                <img 
                  src={mainImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <button
                onClick={() => setLiked(prev => !prev)}
                className={`absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm transition-colors hover:scale-110 ${liked ? 'text-rose-500' : 'hover:text-rose-500'}`}
              >
                <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
              </button>
              {product.badge && (
                <span className="absolute top-6 left-6 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 backdrop-blur-md">
                  {product.badge}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-white rounded-2xl border-2 cursor-pointer p-2 overflow-hidden transition-all ${mainImage === img ? 'border-ci-blue ring-2 ring-ci-blue/20' : 'border-transparent hover:border-slate-200'}`}
                >
                  <img src={img} className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                 <span className="inline-flex items-center px-3 py-1 rounded-full bg-ci-yellow/10 text-yellow-700 text-xs font-bold border border-yellow-100">
                    <Star className="w-3 h-3 mr-1.5 fill-yellow-700" /> Best Seller
                 </span>
                 <span className="inline-flex items-center text-emerald-600 text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3 mr-1.5" /> มีสินค้าพร้อมส่ง
                 </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">{product.title}</h1>
              
              <div className="flex items-center gap-4 text-sm mb-6">
                 <div className="flex text-yellow-400">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                 </div>
                 <span className="text-slate-400 font-medium">(4.9/5 จาก 128 รีวิว)</span>
                 <button
                   onClick={async () => {
                     try {
                       await navigator.share({ title: product.title, url: window.location.href });
                     } catch {
                       await navigator.clipboard.writeText(window.location.href);
                       alert('คัดลอกลิงก์แล้ว');
                     }
                   }}
                   className="text-ci-blue font-bold hover:underline flex items-center gap-1"
                 >
                   <Share2 className="w-4 h-4" /> แชร์
                 </button>
              </div>

              <p className="text-slate-500 text-lg mb-8 font-light leading-relaxed">
                {product.description || 'เสื้อยืดคุณภาพพรีเมียม ผลิตด้วยความใส่ใจทุกขั้นตอน เนื้อผ้านุ่ม ระบายอากาศได้ดี เหมาะสำหรับทุกโอกาส'}
              </p>

              {/* Tech Specs Grid - Refined */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-10 p-8 rounded-[2rem] border border-slate-100 bg-white shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                       <Layers className="w-4 h-4" />
                       <span className="text-xs font-bold uppercase tracking-wider">เกรดผ้า</span>
                    </div>
                    <span className="text-slate-800 font-bold text-xl">{product.fabricGrade || 'Semi'}</span>
                 </div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                       <Scissors className="w-4 h-4" />
                       <span className="text-xs font-bold uppercase tracking-wider">เส้นใย</span>
                    </div>
                    <span className="text-slate-800 font-bold text-xl">{product.fiberType || 'ฝ้าย 100%'}</span>
                 </div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                       <Scaling className="w-4 h-4" />
                       <span className="text-xs font-bold uppercase tracking-wider">ความหนา</span>
                    </div>
                    <span className="text-slate-800 font-bold text-xl">{product.thickness || 'No. 32'}</span>
                 </div>
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                       <CheckCircle2 className="w-4 h-4" />
                       <span className="text-xs font-bold uppercase tracking-wider">เหมาะสำหรับ</span>
                    </div>
                    <span className="text-slate-800 font-bold text-xl leading-tight">{product.suitableFor || 'ทำแบรนด์'}</span>
                 </div>
              </div>

              <div className="w-full h-px bg-slate-100 mb-8"></div>

              {/* Color Selection - Refined */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                   <h3 className="font-bold text-slate-800 text-lg">เลือกสีสินค้า</h3>
                   <span className="text-sm text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                     {selectedColor || 'เลือกสี'}
                   </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors?.length > 0 ? product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full shadow-sm transition-all duration-300 relative group ${selectedColor === color ? 'ring-2 ring-offset-2 ring-ci-blue scale-110' : 'hover:scale-110 ring-1 ring-slate-200 hover:ring-slate-300'}`}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-200">
                          <CheckCircle2 className={`w-6 h-6 ${['#FFFFFF', '#fff', 'white'].includes(color) ? 'text-slate-400' : 'text-white'} drop-shadow-md`} />
                        </span>
                      )}
                    </button>
                  )) : <span className="text-slate-400">-</span>}
                </div>
              </div>

              {/* Size Selection - Refined */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                   <h3 className="font-bold text-slate-800 text-lg">เลือกขนาด</h3>
                   <button
                     onClick={() => setActiveTab('size')}
                     className="text-xs text-ci-blue hover:text-blue-700 font-bold flex items-center bg-ci-blue/5 px-3 py-1.5 rounded-lg transition-colors"
                   >
                       <Ruler className="w-3 h-3 mr-1.5" /> ตารางไซส์
                   </button>
                </div>
                <div className="flex flex-wrap gap-3">
                   {product.sizes?.length > 0 ? product.sizes.map((size, idx) => (
                     <button
                       key={idx}
                       onClick={() => setSelectedSize(size)}
                       className={`min-w-[4rem] h-14 px-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center ${
                         selectedSize === size 
                           ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105 border-2 border-slate-900' 
                           : 'bg-white border-2 border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                       }`}
                     >
                       {size}
                     </button>
                   )) : <span className="text-slate-400">-</span>}
                </div>
              </div>

              {/* Sticky Action Box - Refined */}
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-white/50 relative overflow-hidden ring-1 ring-slate-100">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ci-blue/10 to-transparent rounded-bl-[5rem] -mr-10 -mt-10 pointer-events-none" />
                 
                 <div className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-6 relative z-10">
                    <div>
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">ราคาต่อชิ้น</p>
                       <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-black text-slate-900 tracking-tight">฿{product.price.toLocaleString()}</span>
                          <span className="text-lg text-slate-400 line-through decoration-slate-300 decoration-2 font-medium">฿{(product.price * 1.2).toFixed(0)}</span>
                       </div>
                       <div className="inline-flex items-center px-2 py-1 rounded-lg bg-ci-blue/10 text-ci-blue text-xs font-bold mt-2">
                          <Star className="w-3 h-3 mr-1 fill-ci-blue" /> ราคาสมาชิก ฿{memberPrice.toLocaleString()}
                       </div>
                    </div>

                    <div className="flex items-center bg-slate-100 rounded-xl p-1">
                       <button onClick={() => handleQuantityChange('dec')} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-all shadow-sm font-bold">
                          <Minus className="w-4 h-4" />
                       </button>
                       <div className="w-12 text-center font-bold text-slate-800">{quantity}</div>
                       <button onClick={() => handleQuantityChange('inc')} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-all shadow-sm font-bold">
                          <Plus className="w-4 h-4" />
                       </button>
                    </div>
                 </div>

                 <div className="flex gap-3 relative z-10">
                    <Link href="/designer" className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center">
                        <Palette className="w-5 h-5 mr-2" />
                        เริ่มออกแบบ
                    </Link>
                    <button
                      onClick={() => {
                        const cartItem = {
                          id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
                          productId: product.id,
                          name: product.title,
                          size: selectedSize,
                          color: selectedColor,
                          colorName: selectedColor === '#FFFFFF' ? 'ขาว' : selectedColor === '#000000' ? 'ดำ' : selectedColor,
                          quantity,
                          price: product.price,
                          previewImage: product.imageUrl || '',
                        };
                        const saved = localStorage.getItem('anajak_cart');
                        const cart = saved ? JSON.parse(saved) : [];
                        cart.push(cartItem);
                        localStorage.setItem('anajak_cart', JSON.stringify(cart));
                        window.dispatchEvent(new Event('cart-update'));
                        alert('เพิ่มลงตะกร้าแล้ว!');
                      }}
                      className="px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:border-slate-900 hover:text-slate-900 transition-all"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Details Tabs Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
           <div className="flex border-b border-slate-100 bg-slate-50/50 overflow-x-auto no-scrollbar">
              {[
                { id: 'details', label: 'รายละเอียดสินค้า' },
                { id: 'size', label: 'ตารางขนาด (Size Chart)' },
                { id: 'care', label: 'การดูแลรักษา' },
                { id: 'reviews', label: 'รีวิวจากผู้ใช้ (128)' }
              ].map((tab) => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-8 py-5 font-bold whitespace-nowrap transition-all border-b-2 ${
                       activeTab === tab.id 
                         ? 'border-ci-blue bg-white text-slate-900' 
                         : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/50'
                    }`}
                 >
                    {tab.label}
                 </button>
              ))}
           </div>

           <div className="p-8 md:p-12 min-h-[300px]">
              {activeTab === 'details' && (
                 <div className="max-w-5xl animate-in fade-in duration-300">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">คุณสมบัติและรายละเอียด</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                       {/* Left Column: Technical Specs */}
                       <div className="space-y-6">
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">ทรงเสื้อ</span>
                             <span className="font-bold text-slate-600">คอกลม ทรงตรงปกติ (Standard Fit)</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">ประเภทเส้นใย</span>
                             <span className="font-bold text-slate-600">{product.fiberType || 'ฝ้าย 100%'}</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">เกรดผ้า</span>
                             <span className="font-bold text-slate-600">{product.fabricGrade || 'Semi'}</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">เบอร์ผ้า</span>
                             <span className="font-bold text-slate-600">{product.thickness ? product.thickness.split('/')[0] : 'No. 32'}</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">ความหนา</span>
                             <span className="font-bold text-slate-600">{product.thickness ? product.thickness.split('/')[1] : '155-165 gsm'}</span>
                          </div>
                       </div>

                       {/* Right Column: Usage Properties */}
                       <div className="space-y-6">
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">สัมผัสเนื้อผ้า</span>
                             <span className="font-bold text-slate-600">นุ่มลื่นปานกลาง</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">ความนุ่ม</span>
                             <div className="flex text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 text-slate-200 fill-slate-200" />
                                <Star className="w-4 h-4 text-slate-200 fill-slate-200" />
                             </div>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">การระบายอากาศ</span>
                             <div className="flex text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                             </div>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">ความทนทาน</span>
                             <span className="font-bold text-slate-600">ปานกลาง</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-slate-200">
                             <span className="font-bold text-slate-800">ความยับยาก</span>
                             <span className="font-bold text-slate-600">ยับง่ายปานกลาง</span>
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 bg-blue-50 rounded-2xl p-6 flex items-start border border-blue-100">
                       <Lightbulb className="w-6 h-6 mr-3 text-ci-blue flex-shrink-0 mt-0.5" />
                       <div>
                          <h4 className="font-bold text-ci-blue mb-1">Pro Tip สำหรับผู้ขาย</h4>
                          <p className="text-sm text-slate-600">
                             รุ่นนี้เหมาะมากสำหรับทำแบรนด์ Streetwear หรือเสื้อกราฟิกแนว Minimal เพราะเนื้อผ้าเรียบเนียน พิมพ์ลาย DTG ออกมาได้คมชัด สีสดสวยที่สุดครับ
                          </p>
                       </div>
                    </div>
                 </div>
              )}
              {activeTab === 'size' && (
                 <div className="animate-in fade-in duration-300">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 rounded-l-lg">ขนาด (Size)</th>
                            <th className="px-6 py-3">รอบอก (นิ้ว)</th>
                            <th className="px-6 py-3">ความยาว (นิ้ว)</th>
                            <th className="px-6 py-3 rounded-r-lg">ความกว้างไหล่ (นิ้ว)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { size: 'S', chest: '32-34', length: '26', shoulder: '16' },
                            { size: 'M', chest: '36-38', length: '27', shoulder: '17' },
                            { size: 'L', chest: '40-42', length: '28', shoulder: '18' },
                            { size: 'XL', chest: '44-46', length: '29', shoulder: '19' },
                            { size: '2XL', chest: '48-50', length: '30', shoulder: '20' },
                          ].map((row, idx) => (
                            <tr key={idx} className="bg-white border-b hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-900">{row.size}</td>
                              <td className="px-6 py-4">{row.chest}</td>
                              <td className="px-6 py-4">{row.length}</td>
                              <td className="px-6 py-4">{row.shoulder}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-slate-400 mt-4">* ขนาดอาจมีความคลาดเคลื่อน +/- 0.5-1 นิ้ว</p>
                 </div>
              )}
              {activeTab === 'care' && (
                 <div className="animate-in fade-in duration-300 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { icon: '🌊', title: 'ซักน้ำเย็น', desc: 'ควรซักด้วยน้ำอุณหภูมิปกติ' },
                      { icon: '🚫', title: 'ห้ามฟอกขาว', desc: 'หลีกเลี่ยงน้ำยาฟอกขาว' },
                      { icon: '🌡️', title: 'รีดไฟอ่อน', desc: 'รีดด้วยอุณหภูมิต่ำ-ปานกลาง' },
                      { icon: '☀️', title: 'ตากในร่ม', desc: 'หลีกเลี่ยงแสงแดดจัดโดยตรง' },
                    ].map((item, idx) => (
                      <div key={idx} className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="text-4xl mb-3">{item.icon}</div>
                         <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                         <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                 </div>
              )}
              {activeTab === 'reviews' && (
                 <div className="animate-in fade-in duration-300 space-y-6">
                    <div className="flex items-center gap-4 mb-8 p-6 bg-slate-50 rounded-2xl">
                       <div className="text-4xl font-bold text-slate-900">4.9</div>
                       <div>
                          <div className="flex text-yellow-400 mb-1">
                             {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                          </div>
                          <p className="text-sm text-slate-500">จาก 128 รีวิวทั้งหมด</p>
                       </div>
                       <button
                         onClick={() => alert('ฟีเจอร์รีวิวจะเปิดให้ใช้งานเร็วๆ นี้')}
                         className="ml-auto px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-100"
                       >
                          เขียนรีวิว
                       </button>
                    </div>
                    
                    {[
                      { user: 'Supachai K.', rating: 5, comment: 'ผ้าดีมากครับ นุ่ม ใส่สบาย สกรีนชัด', date: '2 วันที่แล้ว' },
                      { user: 'Wimonrat P.', rating: 5, comment: 'ส่งไวมาก สั่งเมื่อวานได้วันนี้ แพ็คของมาดีค่ะ', date: '1 สัปดาห์ที่แล้ว' },
                      { user: 'Anon S.', rating: 4, comment: 'ไซส์ L พอดีตัวเลยครับ สีตรงปก', date: '2 สัปดาห์ที่แล้ว' }
                    ].map((review, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-6 last:border-0">
                         <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">
                                  {review.user.charAt(0)}
                               </div>
                               <span className="font-bold text-slate-800 text-sm">{review.user}</span>
                            </div>
                            <span className="text-xs text-slate-400">{review.date}</span>
                         </div>
                         <div className="flex text-yellow-400 mb-2 scale-75 origin-left">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                             ))}
                         </div>
                         <p className="text-slate-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                 </div>
              )}
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

