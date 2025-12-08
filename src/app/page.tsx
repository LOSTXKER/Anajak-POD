'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShoppingBag, Palette, Truck, Zap, Star, ShieldCheck, PlayCircle } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

export default function LandingPage() {
  const [activeMode, setActiveMode] = useState<'seller' | 'personal'>('personal');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-ci-blue/20 selection:text-ci-blue">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-100/40 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-ci-blue text-sm font-semibold mb-6 animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                ผลิตโดยโรงงาน Anajak T-Shirt ประสบการณ์กว่า 20 ปี
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight animate-fade-in-up [animation-delay:100ms]">
                สร้างเสื้อและสินค้า<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ci-blue to-blue-600">ในแบบของคุณเอง</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                Print on Demand คุณภาพโรงงาน พิมพ์ตามสั่ง ไม่มีขั้นต่ำ
                <br className="hidden md:block" /> 
                ออกแบบง่าย ผลิตไว ส่งตรงถึงมือคุณ
              </p>

              {/* Mode Toggle Pills */}
              <div className="flex justify-center mb-10 animate-fade-in-up [animation-delay:300ms]">
                <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-100 inline-flex">
                  <button
                    onClick={() => setActiveMode('personal')}
                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeMode === 'personal' 
                        ? 'bg-ci-blue text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    👕 ซื้อใส่เอง
                  </button>
                  <button
                    onClick={() => setActiveMode('seller')}
                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeMode === 'seller' 
                        ? 'bg-ci-blue text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    🛒 ทำขาย / สร้างแบรนด์
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:400ms]">
                <Link 
                  href="/designer" 
                  className="w-full sm:w-auto px-8 py-4 bg-ci-blue text-white rounded-xl font-bold text-lg shadow-xl shadow-ci-blue/20 hover:bg-ci-blueDark hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <Palette className="w-5 h-5" />
                  เริ่มออกแบบเลย - ฟรี
                </Link>
                <Link 
                  href="/catalog" 
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-ci-blue hover:text-ci-blue hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  ดูสินค้าทั้งหมด
                </Link>
              </div>
            </div>

            {/* Hero Image / Mockup */}
            <div className="relative max-w-5xl mx-auto mt-16 animate-fade-in-up [animation-delay:500ms]">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-100 aspect-[16/9] group">
                {/* Simulated Interface or Showcase */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center">
                   <div className="text-center">
                      <div className="relative w-64 h-64 mx-auto mb-6 transform group-hover:scale-105 transition-transform duration-500">
                        <Image 
                           src="/shirt/front.png" 
                           alt="T-Shirt Mockup" 
                           fill
                           className="object-contain drop-shadow-2xl"
                        />
                         {/* Design Overlay */}
                        <div className="absolute top-[25%] left-[30%] w-[40%] h-[40%] bg-blue-500/10 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center">
                          <span className="text-blue-500 text-xs font-bold bg-white/80 px-2 py-1 rounded">พื้นที่ออกแบบ</span>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg inline-flex items-center gap-3">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                               <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                            ))}
                         </div>
                         <span className="text-sm font-medium text-slate-600">ออกแบบแล้ว 50,000+ ชิ้น</span>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -left-4 md:-left-12 top-1/4 bg-white p-4 rounded-2xl shadow-xl animate-float-slow">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                       <Truck className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 font-bold uppercase">จัดส่งรวดเร็ว</p>
                       <p className="font-bold text-slate-800">2-3 วันถึงมือ</p>
                    </div>
                 </div>
              </div>

              <div className="absolute -right-4 md:-right-12 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl animate-float-slow [animation-delay:2s]">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                       <Zap className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 font-bold uppercase">ผลิตไว</p>
                       <p className="font-bold text-slate-800">เสร็จใน 5 นาที</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Strip */}
        <div className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                   { icon: Zap, label: "ออกแบบง่าย", desc: "ใน 5 นาที" },
                   { icon: ShieldCheck, label: "ไม่ต้องคุยกับใคร", desc: "ระบบอัตโนมัติ" },
                   { icon: Truck, label: "ส่งไว", desc: "2-3 วันได้รับ" },
                   { icon: Star, label: "โรงงานผลิตเอง", desc: "ไม่ผ่านตัวแทน" },
                ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-ci-yellow mb-1">
                         <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg">{item.label}</h3>
                         <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Dynamic Content Section based on Mode */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-ci-blue font-bold tracking-wider uppercase text-sm mb-2 block">
                {activeMode === 'personal' ? 'FOR YOU' : 'FOR BUSINESS'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {activeMode === 'personal' 
                  ? 'สร้างสรรค์ไอเดียของคุณให้เป็นจริง' 
                  : 'เริ่มต้นธุรกิจเสื้อผ้าของคุณได้ทันที'}
              </h2>
              <p className="text-lg text-slate-600">
                {activeMode === 'personal'
                  ? 'ไม่ว่าจะเป็นเสื้อทีม ของขวัญ หรือใส่เอง สั่งทำได้ง่ายๆ ไม่มีขั้นต่ำ'
                  : 'ไม่ต้องสต็อกของ ไม่ต้องแพ็คของ เราจัดการให้หมด คุณแค่ "ออกแบบและขาย"'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {(activeMode === 'personal' ? [
                {
                  title: "1. เลือกสินค้า",
                  desc: "เลือกจากสินค้าคุณภาพกว่า 50+ รายการ ทั้งเสื้อยืด ฮู้ด กระเป๋า และอื่นๆ",
                  image: "/shirt/front.png" // Placeholder
                },
                {
                  title: "2. ออกแบบ",
                  desc: "ใช้เครื่องมือออกแบบออนไลน์ของเรา อัพโหลดรูป ใส่ข้อความ ได้ดั่งใจ",
                  image: "/shirt/front.png" // Placeholder
                },
                {
                  title: "3. รอรับของ",
                  desc: "สั่งซื้อและชำระเงิน นั่งรอรับของที่บ้านใน 2-3 วัน",
                  image: "/shirt/front.png" // Placeholder
                }
              ] : [
                {
                  title: "1. สร้างร้านค้า",
                  desc: "สมัครสมาชิกและตั้งค่าร้านค้าของคุณ เชื่อมต่อกับ Shopee/Lazada ได้ง่ายๆ",
                  image: "/shirt/front.png" // Placeholder
                },
                {
                  title: "2. ออกแบบและตั้งราคา",
                  desc: "ออกแบบสินค้าและกำหนดกำไรที่คุณต้องการ เราแสดงต้นทุนให้เห็นชัดเจน",
                  image: "/shirt/front.png" // Placeholder
                },
                {
                  title: "3. รับกำไร",
                  desc: "เมื่อมีออเดอร์ เราผลิตและจัดส่งให้ในนามคุณ คุณรับส่วนต่างกำไรทันที",
                  image: "/shirt/front.png" // Placeholder
                }
              ]).map((step, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all group">
                  <div className="h-48 bg-white rounded-xl mb-6 relative overflow-hidden flex items-center justify-center p-4 border border-slate-100">
                     <div className="absolute top-2 right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                     </div>
                     <Image
                        src={step.image}
                        alt={step.title}
                        width={200}
                        height={200}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                     />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link 
                href="/designer" 
                className="inline-flex items-center gap-2 text-ci-blue font-bold text-lg hover:underline decoration-2 underline-offset-4"
              >
                ลองออกแบบดูตอนนี้ <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-slate-50">
           <div className="container mx-auto px-4 md:px-6">
              <div className="flex justify-between items-end mb-12">
                 <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">สินค้ายอดนิยม</h2>
                    <p className="text-slate-600">คุณภาพระดับพรีเมียม การันตีด้วยยอดขายอันดับ 1</p>
                 </div>
                 <Link href="/catalog" className="hidden md:flex items-center text-slate-600 hover:text-ci-blue font-bold transition-colors">
                    ดูทั้งหมด <ArrowRight className="w-4 h-4 ml-1" />
                 </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                    { name: "Premium Cotton T-Shirt", price: "฿150", image: "/shirt/front.png", colors: 12 },
                    { name: "Oversized Street Tee", price: "฿220", image: "/shirt/front.png", colors: 8 },
                    { name: "Classic Hoodie", price: "฿450", image: "/shirt/front.png", colors: 6 },
                    { name: "Canvas Tote Bag", price: "฿120", image: "/shirt/front.png", colors: 4 },
                 ].map((product, i) => (
                    <Link href="/catalog/1" key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
                       <div className="aspect-square relative bg-slate-100 p-6 flex items-center justify-center">
                          <Image
                             src={product.image}
                             alt={product.name}
                             fill
                             className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />
                          <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-700 hover:bg-ci-blue hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                             <Palette className="w-5 h-5" />
                          </button>
                       </div>
                       <div className="p-4">
                          <h3 className="font-bold text-slate-900 mb-1 truncate">{product.name}</h3>
                          <div className="flex justify-between items-center">
                             <span className="text-ci-blue font-bold">{product.price}</span>
                             <span className="text-xs text-slate-500">{product.colors} สี</span>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
              
              <div className="mt-8 text-center md:hidden">
                 <Link href="/catalog" className="btn-secondary w-full justify-center">
                    ดูสินค้าทั้งหมด
                 </Link>
              </div>
           </div>
        </section>

        {/* Trust & Quality Section */}
        <section className="py-24 bg-white overflow-hidden">
           <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                 <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-yellow-100 rounded-3xl blur-2xl opacity-50" />
                    <div className="relative bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-ci-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                       
                       <h3 className="text-2xl font-bold mb-6">ทำไมต้อง Anajak POD?</h3>
                       <ul className="space-y-4">
                          {[
                             "โรงงานผลิตเอง ไม่ผ่านคนกลาง ราคาดีที่สุด",
                             "ใช้เครื่องจักร Epson F3070 Industrial Grade",
                             "เทคนิค DTG และ DTF ความละเอียดสูง",
                             "หมึกแท้ Eco-Friendly ปลอดภัย ไม่ลอก",
                             "QC ตรวจสอบคุณภาพทุกชิ้นก่อนส่ง"
                          ].map((item, i) => (
                             <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                                <span className="text-slate-200">{item}</span>
                             </li>
                          ))}
                       </ul>

                       <div className="mt-8 pt-8 border-t border-white/10 flex gap-8">
                          <div>
                             <p className="text-3xl font-bold text-ci-yellow">20+</p>
                             <p className="text-sm text-slate-400">ปีประสบการณ์</p>
                          </div>
                          <div>
                             <p className="text-3xl font-bold text-ci-yellow">50k+</p>
                             <p className="text-sm text-slate-400">ออเดอร์จัดส่ง</p>
                          </div>
                          <div>
                             <p className="text-3xl font-bold text-ci-yellow">4.9</p>
                             <p className="text-sm text-slate-400">คะแนนรีวิว</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                       มาตรฐานโรงงาน <br />
                       <span className="text-ci-blue">ในราคาที่คุณเข้าถึงได้</span>
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                       เราไม่ใช่แค่แพลตฟอร์ม แต่เราคือโรงงานผู้ผลิตตัวจริงที่มีประสบการณ์กว่า 20 ปี 
                       เราเข้าใจเรื่องผ้า เรื่องสี และเรื่องการสกรีนดีที่สุด 
                       เพื่อให้คุณมั่นใจได้ว่าสินค้าทุกชิ้นที่ส่งถึงมือคุณ หรือลูกค้าของคุณ 
                       คือสินค้าที่มีคุณภาพดีที่สุด
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <Link href="/about" className="p-4 rounded-xl border border-slate-200 hover:border-ci-blue hover:bg-blue-50 transition-all group">
                          <PlayCircle className="w-8 h-8 text-ci-blue mb-3 group-hover:scale-110 transition-transform" />
                          <h4 className="font-bold text-slate-900">ดูวิดีโอโรงงาน</h4>
                          <p className="text-sm text-slate-500">เยี่ยมชมกระบวนการผลิต</p>
                       </Link>
                       <Link href="/corporate" className="p-4 rounded-xl border border-slate-200 hover:border-ci-blue hover:bg-blue-50 transition-all group">
                          <ShoppingBag className="w-8 h-8 text-ci-blue mb-3 group-hover:scale-110 transition-transform" />
                          <h4 className="font-bold text-slate-900">สั่งจำนวนมาก?</h4>
                          <p className="text-sm text-slate-500">ขอใบเสนอราคาพิเศษ</p>
                       </Link>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-ci-blue to-blue-700 text-white relative overflow-hidden">
           <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
           </div>

           <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                 เปลี่ยนไอเดียของคุณให้เป็นสินค้าจริงได้ใน 5 นาที
                 <br />ไม่มีค่าใช้จ่ายแอบแฝง ไม่ต้องสมัครก็ลองออกแบบได้
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link 
                    href="/designer" 
                    className="w-full sm:w-auto px-10 py-5 bg-white text-ci-blue rounded-xl font-bold text-xl shadow-xl hover:bg-blue-50 hover:-translate-y-1 transition-all"
                 >
                    เริ่มออกแบบเลย - ฟรี
                 </Link>
                 <Link 
                    href="/contact" 
                    className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-xl hover:bg-white/10 transition-all"
                 >
                    ติดต่อทีมงาน
                 </Link>
              </div>
              
              <p className="mt-8 text-sm text-blue-200/80">
                 *ไม่ต้องใช้บัตรเครดิต • ออกแบบฟรี 100% • ไม่มีขั้นต่ำ
              </p>
           </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
