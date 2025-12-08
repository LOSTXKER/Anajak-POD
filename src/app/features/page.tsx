import React from 'react';
import Link from 'next/link';
import { Palette, LayoutDashboard, ShoppingBag, Truck, BarChart3, Wallet, Zap, Smartphone } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <LandingHeader />

      <main>
        {/* Header */}
        <section className="pt-32 pb-20 bg-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              เครื่องมือครบครัน<br />เพื่อธุรกิจ Print on Demand ของคุณ
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ไม่ว่าคุณจะเป็นนักออกแบบ, พ่อค้าแม่ค้าออนไลน์, หรือเจ้าของแบรนด์ 
              Anajak POD มีฟีเจอร์ที่ช่วยให้คุณทำงานง่ายขึ้น เร็วขึ้น และทำกำไรได้มากขึ้น
            </p>
          </div>
        </section>

        {/* Main Features */}
        <section className="pb-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-24">
               {/* Feature 1 */}
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 relative h-[400px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                     {/* Placeholder for Design Tool UI */}
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
                        <Palette className="w-24 h-24 opacity-20" />
                        <span className="absolute bottom-10 font-bold">Design Tool Screenshot</span>
                     </div>
                  </div>
                  <div className="order-1 md:order-2">
                     <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <Palette className="w-7 h-7" />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">Design Studio อิสระแห่งการออกแบบ</h2>
                     <p className="text-lg text-slate-600 mb-6">
                        เครื่องมือออกแบบออนไลน์ที่ใช้งานง่ายแต่ทรงพลัง ไม่ต้องลงโปรแกรม ไม่ต้องเก่งกราฟิก
                     </p>
                     <ul className="space-y-3">
                        {["อัปโหลดรูปภาพได้ไม่จำกัด", "ระบบ AI ช่วยแนะนำการจัดวาง", "Mockup เสมือนจริงเห็นภาพทันที", "รองรับไฟล์ความละเอียดสูง"].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-slate-700">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               {/* Feature 2 */}
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                     <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                        <ShoppingBag className="w-7 h-7" />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">Multi-Channel Integration เชื่อมต่อทุกช่องทางขาย</h2>
                     <p className="text-lg text-slate-600 mb-6">
                        จัดการออเดอร์จากทุกแพลตฟอร์มได้ในที่เดียว ไม่ต้องสลับหน้าจอไปมา
                     </p>
                     <ul className="space-y-3">
                        {["เชื่อมต่อ Shopee, Lazada, TikTok Shop", "Sync สินค้าและสต็อกอัตโนมัติ", "ดึงออเดอร์มาผลิตทันที", "อัปเดตสถานะจัดส่งกลับไปยังร้านค้า"].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-slate-700">
                              <div className="w-2 h-2 rounded-full bg-orange-500" />
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="relative h-[400px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                     {/* Placeholder for Integration UI */}
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
                        <ShoppingBag className="w-24 h-24 opacity-20" />
                        <span className="absolute bottom-10 font-bold">Marketplace Integration Screenshot</span>
                     </div>
                  </div>
               </div>

               {/* Feature 3 */}
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 relative h-[400px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                     {/* Placeholder for Fulfillment UI */}
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
                        <Truck className="w-24 h-24 opacity-20" />
                        <span className="absolute bottom-10 font-bold">Fulfillment Screenshot</span>
                     </div>
                  </div>
                  <div className="order-1 md:order-2">
                     <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                        <Truck className="w-7 h-7" />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">Automated Fulfillment ระบบจัดส่งอัตโนมัติ</h2>
                     <p className="text-lg text-slate-600 mb-6">
                        คุณมีหน้าที่ขาย เรามีหน้าที่ผลิตและส่ง ปล่อยให้เรื่อง Logistics เป็นหน้าที่ของเรา
                     </p>
                     <ul className="space-y-3">
                        {["ผลิตและแพ็คสินค้าด้วยความใส่ใจ", "จัดส่งในนามร้านค้าของคุณ (White Label)", "ระบบติดตามพัสดุ Real-time", "QC ตรวจสอบคุณภาพก่อนส่ง"].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-slate-700">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* More Features Grid */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
             <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">และอีกมากมาย...</h2>
             <div className="grid md:grid-cols-3 gap-8">
                {[
                   { icon: LayoutDashboard, title: "Smart Dashboard", desc: "ภาพรวมยอดขาย กำไร และสถานะออเดอร์ ดูง่าย เข้าใจทันที" },
                   { icon: Wallet, title: "Wallet System", desc: "ระบบกระเป๋าเงิน เติมเครดิตสะดวก ถอนกำไรได้รวดเร็ว" },
                   { icon: BarChart3, title: "Analytics & Reports", desc: "วิเคราะห์สินค้าขายดี แนวโน้มลูกค้า เพื่อวางแผนการตลาด" },
                   { icon: Zap, title: "Bulk Upload", desc: "สร้างสินค้าทีละหลายชิ้นได้ในคลิกเดียว ประหยัดเวลา" },
                   { icon: Smartphone, title: "Mobile Friendly", desc: "ใช้งานได้ทุกที่ทุกเวลา บนมือถือและแท็บเล็ต" },
                   { icon: ShoppingBag, title: "Mockup Generator", desc: "สร้างรูปสินค้าสวยๆ ไปโพสต์ขายได้เลย ไม่ต้องถ่ายเอง" },
                ].map((item, i) => (
                   <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                      <item.icon className="w-10 h-10 text-slate-700 mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-slate-900 text-white text-center">
           <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">พร้อมยกระดับธุรกิจของคุณหรือยัง?</h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                 สมัครวันนี้ เริ่มใช้งานฟีเจอร์ทั้งหมดได้ทันที ฟรี!
              </p>
              <Link href="/dashboard/register" className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1">
                 สมัครสมาชิกฟรี
              </Link>
           </div>
        </section>

      </main>

      <LandingFooter />
    </div>
  );
}

