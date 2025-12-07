'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, CreditCard, MapPin, Truck, ChevronLeft, ShieldCheck, QrCode, 
  Wallet, Package, ShoppingCart, ChevronRight, User, Phone, Home,
  Building, Mail, Sparkles, PartyPopper, ArrowRight
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'ตะกร้า', icon: ShoppingCart },
  { id: 2, label: 'ที่อยู่จัดส่ง', icon: Package },
  { id: 3, label: 'ชำระเงิน', icon: Wallet },
  { id: 4, label: 'เสร็จสิ้น', icon: Check },
];

export default function CheckoutClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(2); // Start at shipping (step 2)
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', district: '', subdistrict: '', city: '', postalCode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('promptpay');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('anajak_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else if (currentStep !== 4) {
      router.push('/cart');
    }
    setLoading(false);
  }, [currentStep, router]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  const handleNextStep = () => {
    if (currentStep === 2) {
      if (!formData.firstName || !formData.address || !formData.phone || !formData.city || !formData.postalCode) {
        alert('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        localStorage.removeItem('anajak_cart');
        window.dispatchEvent(new Event('cart-update'));
        setCurrentStep(4);
        setIsProcessing(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-12 h-12 border-4 border-ci-blue border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">กำลังโหลด...</p>
      </div>
    );
  }

  // Success Page
  if (currentStep === 4) {
    const orderId = `ORD-${Date.now().toString().slice(-8)}`;
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-center">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-ci-blue to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200">
                  A
                </div>
                <span className="font-bold text-xl text-slate-800">Anajak</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
          <div className="text-center mb-10">
            {/* Success Animation */}
            <div className="relative inline-block mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-200 animate-in zoom-in duration-500">
                <Check className="w-14 h-14" strokeWidth={3} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -left-3">
                <PartyPopper className="w-7 h-7 text-pink-400" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">🎉 สั่งซื้อสำเร็จ!</h1>
            <p className="text-slate-500 text-lg mb-2">ขอบคุณสำหรับการสั่งซื้อ</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
              <span className="text-slate-500">หมายเลขคำสั่งซื้อ:</span>
              <span className="font-mono font-bold text-ci-blue">{orderId}</span>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Shipping Info */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-ci-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">ที่อยู่จัดส่ง</h3>
                  <p className="text-sm text-slate-500">จัดส่งภายใน 3-5 วันทำการ</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-bold text-slate-800 mb-1">{formData.firstName} {formData.lastName}</p>
                <p className="text-slate-600 text-sm">
                  {formData.address}<br />
                  {formData.subdistrict && `${formData.subdistrict}, `}
                  {formData.district && `${formData.district}, `}
                  {formData.city} {formData.postalCode}
                </p>
                <p className="text-slate-500 text-sm mt-2">📞 {formData.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6">
              <h3 className="font-bold text-slate-800 mb-4">สรุปรายการ</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-slate-600">
                  <span>ยอดสินค้า</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ค่าจัดส่ง</span>
                  <span>฿{shipping.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="font-bold text-slate-800">ยอดรวมทั้งหมด</span>
                <span className="text-2xl font-bold text-green-600">฿{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/orders" 
              className="py-4 px-6 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              ติดตามคำสั่งซื้อ
            </Link>
            <Link 
              href="/catalog" 
              className="py-4 px-6 bg-ci-blue text-white font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all shadow-lg shadow-blue-200 text-center flex items-center justify-center gap-2"
            >
              สั่งทำเพิ่ม
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Processing Overlay
  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-4 border-ci-blue border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">กำลังดำเนินการ</h2>
        <p className="text-slate-500">กรุณารอสักครู่...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-ci-blue to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200">
                A
              </div>
              <span className="font-bold text-xl text-slate-800 hidden sm:block">Anajak</span>
            </Link>

            {/* Stepper */}
            <div className="flex items-center gap-1 sm:gap-2">
              {STEPS.map((step, i) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    {i > 0 && <div className={`w-4 sm:w-8 h-0.5 ${isCompleted ? 'bg-green-500' : 'bg-slate-200'}`} />}
                    <div className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full transition-all ${
                      isActive ? 'bg-ci-blue text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-white/20' : isCompleted ? 'bg-white/20' : ''
                      }`}>
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-bold hidden sm:inline">{step.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-10" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            {currentStep === 2 ? 'ที่อยู่จัดส่ง' : 'ชำระเงิน'}
          </h1>
          <p className="text-slate-500">
            {currentStep === 2 ? 'กรอกข้อมูลสำหรับจัดส่งสินค้า' : 'เลือกวิธีการชำระเงิน'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form */}
          <div className="flex-1">
            {/* Step 2: Shipping */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 sm:p-8">
                  {/* Contact Info */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-ci-blue" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">ข้อมูลติดต่อ</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">ชื่อ *</label>
                        <input 
                          type="text" 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                          placeholder="ชื่อ"
                          value={formData.firstName} 
                          onChange={e => setFormData({...formData, firstName: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">นามสกุล</label>
                        <input 
                          type="text" 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                          placeholder="นามสกุล"
                          value={formData.lastName} 
                          onChange={e => setFormData({...formData, lastName: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">เบอร์โทรศัพท์ *</label>
                        <input 
                          type="tel" 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                          placeholder="08x-xxx-xxxx"
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">อีเมล</label>
                        <input 
                          type="email" 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                          placeholder="email@example.com"
                          value={formData.email} 
                          onChange={e => setFormData({...formData, email: e.target.value})} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Home className="w-5 h-5 text-green-600" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">ที่อยู่จัดส่ง</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">ที่อยู่ (บ้านเลขที่, ถนน, ซอย) *</label>
                        <textarea 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all h-24 resize-none" 
                          placeholder="บ้านเลขที่ 123, ซอย xxx, ถนน xxx"
                          value={formData.address} 
                          onChange={e => setFormData({...formData, address: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">แขวง/ตำบล</label>
                          <input 
                            type="text" 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                            placeholder="แขวง/ตำบล"
                            value={formData.subdistrict} 
                            onChange={e => setFormData({...formData, subdistrict: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">เขต/อำเภอ</label>
                          <input 
                            type="text" 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                            placeholder="เขต/อำเภอ"
                            value={formData.district} 
                            onChange={e => setFormData({...formData, district: e.target.value})} 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">จังหวัด *</label>
                          <input 
                            type="text" 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                            placeholder="จังหวัด"
                            value={formData.city} 
                            onChange={e => setFormData({...formData, city: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">รหัสไปรษณีย์ *</label>
                          <input 
                            type="text" 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                            placeholder="10xxx"
                            value={formData.postalCode} 
                            onChange={e => setFormData({...formData, postalCode: e.target.value})} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-purple-600" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">เลือกวิธีการชำระเงิน</h2>
                    </div>

                    <div className="space-y-4">
                      {/* PromptPay */}
                      <label className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'promptpay' 
                          ? 'border-ci-blue bg-blue-50/50 ring-2 ring-ci-blue/20' 
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
                      }`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="w-5 h-5 text-ci-blue" 
                          checked={paymentMethod === 'promptpay'} 
                          onChange={() => setPaymentMethod('promptpay')} 
                        />
                        <div className="ml-4 flex-1">
                          <span className="block font-bold text-slate-800 text-lg">สแกนจ่าย PromptPay</span>
                          <span className="text-sm text-slate-500">ฟรีค่าธรรมเนียม • ยืนยันทันที</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                          <QrCode className="w-6 h-6" />
                        </div>
                      </label>

                      {/* Credit Card */}
                      <label className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'credit' 
                          ? 'border-ci-blue bg-blue-50/50 ring-2 ring-ci-blue/20' 
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'
                      }`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="w-5 h-5 text-ci-blue" 
                          checked={paymentMethod === 'credit'} 
                          onChange={() => setPaymentMethod('credit')} 
                        />
                        <div className="ml-4 flex-1">
                          <span className="block font-bold text-slate-800 text-lg">บัตรเครดิต / เดบิต</span>
                          <span className="text-sm text-slate-500">Visa, Mastercard, JCB</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white">
                          <CreditCard className="w-6 h-6" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* QR Code / Payment Details */}
                {paymentMethod === 'promptpay' && (
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 sm:p-8 text-center">
                      <h3 className="font-bold text-slate-800 mb-6">สแกน QR Code เพื่อชำระเงิน</h3>
                      <div className="w-48 h-48 bg-slate-100 mx-auto mb-6 p-4 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <QrCode className="w-28 h-28 text-slate-400" />
                      </div>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
                        <span className="text-slate-600">ยอดที่ต้องชำระ:</span>
                        <span className="text-2xl font-bold text-ci-blue">฿{total.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-4">QR Code จะหมดอายุใน 15 นาที</p>
                    </div>
                  </div>
                )}

                {/* Shipping Address Preview */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Truck className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold text-slate-800">ที่อยู่จัดส่ง</h3>
                      </div>
                      <button 
                        onClick={() => setCurrentStep(2)} 
                        className="text-ci-blue text-sm font-medium hover:underline"
                      >
                        แก้ไข
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="font-bold text-slate-800 mb-1">{formData.firstName} {formData.lastName}</p>
                      <p className="text-slate-600 text-sm">
                        {formData.address}<br />
                        {formData.subdistrict && `${formData.subdistrict}, `}
                        {formData.district && `${formData.district}, `}
                        {formData.city} {formData.postalCode}
                      </p>
                      <p className="text-slate-500 text-sm mt-2">📞 {formData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button 
                onClick={() => currentStep === 2 ? router.push('/cart') : setCurrentStep(2)}
                className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 flex items-center gap-2 hover:bg-white rounded-xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                ย้อนกลับ
              </button>
              
              <button 
                onClick={handleNextStep}
                className="px-8 sm:px-12 py-4 bg-ci-blue text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                {currentStep === 3 ? 'ยืนยันการชำระเงิน' : 'ขั้นตอนถัดไป'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
              <h3 className="font-bold text-slate-800 text-xl mb-6">สรุปคำสั่งซื้อ</h3>
              
              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                    <div className="w-14 h-14 bg-white rounded-lg border border-slate-200 flex-shrink-0 overflow-hidden">
                      <img src={item.previewImage} className="w-full h-full object-contain mix-blend-multiply p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.size} • {item.colorName}</p>
                      <p className="text-xs text-slate-400">x{item.quantity}</p>
                    </div>
                    <p className="font-bold text-slate-700 text-sm">฿{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-slate-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>ยอดรวมสินค้า ({totalItems} ชิ้น)</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ค่าจัดส่ง</span>
                  <span>฿{shipping.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-ci-blue to-blue-600 p-5 rounded-2xl text-white mb-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-blue-200 text-sm">ยอดที่ต้องชำระ</span>
                    <p className="text-3xl font-bold">฿{total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-slate-400">
                <div className="flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  ปลอดภัย 100%
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <div className="flex items-center gap-1.5 text-xs">
                  <Truck className="w-4 h-4" />
                  จัดส่ง 3-5 วัน
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
