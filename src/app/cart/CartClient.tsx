'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  colorName: string;
  color: string;
  technique: string;
  previewImage: string;
}

export default function CartClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem('anajak_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, []);

  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem('anajak_cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cart-update'));
  };

  const updateQuantity = (id: string, delta: number) => {
    const newItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    updateCart(newItems);
  };

  const removeItem = (id: string) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-6 h-6 border-2 border-ci-blue border-t-transparent rounded-full animate-spin"></div></div>;

  if (cartItems.length === 0) {
    return (
      <DashboardLayout title="ตะกร้าสินค้า" showCreateButton={false}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">ตะกร้าว่างเปล่า</h2>
          <p className="text-slate-500 mb-8">คุณยังไม่มีสินค้าในตะกร้า</p>
          <Link 
            href="/designer" 
            className="px-8 py-3 bg-ci-blue text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            เริ่มออกแบบสินค้า
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="ตะกร้าสินค้า" showCreateButton={false}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50">
                <h2 className="text-lg font-bold text-slate-800">รายการสินค้า ({cartItems.length})</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex gap-6 items-start hover:bg-slate-50/50 transition-colors">
                    <div className="w-28 h-28 bg-slate-100 rounded-xl border border-slate-200 flex-shrink-0 overflow-hidden relative">
                      <img src={item.previewImage} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: item.color }}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg truncate">{item.name}</h3>
                          <p className="text-sm text-slate-500">{item.size} • {item.colorName} • {item.technique}</p>
                        </div>
                        <p className="font-bold text-lg text-slate-900">฿{(item.price * item.quantity).toLocaleString()}</p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ci-blue disabled:opacity-30"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ci-blue"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">สรุปยอดชำระ</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>ยอดรวมสินค้า</span>
                  <span className="font-medium">฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600 font-medium">คำนวณในขั้นตอนถัดไป</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-800">ยอดรวมโดยประมาณ</span>
                  <span className="text-2xl font-bold text-ci-blue">฿{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-4 bg-ci-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                ดำเนินการชำระเงิน
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

