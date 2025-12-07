'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, CreditCard, ChevronLeft, ShieldCheck, QrCode, 
  Wallet, Truck, ChevronRight, User, Home,
  Sparkles, PartyPopper, ArrowRight, Package
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

export default function CheckoutClient() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  
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
    } else if (currentStep !== 3) {
      router.push('/cart');
    }
    setLoading(false);
  }, [currentStep, router]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.address || !formData.phone || !formData.city || !formData.postalCode) {
        alert('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        localStorage.removeItem('anajak_cart');
        window.dispatchEvent(new Event('cart-update'));
        setCurrentStep(3);
        setIsProcessing(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="ชำระเงิน" showCreateButton={false}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-ci-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">กำลังโหลด...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Success Page
  if (currentStep === 3) {
    const orderId = `ORD-${Date.now().toString().slice(-8)}`;
    return (
      <DashboardLayout title="สั่งซื้อสำเร็จ" showCreateButton={false}>
        <div className="max-w-2xl mx-auto py-8">
          <div className="text-center mb-8">
            {/* Success Animation */}
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-200">
                <Check className="w-12 h-12" strokeWidth={3} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -left-3">
                <PartyPopper className="w-5 h-5 text-pink-400" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">🎉 สั่งซื้อสำเร็จ!</h1>
            <p className="text-slate-500 mb-2">ขอบคุณสำหรับการสั่งซื้อ</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
              <span className="text-slate-500 text-sm">หมายเลขคำสั่งซื้อ:</span>
              <span className="font-mono font-bold text-ci-blue">{orderId}</span>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
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
                <span className="text-xl font-bold text-green-600">฿{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/orders" 
              className="py-3.5 px-6 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all text-center flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              ติดตามคำสั่งซื้อ
            </Link>
            <Link 
              href="/catalog" 
              className="py-3.5 px-6 bg-ci-blue text-white font-bold rounded-xl hover:bg-ci-blueDark transition-all shadow-lg shadow-blue-200 text-center flex items-center justify-center gap-2"
            >
              สั่งทำเพิ่ม
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Processing Overlay
  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-ci-blue border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">กำลังดำเนินการ</h2>
        <p className="text-slate-500">กรุณารอสักครู่...</p>
      </div>
    );
  }

  return (
    <DashboardLayout 
      title={currentStep === 1 ? 'ที่อยู่จัดส่ง' : 'ชำระเงิน'} 
      subtitle={currentStep === 1 ? 'กรอกข้อมูลสำหรับจัดส่งสินค้า' : 'เลือกวิธีการชำระเงิน'}
      showCreateButton={false}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form */}
          <div className="flex-1">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
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
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                          placeholder="ชื่อ"
                          value={formData.firstName} 
                          onChange={e => setFormData({...formData, firstName: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">นามสกุล</label>
                        <input 
                          type="text" 
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                          placeholder="นามสกุล"
                          value={formData.lastName} 
                          onChange={e => setFormData({...formData, lastName: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">เบอร์โทรศัพท์ *</label>
                        <input 
                          type="tel" 
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                          placeholder="08x-xxx-xxxx"
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">อีเมล</label>
                        <input 
                          type="email" 
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
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
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all h-20 resize-none" 
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
                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                            placeholder="แขวง/ตำบล"
                            value={formData.subdistrict} 
                            onChange={e => setFormData({...formData, subdistrict: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">เขต/อำเภอ</label>
                          <input 
                            type="text" 
                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
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
                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
                            placeholder="จังหวัด"
                            value={formData.city} 
                            onChange={e => setFormData({...formData, city: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">รหัสไปรษณีย์ *</label>
                          <input 
                            type="text" 
                            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-ci-blue/20 focus:border-ci-blue outline-none transition-all" 
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

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-purple-600" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">เลือกวิธีการชำระเงิน</h2>
                    </div>

                    <div className="space-y-4">
                      {/* PromptPay */}
                      <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'promptpay' 
                          ? 'border-ci-blue bg-blue-50/50 ring-2 ring-ci-blue/20' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="w-5 h-5 text-ci-blue" 
                          checked={paymentMethod === 'promptpay'} 
                          onChange={() => setPaymentMethod('promptpay')} 
                        />
                        <div className="ml-4 flex-1">
                          <span className="block font-bold text-slate-800">สแกนจ่าย PromptPay</span>
                          <span className="text-sm text-slate-500">ฟรีค่าธรรมเนียม • ยืนยันทันที</span>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                          <QrCode className="w-5 h-5" />
                        </div>
                      </label>

                      {/* Credit Card */}
                      <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'credit' 
                          ? 'border-ci-blue bg-blue-50/50 ring-2 ring-ci-blue/20' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="w-5 h-5 text-ci-blue" 
                          checked={paymentMethod === 'credit'} 
                          onChange={() => setPaymentMethod('credit')} 
                        />
                        <div className="ml-4 flex-1">
                          <span className="block font-bold text-slate-800">บัตรเครดิต / เดบิต</span>
                          <span className="text-sm text-slate-500">Visa, Mastercard, JCB</span>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white">
                          <CreditCard className="w-5 h-5" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                {paymentMethod === 'promptpay' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 sm:p-8 text-center">
                      <h3 className="font-bold text-slate-800 mb-6">สแกน QR Code เพื่อชำระเงิน</h3>
                      <div className="w-40 h-40 bg-slate-100 mx-auto mb-4 p-4 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-slate-400" />
                      </div>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
                        <span className="text-slate-600">ยอดที่ต้องชำระ:</span>
                        <span className="text-xl font-bold text-ci-blue">฿{total.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-4">QR Code จะหมดอายุใน 15 นาที</p>
                    </div>
                  </div>
                )}

                {/* Shipping Address Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Truck className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold text-slate-800">ที่อยู่จัดส่ง</h3>
                      </div>
                      <button 
                        onClick={() => setCurrentStep(1)} 
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
            <div className="mt-6 flex justify-between">
              <button 
                onClick={() => currentStep === 1 ? router.push('/cart') : setCurrentStep(1)}
                className="px-5 py-2.5 text-slate-500 font-bold hover:text-slate-800 flex items-center gap-2 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                ย้อนกลับ
              </button>
              
              <button 
                onClick={handleNextStep}
                className="px-8 py-3 bg-ci-blue text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-ci-blueDark transition-all flex items-center gap-2"
              >
                {currentStep === 2 ? 'ยืนยันการชำระเงิน' : 'ขั้นตอนถัดไป'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              <h3 className="font-bold text-slate-800 text-lg mb-6">สรุปคำสั่งซื้อ</h3>
              
              {/* Items List */}
              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2.5 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex-shrink-0 overflow-hidden">
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
              <div className="border-t border-slate-100 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>ยอดรวมสินค้า ({totalItems} ชิ้น)</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>ค่าจัดส่ง</span>
                  <span>฿{shipping.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-ci-blue to-blue-600 p-4 rounded-xl text-white mb-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-blue-200 text-sm">ยอดที่ต้องชำระ</span>
                    <p className="text-2xl font-bold">฿{total.toLocaleString()}</p>
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
      </div>
    </DashboardLayout>
  );
}
