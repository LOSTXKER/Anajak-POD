'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, CheckCircle2, Zap, Star, ShieldCheck, Truck, Package, 
  Palette, Store, TrendingUp, Clock, BadgeCheck, ChevronDown,
  Shirt, ShoppingBag, Building2, Users, Gift, PartyPopper,
  Sparkles, Play, Factory, Ban, RefreshCw, Lock, MapPin,
  MessageCircle
} from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import ProductionTicker from '@/components/ProductionTicker';
import TypeWriter from '@/components/TypeWriter';
import HeroDesigner from '@/components/HeroDesigner';

export default function LandingPage() {
  const [activeMode, setActiveMode] = useState<'seller' | 'personal'>('personal');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modeAnimating, setModeAnimating] = useState(false);

  const handleModeChange = (mode: 'seller' | 'personal') => {
    if (mode === activeMode) return;
    setModeAnimating(true);
    setTimeout(() => {
      setActiveMode(mode);
      setTimeout(() => setModeAnimating(false), 300);
    }, 150);
  };

  const products = [
    { name: "เสื้อยืดคอกลม Premium", price: "฿120", image: "/shirt/front.png", colors: 12, badge: "ขายดี" },
    { name: "เสื้อ Oversize", price: "฿140", image: "/shirt/front.png", colors: 8, badge: null },
    { name: "Hoodie Classic", price: "฿350", image: "/shirt/front.png", colors: 6, badge: "ใหม่" },
    { name: "กระเป๋าผ้า Canvas", price: "฿80", image: "/shirt/front.png", colors: 4, badge: null },
  ];

  const useCases = [
    { icon: Users, label: "เสื้อรุ่น", href: "/use-cases/class-shirt" },
    { icon: Gift, label: "งานบวช", href: "/use-cases/ordination" },
    { icon: PartyPopper, label: "งานแต่ง", href: "/use-cases/wedding" },
    { icon: Shirt, label: "เสื้อทีม", href: "/use-cases/team" },
    { icon: Users, label: "เสื้อแก๊ง", href: "/use-cases/gang" },
    { icon: Sparkles, label: "เทศกาล", href: "/use-cases/festival" },
  ];

  const faqs = [
    { q: "สั่งขั้นต่ำกี่ชิ้น?", a: "ไม่มีขั้นต่ำเลยครับ สั่งได้ตั้งแต่ 1 ชิ้น เหมาะสำหรับทำของขวัญพิเศษ หรือสั่งเยอะก็ได้ส่วนลด" },
    { q: "ใช้เวลาผลิตนานแค่ไหน?", a: "ปกติ 1-3 วันทำการ ขึ้นอยู่กับปริมาณคิว หลังจากนั้นจัดส่งอีก 1-2 วัน รวมแล้วได้รับใน 2-5 วัน" },
    { q: "ซักแล้วลอกไหม?", a: "รับประกันซัก 100+ ครั้งไม่ลอก เราใช้เทคนิค DTG/DTF คุณภาพสูง หมึกซึมเข้าเนื้อผ้า" },
    { q: "ฉันไม่เก่งออกแบบ ทำได้ไหม?", a: "ได้แน่นอน! มี Template สำเร็จรูปให้เลือกเยอะมาก แค่เปลี่ยนข้อความ/รูปก็เสร็จ หรือจะอัพโหลดรูปตัวเองก็ได้" },
    { q: "ต้องสมัครสมาชิกก่อนไหม?", a: "ไม่ต้องครับ! ออกแบบได้เลยฟรีๆ ไม่ต้องสมัคร จะสมัครตอนสั่งซื้อก็ได้" },
  ];

  const testimonials = [
    {
      name: "คุณเบียร์",
      role: "@BeerTeeShop",
      text: "เปิดร้านเสื้อมา 6 เดือน ไม่ต้องสต็อกของเลย กำไรสม่ำเสมอทุกเดือน รายได้เฉลี่ย 50,000/เดือน",
      rating: 5,
      type: "seller"
    },
    {
      name: "คุณแพร",
      role: "HR บริษัท ABC",
      text: "สั่งเสื้อทีมงาน 30 ตัว คุณภาพดีมาก ทุกคนประทับใจ ส่งไวด้วย จะกลับมาสั่งอีกแน่นอน",
      rating: 5,
      type: "corporate"
    },
    {
      name: "คุณโอม",
      role: "นักศึกษา ม.เกษตร",
      text: "ทำเสื้อรุ่น 120 ตัว ราคาดีมาก คุณภาพเกินราคา เพื่อนๆ ชอบกันหมด!",
      rating: 5,
      type: "personal"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Live Production Ticker - Fixed at top */}
      <ProductionTicker />
      
      <LandingHeader />
      
      <main>
        {/* ============================================
            HERO SECTION - Stacked Layout
        ============================================ */}
        <section className="relative pt-28 pb-12 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-slate-50" />
          <div className="absolute inset-0 bg-dot-pattern opacity-50" />
          
          {/* Floating decorations */}
          <div className="absolute top-1/4 right-[10%] w-72 h-72 bg-ci-yellow/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-[5%] w-96 h-96 bg-ci-blue/10 rounded-full blur-3xl animate-pulse-slow delay-300" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Top: Hero Text - Centered */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-slate-100 text-sm font-medium mb-6 animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-slate-600">
                  ผลิตโดยโรงงาน <span className="font-bold text-ci-blue">Anajak T-Shirt</span> • ประสบการณ์กว่า 20 ปี
                </span>
              </div>
            
              {/* Main Headline */}
              <div className={`transition-all duration-300 ${modeAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up delay-100">
                  {activeMode === 'personal' ? (
                    <TypeWriter 
                      key="personal"
                      words={['ทำเสื้อได้ภายใน', 'ออกแบบเสื้อใน', 'สร้างของขวัญใน']}
                      typingSpeed={80}
                      deletingSpeed={40}
                      pauseTime={3000}
                      className="text-slate-900"
                    />
                  ) : (
                    <TypeWriter 
                      key="seller"
                      words={['เปิดร้านได้ใน', 'สร้างแบรนด์ใน', 'เริ่มธุรกิจใน']}
                      typingSpeed={80}
                      deletingSpeed={40}
                      pauseTime={3000}
                      className="text-slate-900"
                    />
                  )}
                  {' '}
                  <span className="relative inline-block">
                    <span className="gradient-text">5 นาที</span>
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
                      <path d="M2 10C50 2 150 2 198 10" stroke="#fec91b" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
              
                {/* Subheadline */}
                <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed animate-fade-in-up delay-200">
                  {activeMode === 'personal' ? (
                    <>
                      <span className="font-medium text-slate-800">ไม่ต้องคุยกับโรงงาน</span> • ไม่ต้องรอใบเสนอราคา • ไม่ต้องแก้ไฟล์
                    </>
                  ) : (
                    <>
                      <span className="font-medium text-slate-800">ไม่ต้องสต็อกสินค้า</span> • ไม่ต้องจัดส่งเอง • ไม่ต้องลงทุนล่วงหน้า
                    </>
                  )}
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex justify-center mb-6 animate-fade-in-up delay-300">
                <div className="bg-white p-1 rounded-xl shadow-lg border border-slate-200 inline-flex gap-1">
                  <button
                    onClick={() => handleModeChange('personal')}
                    className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      activeMode === 'personal' 
                        ? 'bg-gradient-to-r from-ci-blue to-blue-600 text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Shirt className={`w-4 h-4 transition-transform duration-300 ${activeMode === 'personal' ? 'scale-110' : ''}`} />
                    <span>ซื้อใส่เอง</span>
                  </button>
                  <button
                    onClick={() => handleModeChange('seller')}
                    className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      activeMode === 'seller' 
                        ? 'bg-gradient-to-r from-ci-blue to-blue-600 text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Store className={`w-4 h-4 transition-transform duration-300 ${activeMode === 'seller' ? 'scale-110' : ''}`} />
                    <span>ทำขาย / สร้างแบรนด์</span>
                  </button>
                </div>
              </div>

              {/* Stats - Compact & Mobile Friendly */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 animate-fade-in-up delay-400">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5 text-ci-yellow">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />)}
                  </div>
                  <span className="text-xs md:text-sm text-slate-600 ml-1"><span className="font-bold">4.9</span></span>
                </div>
                <div className="hidden md:block w-px h-5 bg-slate-300" />
                <div className="text-xs md:text-sm text-slate-600">
                  <span className="font-bold text-slate-800">50,000+</span> ออเดอร์
                </div>
                <div className="hidden md:block w-px h-5 bg-slate-300" />
                <div className="flex items-center gap-1 text-xs md:text-sm text-slate-600">
                  <Factory className="w-3.5 h-3.5 md:w-4 md:h-4 text-ci-blue" />
                  <span>ผลิตในไทย</span>
                </div>
              </div>
            </div>

            {/* Bottom: Interactive Designer - Full Width */}
            <div className="animate-fade-in-up delay-500">
              <HeroDesigner />
            </div>
          </div>
        </section>

        {/* ============================================
            VALUE PROPOSITION STRIP
        ============================================ */}
        <section className="bg-slate-900 text-white py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-center">
              {[
                { icon: Zap, text: "5 นาทีออกแบบ" },
                { icon: Ban, text: "ไม่ต้องคุยกับใคร" },
                { icon: Package, text: "ส่งใน 2-3 วัน" },
                { icon: Factory, text: "โรงงานผลิตเอง" },
                ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-ci-yellow" />
                  <span className="font-medium">{item.text}</span>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* ============================================
            POD EDUCATION SECTION
        ============================================ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-ci-blue text-sm font-bold mb-4">
                <Sparkles className="w-4 h-4" />
                สำหรับมือใหม่
              </span>
              <h2 className="section-title">
                POD คืออะไร? <span className="text-slate-400 font-normal">(Print on Demand)</span>
              </h2>
              <p className="section-subtitle">
                &quot;พิมพ์ตามสั่ง&quot; - ระบบที่ให้คุณสร้างสินค้าที่มีดีไซน์ของตัวเอง<br />
                โดยเราจะผลิตและจัดส่งให้เมื่อมีคนสั่งซื้อ
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {[
                { step: 1, icon: Palette, title: "ออกแบบ", desc: "สร้างดีไซน์ของคุณเอง", color: "blue" },
                { step: 2, icon: ShoppingBag, title: "ลูกค้าสั่ง", desc: "มีคนสั่งซื้อสินค้า", color: "purple" },
                { step: 3, icon: Package, title: "เราผลิต", desc: "เราพิมพ์และแพ็คให้", color: "orange" },
                { step: 4, icon: Truck, title: "ส่งถึงมือ", desc: "จัดส่งตรงถึงลูกค้า", color: "green" },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      item.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-blue-600'
                    }`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                     </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: CheckCircle2, text: "ไม่ต้องสต็อกสินค้า", color: "text-blue-600" },
                { icon: ShieldCheck, text: "ไม่มีความเสี่ยง", color: "text-blue-600" },
                { icon: Zap, text: "เริ่มต้นฟรี", color: "text-purple-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 px-5 py-3 rounded-full">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            MODE-SPECIFIC CONTENT
        ============================================ */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Section Header with Mode Tabs */}
            <div className="text-center mb-16">
              <div className="inline-flex bg-white p-1.5 rounded-full shadow-lg border border-slate-200 mb-8 gap-1">
                <button
                  onClick={() => handleModeChange('personal')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    activeMode === 'personal' 
                      ? 'bg-gradient-to-r from-ci-blue to-blue-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Shirt className={`w-4 h-4 transition-transform duration-300 ${activeMode === 'personal' ? 'scale-110' : ''}`} />
                  ซื้อใส่เอง
                </button>
                <button
                  onClick={() => handleModeChange('seller')}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    activeMode === 'seller' 
                      ? 'bg-gradient-to-r from-ci-blue to-blue-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Store className={`w-4 h-4 transition-transform duration-300 ${activeMode === 'seller' ? 'scale-110' : ''}`} />
                  ทำขาย / สร้างแบรนด์
                </button>
              </div>

              <div className={`transition-all duration-300 ${modeAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <h2 className="section-title">
                  {activeMode === 'personal' 
                    ? 'สร้างสรรค์ในแบบของคุณ' 
                    : 'สร้างธุรกิจ Print on Demand ของคุณ'}
                </h2>
                <p className="section-subtitle">
                  {activeMode === 'personal'
                    ? 'สั่งได้ตั้งแต่ 1 ชิ้น ไม่มีขั้นต่ำ คุณภาพพรีเมียม เกรดส่งออก'
                    : 'ไม่ต้องสต็อก ไม่ต้องจัดส่งเอง กำไรเฉลี่ย 40-60% ต่อชิ้น'}
                </p>
              </div>
            </div>

            {/* Mode Content with Animation */}
            <div className={`transition-all duration-300 ${modeAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
              {activeMode === 'personal' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    { icon: Shirt, title: "สั่งได้ตั้งแต่ 1 ชิ้น", desc: "ไม่มีขั้นต่ำ ทำชิ้นเดียวก็ได้" },
                    { icon: Gift, title: "เหมาะทำของขวัญ", desc: "ของขวัญพิเศษที่ไม่ซ้ำใคร" },
                    { icon: Star, title: "คุณภาพพรีเมียม", desc: "เกรดส่งออก ซักไม่ลอก" },
                    { icon: Truck, title: "ส่งทั่วไทย", desc: "3-5 วันถึงมือ" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-ci-blue mb-4">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    { icon: TrendingUp, title: "กำไร 40-60%", desc: "ตั้งราคาขายได้ตามต้องการ" },
                    { icon: Store, title: "เชื่อมต่อ Marketplace", desc: "Shopee, Lazada, TikTok Shop" },
                    { icon: Package, title: "Fulfillment อัตโนมัติ", desc: "เราจัดส่งให้ในนามคุณ" },
                    { icon: Clock, title: "ถอนกำไรได้ทุกวัน", desc: "โอนเข้าบัญชีทันที" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Use Case Tags (Personal Mode) */}
            {activeMode === 'personal' && (
              <div className="text-center">
                <p className="text-slate-500 mb-4">ไอเดียยอดนิยม:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {useCases.map((item, i) => (
              <Link 
                      key={i} 
                      href={item.href}
                      className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 hover:border-ci-blue hover:text-ci-blue transition-all"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className={`text-center mt-12 transition-all duration-300 ${modeAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <Link href="/designer" className="btn-primary text-lg px-8 py-4 inline-flex">
                {activeMode === 'personal' ? 'เริ่มออกแบบของฉัน' : 'เริ่มสร้างร้านค้าฟรี'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            PRODUCT SHOWCASE
        ============================================ */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                 <div>
                <h2 className="section-title mb-2">สินค้ายอดนิยม</h2>
                    <p className="text-slate-600">คุณภาพระดับพรีเมียม การันตีด้วยยอดขายอันดับ 1</p>
                 </div>
              <Link href="/catalog" className="text-ci-blue font-bold flex items-center gap-1 hover:underline">
                ดูแคตตาล็อกทั้งหมด <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <Link href="/catalog/1" key={i} className="group">
                  <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-square relative p-6 flex items-center justify-center">
                      {product.badge && (
                        <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${
                          product.badge === 'ขายดี' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-blue-600'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                          <Image
                             src={product.image}
                             alt={product.name}
                        width={200}
                        height={200}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                      <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-700 hover:bg-ci-blue hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                             <Palette className="w-5 h-5" />
                          </button>
                       </div>
                    <div className="p-4 bg-white">
                          <h3 className="font-bold text-slate-900 mb-1 truncate">{product.name}</h3>
                          <div className="flex justify-between items-center">
                        <span className="text-ci-blue font-bold text-lg">{product.price}+</span>
                             <span className="text-xs text-slate-500">{product.colors} สี</span>
                      </div>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
              
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {['เสื้อผ้า', 'กระเป๋า', 'หมวก', 'แก้วมัค', 'สติ๊กเกอร์'].map((cat, i) => (
                <Link 
                  key={i} 
                  href={`/catalog?category=${cat}`}
                  className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600 hover:bg-ci-blue hover:text-white transition-all"
                >
                  {cat}
                 </Link>
              ))}
              </div>
           </div>
        </section>

        {/* ============================================
            QUALITY & TECHNOLOGY
        ============================================ */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
           <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-ci-yellow text-sm font-bold mb-6">
                  <BadgeCheck className="w-4 h-4" />
                  คุณภาพระดับส่งออก
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading">
                  มาตรฐานโรงงาน<br />
                  <span className="text-ci-yellow">ในราคาที่คุณเข้าถึงได้</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  เราไม่ใช่แค่แพลตฟอร์ม แต่เราคือโรงงานผู้ผลิตตัวจริงที่มีประสบการณ์กว่า 20 ปี 
                  เราเข้าใจเรื่องผ้า เรื่องสี และเรื่องการสกรีนดีที่สุด
                </p>

                <ul className="space-y-4 mb-10">
                          {[
                             "โรงงานผลิตเอง ไม่ผ่านคนกลาง ราคาดีที่สุด",
                             "ใช้เครื่องจักร Epson F3070 Industrial Grade",
                             "เทคนิค DTG และ DTF ความละเอียดสูง",
                    "หมึกแท้ Eco-Friendly ปลอดภัย ซักไม่ลอก",
                    "QC ตรวจสอบคุณภาพทุกชิ้นก่อนส่ง",
                          ].map((item, i) => (
                             <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-ci-blue shrink-0 mt-0.5" />
                                <span className="text-slate-200">{item}</span>
                             </li>
                          ))}
                       </ul>

                <div className="flex gap-4">
                  <Link href="/about" className="btn-primary bg-white text-slate-900 hover:bg-slate-100">
                    <Play className="w-5 h-5" />
                    ดูวิดีโอโรงงาน
                  </Link>
                  <Link href="/corporate" className="btn-secondary border-white/30 text-white hover:bg-white/10">
                    สั่งจำนวนมาก
                  </Link>
                          </div>
                       </div>

              {/* Right: Stats & Tech */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "ปีประสบการณ์", value: "20+", Icon: Factory },
                    { label: "ออเดอร์จัดส่ง", value: "50,000+", Icon: Package },
                    { label: "คะแนนรีวิว", value: "4.9", Icon: Star },
                    { label: "ซักไม่ลอก", value: "100+", unit: "ครั้ง", Icon: Sparkles },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                      <stat.Icon className="w-8 h-8 text-ci-yellow mb-2" />
                      <p className="text-3xl font-bold text-ci-yellow mb-1">
                        {stat.value}{stat.unit && <span className="text-lg text-slate-400">{stat.unit}</span>}
                      </p>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                 </div>

                {/* Print Tech Cards */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { name: "DTG", desc: "Direct to Garment", highlight: "สีสันสดใส" },
                    { name: "DTF", desc: "Direct to Film", highlight: "งานละเอียด" },
                    { name: "Screen", desc: "Screen Print", highlight: "จำนวนมาก" },
                  ].map((tech, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/15 transition-all">
                      <p className="font-bold text-lg mb-1">{tech.name}</p>
                      <p className="text-xs text-slate-400 mb-2">{tech.desc}</p>
                      <span className="text-xs text-ci-yellow">{tech.highlight}</span>
                    </div>
                  ))}
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            TESTIMONIALS
        ============================================ */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="section-title">ลูกค้าพูดถึงเรา</h2>
              <p className="section-subtitle">รีวิวจริงจากผู้ใช้งานจริง</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex items-center gap-1 text-ci-yellow mb-4">
                    {[...Array(item.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">&quot;{item.text}&quot;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                      {item.name.charAt(3)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                { Icon: ShieldCheck, text: "รับประกันคุณภาพ" },
                { Icon: RefreshCw, text: "คืน/เปลี่ยนได้ 7 วัน" },
                { Icon: Lock, text: "ชำระเงินปลอดภัย" },
                { Icon: MapPin, text: "ผลิตในไทย 100%" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
                  <badge.Icon className="w-4 h-4 text-ci-blue" />
                  <span className="text-sm font-medium text-slate-600">{badge.text}</span>
                </div>
              ))}
              </div>
           </div>
        </section>

        {/* ============================================
            FAQ SECTION
        ============================================ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="section-title">คำถามที่พบบ่อย</h2>
              <p className="section-subtitle">หาคำตอบที่คุณต้องการ</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`bg-slate-50 rounded-2xl overflow-hidden transition-all ${openFaq === i ? 'ring-2 ring-ci-blue' : ''}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 -mt-2">
                      <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
           </div>

            <div className="text-center mt-10">
              <p className="text-slate-500 mb-4">ยังมีคำถามอื่นอีก?</p>
              <Link href="/contact" className="btn-secondary inline-flex">
                <MessageCircle className="w-5 h-5" />
                ติดต่อทีมงาน
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            FINAL CTA
        ============================================ */}
        <section className="py-24 gradient-bg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-pattern" />
          </div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

           <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
              พร้อมเริ่มต้นแล้วหรือยัง?
            </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              ไม่ว่าจะอยากสร้างรายได้ หรือแค่อยากมีของใช้เก๋ๆ ในแบบของคุณ
              <br />
              เริ่มออกแบบได้เลยตอนนี้ <span className="font-bold text-white">ไม่ต้องสมัคร ไม่ต้องลงทุน</span>
              </p>
              
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                 <Link 
                    href="/designer" 
                className="w-full sm:w-auto px-10 py-5 bg-white text-ci-blue rounded-xl font-bold text-xl shadow-xl hover:bg-blue-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                 >
                <Palette className="w-6 h-6" />
                เริ่มออกแบบฟรี
                 </Link>
                 <Link 
                href="/catalog" 
                    className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-xl hover:bg-white/10 transition-all"
                 >
                ดูแคตตาล็อกสินค้า
                 </Link>
              </div>
              
            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200/80">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> ไม่ต้องใช้บัตรเครดิต</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> ออกแบบฟรี 100%</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> ไม่มีขั้นต่ำ</span>
            </div>
           </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
