'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Check, CreditCard, Truck, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function CheckoutClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('anajak_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    // In a real app, this would send data to the API
    // For now, we verify form is valid and move to success
    
    // 1. Clear cart
    localStorage.removeItem('anajak_cart');
    
    // 2. Show success
    setStep(3);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
        <p className="text-slate-500">No items to checkout</p>
        <Link href="/designer" className="text-ci-blue hover:underline">Go to Designer</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">สั่งซื้อสำเร็จ!</h1>
          <p className="text-slate-500 mb-8">ขอบคุณที่ใช้บริการ เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว</p>
          <div className="flex flex-col gap-3">
            <Link href="/orders" className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              ดูประวัติการสั่งซื้อ
            </Link>
            <Link href="/designer" className="w-full py-3 bg-ci-blue text-white rounded-xl font-bold hover:shadow-lg hover:shadow-ci-blue/30 transition-all">
              สั่งทำอีกครั้ง
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Forms */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6 text-slate-500">
              <Link href="/cart" className="flex items-center gap-1 hover:text-ci-blue transition-colors">
                <ArrowLeft className="w-4 h-4" />
                กลับไปตะกร้า
              </Link>
            </div>

            <div className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-ci-blue">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">ที่อยู่จัดส่ง</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">ชื่อ</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-ci-blue transition-colors" placeholder="สมชาย" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">นามสกุล</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-ci-blue transition-colors" placeholder="ใจดี" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500">ที่อยู่</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-ci-blue transition-colors" placeholder="123/45 ถนนสุขุมวิท..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">จังหวัด</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-ci-blue transition-colors" placeholder="กรุงเทพมหานคร" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">รหัสไปรษณีย์</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-ci-blue transition-colors" placeholder="10110" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">เบอร์โทรศัพท์</label>
                    <input type="tel" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-ci-blue transition-colors" placeholder="0812345678" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">รูปแบบการจัดส่ง</h2>
                </div>
                
                <label className="flex items-center justify-between p-4 bg-slate-50 border border-ci-blue rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-[5px] border-ci-blue bg-white"></div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Standard Delivery</p>
                      <p className="text-xs text-slate-500">3-5 วันทำการ</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800">฿50</span>
                </label>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">วิธีการชำระเงิน</h2>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-ci-blue rounded-xl cursor-pointer transition-colors">
                    <input type="radio" name="payment" className="accent-ci-blue" defaultChecked />
                    <span className="font-bold text-sm text-slate-700">QR Code PromptPay</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-ci-blue rounded-xl cursor-pointer transition-colors">
                    <input type="radio" name="payment" className="accent-ci-blue" />
                    <span className="font-bold text-sm text-slate-700">Credit / Debit Card</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-8">
              <h3 className="font-bold text-xl text-slate-800 mb-6">สรุปคำสั่งซื้อ</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={item.previewImage} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700 truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.size} / {item.quantity} ชิ้น</p>
                    </div>
                    <div className="text-sm font-bold text-slate-800">฿{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-100 my-4"></div>

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

              <button 
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-ci-blue/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-ci-blue/40 transition-all"
              >
                ยืนยันการสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

