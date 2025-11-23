'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, CreditCard, MapPin, Truck, ChevronLeft, ShieldCheck, QrCode, Wallet, Gift } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StepIndicator from '../../components/StepIndicator';

export default function CheckoutClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', 
    address: '', city: '', postalCode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('promptpay');

  useEffect(() => {
    const savedCart = localStorage.getItem('anajak_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else if (currentStep !== 3) {
      router.push('/cart');
    }
    setLoading(false);
  }, [currentStep, router]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const total = subtotal + shipping;

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.address || !formData.phone) {
        alert('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน');
        return;
      }
      setCurrentStep(2);
      window.scrollTo(0, 0);
    } else if (currentStep === 2) {
      // Process Order
      setLoading(true);
      setTimeout(() => {
        localStorage.removeItem('anajak_cart');
        setCurrentStep(3);
        setLoading(false);
        window.scrollTo(0, 0);
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-ci-blue border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">กำลังดำเนินการ...</p>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <DashboardLayout title="คำสั่งซื้อสำเร็จ" showCreateButton={false}>
        <div className="max-w-xl mx-auto py-12 px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <Check className="w-10 h-10" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">ขอบคุณสำหรับการสั่งซื้อ</h1>
          <p className="text-slate-500 mb-8">หมายเลขคำสั่งซื้อของคุณ: <span className="font-mono font-bold text-slate-800">#ORD-{Date.now().toString().slice(-6)}</span></p>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left mb-8">
            <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">รายละเอียดการจัดส่ง</h3>
            <p className="text-slate-600">
              <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span><br />
              {formData.address}<br />
              {formData.city} {formData.postalCode}<br />
              <span className="text-sm text-slate-400 mt-1 block">โทร: {formData.phone}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/orders" className="py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
              ติดตามคำสั่งซื้อ
            </Link>
            <Link href="/designer" className="py-3 bg-ci-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              สั่งทำเพิ่ม
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="ชำระเงิน" showCreateButton={false}>
      <div className="max-w-6xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator 
            currentStep={currentStep === 1 ? 2 : currentStep === 2 ? 3 : 4} 
            steps={['ตะกร้า', 'ที่อยู่จัดส่ง', 'ชำระเงิน', 'เสร็จสิ้น']} 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {currentStep === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <MapPin className="w-6 h-6 text-ci-blue" />
                  <h2 className="text-xl font-bold text-slate-800">ที่อยู่จัดส่ง</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">ชื่อ</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 outline-none" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">นามสกุล</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 outline-none" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-sm font-bold text-slate-700">ที่อยู่</label>
                    <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 outline-none h-24 resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">จังหวัด</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 outline-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">รหัสไปรษณีย์</label>
                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 outline-none" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-sm font-bold text-slate-700">เบอร์โทรศัพท์</label>
                    <input type="tel" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <Wallet className="w-6 h-6 text-ci-blue" />
                  <h2 className="text-xl font-bold text-slate-800">เลือกวิธีการชำระเงิน</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'promptpay' ? 'border-ci-blue bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'}`}>
                    <input type="radio" name="payment" className="w-5 h-5 text-ci-blue" checked={paymentMethod === 'promptpay'} onChange={() => setPaymentMethod('promptpay')} />
                    <div className="ml-4 flex-1">
                      <span className="block font-bold text-slate-800">สแกนจ่าย PromptPay</span>
                      <span className="text-sm text-slate-500">ฟรีค่าธรรมเนียม, ยืนยันทันที</span>
                    </div>
                    <QrCode className="w-6 h-6 text-slate-400" />
                  </label>

                  <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-ci-blue bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'}`}>
                    <input type="radio" name="payment" className="w-5 h-5 text-ci-blue" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} />
                    <div className="ml-4 flex-1">
                      <span className="block font-bold text-slate-800">บัตรเครดิต / เดบิต</span>
                      <span className="text-sm text-slate-500">Visa, Mastercard, JCB</span>
                    </div>
                    <CreditCard className="w-6 h-6 text-slate-400" />
                  </label>
                </div>

                {paymentMethod === 'promptpay' && (
                  <div className="bg-slate-50 p-6 rounded-xl text-center mb-6 border border-slate-200">
                    <div className="w-40 h-40 bg-white mx-auto mb-4 p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-center text-slate-300">
                      <QrCode className="w-20 h-20" />
                    </div>
                    <p className="font-bold text-slate-800">แสกน QR Code เพื่อชำระเงิน</p>
                    <p className="text-ci-blue font-bold text-xl mt-1">฿{total.toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => currentStep === 1 ? router.push('/cart') : setCurrentStep(1)}
                className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                ย้อนกลับ
              </button>
              
              <button 
                onClick={handleNextStep}
                className="px-10 py-3.5 bg-ci-blue text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
              >
                {currentStep === 2 ? 'ยืนยันการชำระเงิน' : 'ขั้นตอนถัดไป'}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">สรุปคำสั่งซื้อ</h3>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-200 flex-shrink-0 overflow-hidden">
                      <img src={item.previewImage} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">x{item.quantity}</p>
                    </div>
                    <p className="font-bold text-slate-700 text-sm">฿{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>ยอดรวมสินค้า</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>ค่าจัดส่ง</span>
                  <span>฿{shipping.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-800">ยอดสุทธิ</span>
                  <span className="text-2xl font-bold text-ci-blue">฿{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                <ShieldCheck className="w-4 h-4" />
                ชำระเงินปลอดภัย 100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

