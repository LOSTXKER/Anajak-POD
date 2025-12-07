'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Shirt, Palette, Truck, Star, Check, 
  Sparkles, Zap, Shield, Users, ChevronRight,
  Play, Menu, X
} from 'lucide-react';

const FEATURES = [
  {
    icon: Palette,
    title: 'ออกแบบง่าย',
    description: 'เครื่องมือออกแบบใช้งานง่าย ไม่ต้องมีประสบการณ์',
    color: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-200',
  },
  {
    icon: Shirt,
    title: 'คุณภาพสูง',
    description: 'เสื้อผ้าคุณภาพดี พิมพ์ด้วยเทคนิค DTF/DTG',
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-200',
  },
  {
    icon: Truck,
    title: 'จัดส่งรวดเร็ว',
    description: 'ผลิตและจัดส่งภายใน 3-5 วันทำการ',
    color: 'from-green-500 to-emerald-500',
    shadow: 'shadow-green-200',
  },
  {
    icon: Shield,
    title: 'รับประกันคุณภาพ',
    description: 'ไม่พอใจยินดีคืนเงิน 100%',
    color: 'from-purple-500 to-violet-500',
    shadow: 'shadow-purple-200',
  },
];

const TESTIMONIALS = [
  {
    name: 'คุณสมชาย',
    role: 'เจ้าของร้าน Streetwear',
    content: 'ใช้บริการมาหลายครั้ง คุณภาพดีมาก ลูกค้าชอบทุกคน',
    avatar: '👨‍💼',
    rating: 5,
  },
  {
    name: 'คุณมานี',
    role: 'นักออกแบบอิสระ',
    content: 'ระบบใช้งานง่ายมาก แค่อัพโหลดรูปก็พิมพ์ได้เลย',
    avatar: '👩‍🎨',
    rating: 5,
  },
  {
    name: 'คุณวิชัย',
    role: 'จัดทำเสื้อทีม',
    content: 'สั่งทำเสื้อทีมบริษัท 100 ตัว ส่งตรงเวลา คุณภาพเกินราคา',
    avatar: '👨‍💻',
    rating: 5,
  },
];

