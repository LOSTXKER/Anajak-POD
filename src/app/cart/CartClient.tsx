'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronRight, Check, ShoppingCart, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const CHECKOUT_STEPS = [
  { id: 1, label: 'ตะกร้า', icon: ShoppingCart },
  { id: 2, label: 'ที่อยู่จัดส่ง', icon: MapPin },
  { id: 3, label: 'ชำระเงิน', icon: CreditCard },
  { id: 4, label: 'เสร็จสิ้น', icon: CheckCircle },
];

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
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <DashboardLayout title="ตะกร้าสินค้า" showCreateButton={false}>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-ci-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <DashboardLayout title="ตะกร้าสินค้า" showCreateButton={false}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
          <div className="w-28 h-28 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-8 text-slate-300 shadow-inner">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">ตะกร้าว่างเปล่า</h2>
          <p className="text-slate-500 mb-8">คุณยังไม่มีสินค้าในตะกร้า</p>
          <Link 
            href="/catalog" 
            className="px-8 py-3 bg-ci-blue text-white font-bold rounded-xl hover:bg-ci-blueDark transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            เริ่มออกแบบสินค้า
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="ตะกร้าสินค้า" subtitle={`${totalItems} รายการ`} showCreateButton={false}>
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {CHECKOUT_STEPS.map((step, i) => {
            const isActive = step.id === 1;
            const isCompleted = step.id < 1;
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isActive 
                      ? 'bg-ci-blue text-white shadow-lg shadow-blue-200' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-ci-blue' : isCompleted ? 'text-green-600' : 'text-slate-400'
                  }`}>{step.label}</span>
                </div>
                {i < CHECKOUT_STEPS.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded-full -mt-6 ${
                    step.id < 1 ? 'bg-green-500' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">รายการสินค้า ({cartItems.length})</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-start hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 flex-shrink-0 overflow-hidden relative group">
                      <img 
                        src={item.previewImage} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform" 
                      />
                      <div 
                        className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full border-2 border-white shadow-md" 
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-slate-800 text-base sm:text-lg truncate">{item.name}</h3>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">{item.size}</span>
                            <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">{item.colorName}</span>
                            <span className="px-2 py-0.5 bg-blue-50 rounded-full text-xs font-medium text-ci-blue">{item.technique}</span>
                          </div>
                        </div>
                        <p className="font-bold text-lg text-slate-900">฿{(item.price * item.quantity).toLocaleString()}</p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        {/* Quantity Control */}
                        <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ci-blue hover:bg-white rounded-md transition-all disabled:opacity-30"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ci-blue hover:bg-white rounded-md transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">ลบ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 text-center">
              <Link 
                href="/catalog" 
                className="inline-flex items-center gap-2 text-ci-blue font-medium hover:underline"
              >
                <Plus className="w-4 h-4" />
                เพิ่มสินค้าอื่น
              </Link>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">สรุปยอดชำระ</h3>
              
              {/* Items Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>ยอดรวมสินค้า ({totalItems} ชิ้น)</span>
                  <span className="font-medium">฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600 font-medium">คำนวณในขั้นตอนถัดไป</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl mb-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm text-slate-500">ยอดรวมโดยประมาณ</span>
                    <p className="text-2xl font-bold text-slate-900">฿{subtotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-4 bg-ci-blue text-white font-bold rounded-xl hover:bg-ci-blueDark transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              >
                ดำเนินการชำระเงิน
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-center gap-6 text-slate-400">
                  <div className="flex items-center gap-1.5 text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    ชำระปลอดภัย
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    คืนเงินได้
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
