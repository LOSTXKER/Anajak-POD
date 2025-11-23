'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Edit2 } from 'lucide-react';
import Link from 'next/link';
import Header from '../../components/Header';

interface CartItem {
  id: string;
  name: string;
  color: string;
  colorName: string;
  size: string;
  technique: string;
  price: number;
  quantity: number;
  previewImage: string;
  timestamp: number;
}

export default function CartClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('anajak_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
    setLoading(false);
  }, []);

  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem('anajak_cart', JSON.stringify(newItems));
  };

  const updateQuantity = (id: string, delta: number) => {
    const newItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(newItems);
  };

  const removeItem = (id: string) => {
    const newItems = cartItems.filter(item => item.id !== id);
    updateCart(newItems);
  };

  const editItem = (id: string) => {
    // Save the item ID to edit in localStorage
    localStorage.setItem('anajak_edit_item_id', id);
    // Redirect to designer
    window.location.href = '/designer';
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 50 : 0; // Flat rate mockup
  const total = subtotal + shipping;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
        <Header />
        
        <main className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-8 text-slate-500 hover:text-ci-blue transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" />
                <Link href="/designer" className="text-sm font-bold">กลับไปออกแบบต่อ</Link>
            </div>

            <h1 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-ci-blue" />
                ตะกร้าสินค้าของคุณ
                <span className="text-lg font-medium text-slate-400 ml-2">({cartItems.length} รายการ)</span>
            </h1>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-ci-blue opacity-50" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">ตะกร้าของคุณว่างเปล่า</h2>
                    <p className="text-slate-500 mb-8">ดูเหมือนคุณยังไม่ได้เพิ่มสินค้าใดๆ ลงในตะกร้า</p>
                    <Link href="/designer" className="inline-flex items-center gap-2 px-8 py-3 bg-ci-blue text-white rounded-xl font-bold shadow-lg shadow-ci-blue/30 hover:scale-105 transition-transform">
                        เริ่มออกแบบเลย
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-6 items-center group transition-all hover:shadow-md">
                                {/* Image Preview */}
                                <div className="w-24 h-24 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative flex-shrink-0">
                                    <img src={item.previewImage} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                    <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: item.color }} title={item.colorName}></div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">{item.name}</h3>
                                    <div className="flex flex-wrap gap-2 text-sm text-slate-500 mb-2">
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold uppercase">{item.size}</span>
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold uppercase">{item.technique === 'printing' ? 'สกรีน' : 'ปัก'}</span>
                                        <span className="text-xs flex items-center gap-1">
                                            สี: {item.colorName}
                                        </span>
                                    </div>
                                    <div className="font-bold text-ci-blue">฿{item.price.toLocaleString()}</div>
                                </div>

                                {/* Quantity & Remove */}
                                <div className="flex flex-col items-end gap-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => editItem(item.id)} className="text-slate-400 hover:text-ci-blue transition-colors p-2 hover:bg-blue-50 rounded-lg" title="แก้ไข">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg" title="ลบ">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white hover:text-ci-blue rounded-l-xl transition-colors">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-bold text-sm text-slate-700">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white hover:text-ci-blue rounded-r-xl transition-colors">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Panel */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-8">
                            <h3 className="font-bold text-xl text-slate-800 mb-6">สรุปคำสั่งซื้อ</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-slate-500 text-sm">
                                    <span>ยอดรวมสินค้า</span>
                                    <span className="font-bold text-slate-800">฿{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-sm">
                                    <span>ค่าจัดส่ง</span>
                                    <span className="font-bold text-slate-800">฿{shipping.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-slate-100 my-2"></div>
                                <div className="flex justify-between text-lg">
                                    <span className="font-bold text-slate-800">ยอดสุทธิ</span>
                                    <span className="font-black text-ci-blue">฿{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="w-full py-4 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-ci-blue/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-ci-blue/40 transition-all flex items-center justify-center gap-2">
                                <span>ชำระเงิน</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link href="/designer" className="mt-3 w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:text-ci-blue hover:border-ci-blue/30 transition-all flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" />
                                <span>เพิ่มสินค้าอื่น</span>
                            </Link>
                            
                            <div className="mt-4 text-center">
                                <p className="text-xs text-slate-400">
                                    สินค้าผลิตตามออเดอร์ ใช้เวลาผลิต 3-5 วัน
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    </div>
  );
}