const PRODUCTS = [
  { name: 'เสื้อยืดคอกลม', price: 199, image: '/products/tshirt.png' },
  { name: 'เสื้อโปโล', price: 299, image: '/products/polo.png' },
  { name: 'เสื้อแขนยาว', price: 249, image: '/products/longsleeve.png' },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-ci-blue to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200">
                A
              </div>
              <span className="font-bold text-xl text-slate-800">Anajak POD</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">คุณสมบัติ</Link>
              <Link href="#products" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">สินค้า</Link>
              <Link href="#testimonials" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">รีวิว</Link>
              <Link href="#pricing" className="text-slate-600 hover:text-ci-blue font-medium transition-colors">ราคา</Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/dashboard" 
                className="px-4 py-2 text-slate-600 font-medium hover:text-ci-blue transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/catalog" 
                className="px-5 py-2.5 bg-ci-blue text-white font-bold rounded-xl hover:bg-ci-blueDark transition-all shadow-lg shadow-blue-200"
              >
                เริ่มออกแบบฟรี
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link href="#features" className="block text-slate-600 font-medium">คุณสมบัติ</Link>
              <Link href="#products" className="block text-slate-600 font-medium">สินค้า</Link>
              <Link href="#testimonials" className="block text-slate-600 font-medium">รีวิว</Link>
              <Link href="#pricing" className="block text-slate-600 font-medium">ราคา</Link>
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Link href="/dashboard" className="block text-center py-2 text-slate-600 font-medium">เข้าสู่ระบบ</Link>
                <Link href="/catalog" className="block text-center py-3 bg-ci-blue text-white font-bold rounded-xl">เริ่มออกแบบฟรี</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-ci-blue font-medium text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                ออกแบบเสื้อของคุณเอง
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                สร้างเสื้อ
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ci-blue to-purple-600"> ดีไซน์เฉพาะ </span>
                ของคุณ
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                ออกแบบเสื้อผ้าสวยๆ ได้ง่ายๆ ไม่ต้องมีประสบการณ์ 
                พิมพ์คุณภาพสูง จัดส่งถึงบ้าน
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link 
                  href="/catalog" 
                  className="px-8 py-4 bg-ci-blue text-white font-bold rounded-2xl hover:bg-ci-blueDark transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 text-lg"
                >
                  เริ่มออกแบบเลย
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="#demo" 
                  className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-200 hover:border-ci-blue hover:text-ci-blue transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  ดูวิธีใช้งาน
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  ไม่ต้องสมัครสมาชิก
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  ออกแบบฟรี
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  สั่งผลิตขั้นต่ำ 1 ตัว
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* T-shirt mockup placeholder */}
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <Shirt className="w-32 h-32 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">ตัวอย่างเสื้อของคุณ</p>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-slate-800">ผลิตเร็ว</span>
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-slate-800">4.9/5 คะแนน</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-ci-blue mb-1">10,000+</p>
              <p className="text-slate-500 font-medium">ลูกค้าที่พอใจ</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-ci-blue mb-1">50,000+</p>
              <p className="text-slate-500 font-medium">เสื้อที่ผลิต</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-ci-blue mb-1">4.9</p>
              <p className="text-slate-500 font-medium">คะแนนเฉลี่ย</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-ci-blue mb-1">3-5 วัน</p>
              <p className="text-slate-500 font-medium">จัดส่ง</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              ทำไมต้องเลือกเรา?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              บริการครบวงจร ตั้งแต่ออกแบบจนถึงจัดส่งถึงมือลูกค้า
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i}
                  className="group p-6 bg-white rounded-2xl border border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              ขั้นตอนง่ายๆ แค่ 3 ขั้นตอน
            </h2>
            <p className="text-lg text-slate-600">
              ออกแบบและสั่งผลิตเสื้อของคุณได้ง่ายๆ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'เลือกสินค้า', desc: 'เลือกประเภทเสื้อ สี และไซส์ที่ต้องการ', icon: '👕' },
              { step: 2, title: 'ออกแบบ', desc: 'อัพโหลดรูปหรือใช้เครื่องมือออกแบบของเรา', icon: '🎨' },
              { step: 3, title: 'สั่งผลิต', desc: 'ยืนยันคำสั่งซื้อ รอรับสินค้าที่บ้าน', icon: '📦' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="w-10 h-10 bg-ci-blue text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/catalog" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-ci-blue text-white font-bold rounded-2xl hover:bg-ci-blueDark transition-all shadow-lg shadow-blue-200"
            >
              เริ่มออกแบบตอนนี้
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              ลูกค้าพูดถึงเรา
            </h2>
            <p className="text-lg text-slate-600">
              ความเห็นจากลูกค้าที่ใช้บริการจริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ci-blue to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            พร้อมสร้างเสื้อของคุณเองหรือยัง?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            เริ่มออกแบบได้เลยตอนนี้ ไม่ต้องสมัครสมาชิก ฟรี!
          </p>
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-ci-blue font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-2xl text-lg"
          >
            เริ่มออกแบบฟรี
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-ci-blue font-bold text-lg">
                  A
                </div>
                <span className="font-bold text-xl">Anajak POD</span>
              </div>
              <p className="text-slate-400 max-w-md">
                บริการพิมพ์เสื้อตามสั่ง คุณภาพสูง ราคาเป็นกันเอง 
                ออกแบบง่าย จัดส่งเร็ว
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4">ลิงก์ด่วน</h4>
              <div className="space-y-2 text-slate-400">
                <Link href="/catalog" className="block hover:text-white transition-colors">เลือกสินค้า</Link>
                <Link href="/templates" className="block hover:text-white transition-colors">เทมเพลตสำเร็จรูป</Link>
                <Link href="/dashboard" className="block hover:text-white transition-colors">เข้าสู่ระบบ</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">ติดต่อเรา</h4>
              <div className="space-y-2 text-slate-400">
                <p>📧 support@anajak.com</p>
                <p>📞 02-xxx-xxxx</p>
                <p>💬 Line: @anajak</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>© 2024 Anajak POD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
