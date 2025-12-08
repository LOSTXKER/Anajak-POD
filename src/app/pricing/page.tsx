import React from 'react';
import Link from 'next/link';
import { Check, HelpCircle } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <LandingHeader />

      <main>
        {/* Header */}
        <section className="pt-32 pb-16 bg-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              แพคเกจและราคา
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              เริ่มต้นใช้งานฟรี ไม่มีค่าธรรมเนียมแอบแฝง จ่ายเมื่อคุณขายได้เท่านั้น
              หรืออัปเกรดเพื่อรับสิทธิประโยชน์ที่มากกว่าสำหรับผู้ขายมืออาชีพ
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all relative">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                <p className="text-slate-500 mb-6">สำหรับผู้เริ่มต้นขายสินค้า</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-slate-900">ฟรี</span>
                  <span className="text-slate-500"> / ตลอดชีพ</span>
                </div>
                
                <Link href="/dashboard" className="block w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-center rounded-xl transition-colors mb-8">
                  เริ่มต้นใช้งานฟรี
                </Link>

                <ul className="space-y-4">
                  {[
                    "ไม่จำกัดจำนวนสินค้า",
                    "เครื่องมือออกแบบพื้นฐาน",
                    "เชื่อมต่อ Shopee/Lazada (1 ร้าน)",
                    "Dashboard ดูยอดขาย",
                    "ซัพพอร์ตทางอีเมล"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Plan */}
              <div className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-xl relative scale-105 z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                   ขายดีที่สุด
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro Seller</h3>
                <p className="text-slate-500 mb-6">สำหรับผู้ขายที่มียอดขายสม่ำเสมอ</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-blue-600">฿499</span>
                  <span className="text-slate-500"> / เดือน</span>
                </div>
                
                <Link href="/dashboard/upgrade" className="block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-center rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all mb-8">
                  ทดลองใช้ฟรี 14 วัน
                </Link>

                <ul className="space-y-4">
                  {[
                    "ทุกอย่างใน Starter",
                    "ส่วนลดต้นทุนสินค้า 5%",
                    "เชื่อมต่อ Shopee/Lazada ไม่จำกัด",
                    "เครื่องมือออกแบบขั้นสูง (AI)",
                    "Priority Support (ตอบกลับด่วน)",
                    "Report วิเคราะห์เชิงลึก"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business Plan */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all relative">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Business</h3>
                <p className="text-slate-500 mb-6">สำหรับแบรนด์และองค์กรใหญ่</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-slate-900">ติดต่อเรา</span>
                  <span className="text-slate-500"> / ปรับตามความต้องการ</span>
                </div>
                
                <Link href="/contact" className="block w-full py-3 px-6 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-center rounded-xl transition-colors mb-8">
                  ติดต่อฝ่ายขาย
                </Link>

                <ul className="space-y-4">
                  {[
                    "ทุกอย่างใน Pro",
                    "ส่วนลดต้นทุนพิเศษ (Tier-based)",
                    "Account Manager ส่วนตัว",
                    "API Access",
                    "Custom Branding / Packaging",
                    "บริการ Fulfillment ครบวงจร"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Calculator Section */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 text-center max-w-4xl">
             <h2 className="text-3xl font-bold text-slate-900 mb-6">คำนวณกำไรของคุณ</h2>
             <p className="text-slate-600 mb-10">
                ดูว่าคุณจะทำกำไรได้เท่าไหร่เมื่อขายสินค้ากับ Anajak POD
             </p>

             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 grid md:grid-cols-3 gap-8 items-center">
                <div className="text-left">
                   <label className="block text-sm font-bold text-slate-700 mb-2">เลือกสินค้า</label>
                   <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium">
                      <option value="150">เสื้อยืด Cotton 100% (ทุน ฿150)</option>
                      <option value="250">เสื้อ Oversize (ทุน ฿250)</option>
                      <option value="450">เสื้อ Hoodie (ทุน ฿450)</option>
                   </select>
                </div>
                <div className="text-left">
                   <label className="block text-sm font-bold text-slate-700 mb-2">ราคาที่คุณขาย (บาท)</label>
                   <input type="number" defaultValue="390" className="w-full p-3 rounded-xl border border-slate-200 bg-white font-bold text-lg text-slate-900" />
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                   <p className="text-sm text-green-800 font-bold uppercase mb-1">กำไรต่อชิ้น</p>
                   <p className="text-3xl font-bold text-green-600">฿240</p>
                </div>
             </div>
             <p className="mt-4 text-sm text-slate-400 text-center">
                *การคำนวณเป็นเพียงการประมาณการ ต้นทุนจริงอาจขึ้นอยู่กับจำนวน สี และตำแหน่งการพิมพ์
             </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
           <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">คำถามที่พบบ่อยเกี่ยวกับราคา</h2>
              <div className="space-y-6">
                 {[
                    { q: "มีค่าใช้จ่ายเริ่มต้นไหม?", a: "ไม่มีค่าใช้จ่ายเริ่มต้น คุณสามารถสมัครสมาชิก ออกแบบ และเริ่มขายได้ฟรีทันที" },
                    { q: "ระบบคิดเงินเมื่อไหร่?", a: "เราจะคิดค่าสินค้าและค่าจัดส่งเมื่อคุณมีออเดอร์เข้ามาเท่านั้น หรือเมื่อคุณกดสั่งซื้อสินค้าด้วยตัวเอง" },
                    { q: "ส่วนลด 5% ของแพคเกจ Pro ใช้กับสินค้าอะไรบ้าง?", a: "ใช้ได้กับสินค้าทุกรายการในแคตตาล็อกของเรา ไม่มีขั้นต่ำในการสั่งซื้อ" },
                    { q: "เปลี่ยนแพคเกจได้ไหม?", a: "คุณสามารถอัปเกรดหรือยกเลิกแพคเกจ Pro ได้ตลอดเวลา โดยจะมีผลในรอบบิลถัดไป" }
                 ].map((item, i) => (
                    <div key={i} className="border-b border-slate-100 pb-6">
                       <h4 className="flex items-start gap-3 text-lg font-bold text-slate-900 mb-2">
                          <HelpCircle className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                          {item.q}
                       </h4>
                       <p className="text-slate-600 pl-9">{item.a}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

