import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Building2, Users, FileText, Settings, Truck, MessageCircle } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold mb-6 border border-blue-500/30">
                สำหรับองค์กรและธุรกิจ
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                โซลูชันเสื้อองค์กรครบวงจร<br />
                <span className="text-blue-400">ผลิตจำนวนมาก คุณภาพสูง</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                รับผลิตเสื้อยูนิฟอร์ม เสื้อทีม เสื้ออีเวนต์ พร้อมบริการสกรีนครบวงจร 
                ด้วยมาตรฐานโรงงาน Anajak T-Shirt ประสบการณ์กว่า 20 ปี
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#contact-form" 
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  ขอใบเสนอราคา
                </Link>
                <Link 
                  href="https://line.me/ti/p/@anajak" 
                  target="_blank"
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  ติดต่อผ่าน LINE
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* B2B Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">ทำไมองค์กรชั้นนำถึงเลือกเรา</h2>
              <p className="text-slate-600">
                เราเข้าใจความต้องการของลูกค้าองค์กรที่ต้องการความถูกต้อง แม่นยำ และคุณภาพที่เชื่อถือได้
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Settings,
                  title: "One-Stop Service",
                  desc: "ดูแลครบวงจร ตั้งแต่การออกแบบ ผลิต สกรีน จนถึงจัดส่ง พร้อมทีมงานมืออาชีพให้คำปรึกษา"
                },
                {
                  icon: FileText,
                  title: "เอกสารครบถ้วน",
                  desc: "ออกใบเสนอราคา ใบกำกับภาษีเต็มรูปแบบ และเอกสารทางบัญชีที่ถูกต้องสำหรับนิติบุคคล"
                },
                {
                  icon: Truck,
                  title: "ส่งตรงเวลา",
                  desc: "รับประกันการจัดส่งตรงเวลา ด้วยกำลังการผลิตระดับอุตสาหกรรม รองรับงานด่วน"
                },
                {
                  icon: Users,
                  title: "Account Manager",
                  desc: "มีผู้ดูแลบัญชีส่วนตัว ช่วยประสานงานและติดตามสถานะออเดอร์ให้คุณตลอดการทำงาน"
                },
                {
                  icon: CheckCircle2,
                  title: "QC ทุกชิ้น 100%",
                  desc: "ตรวจสอบคุณภาพสินค้าทุกชิ้นก่อนจัดส่ง มั่นใจได้ว่าได้รับของดีไม่มีตำหนิ"
                },
                {
                  icon: Building2,
                  title: "โรงงานผลิตเอง",
                  desc: "ไม่ผ่านคนกลาง ควบคุมคุณภาพได้เองทุกขั้นตอน และได้ราคาหน้าโรงงาน"
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tier for Bulk */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 lg:p-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">ตารางส่วนลดตามจำนวน</h2>
                  <p className="text-slate-600 mb-8">
                    ยิ่งสั่งเยอะ ยิ่งลดเยอะ! เรามอบส่วนลดพิเศษสำหรับออเดอร์จำนวนมาก 
                    พร้อมบริการขึ้นตัวอย่างฟรีเมื่อสั่งผลิต 100 ตัวขึ้นไป
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { range: "20-49 ชิ้น", discount: "ส่วนลด 10%", price: "฿XXX / ตัว" },
                      { range: "50-99 ชิ้น", discount: "ส่วนลด 15%", price: "฿XXX / ตัว" },
                      { range: "100-299 ชิ้น", discount: "ส่วนลด 20%", price: "฿XXX / ตัว" },
                      { range: "300+ ชิ้น", discount: "ส่วนลด 25% + พิเศษ", price: "ติดต่อเรา" },
                    ].map((tier, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-bold text-slate-700">{tier.range}</span>
                        <div className="flex items-center gap-6">
                          <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg">{tier.discount}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-sm text-slate-500">
                    *ราคาอาจเปลี่ยนแปลงตามรูปแบบการสกรีนและเนื้อผ้า กรุณาขอใบเสนอราคาเพื่อความถูกต้อง
                  </p>
                </div>
                <div className="bg-slate-900 p-10 lg:p-16 text-white flex flex-col justify-center">
                   <h3 className="text-2xl font-bold mb-6">ขั้นตอนการสั่งผลิต</h3>
                   <ul className="space-y-6">
                      {[
                        { step: "1", text: "แจ้งรายละเอียดสินค้าและจำนวน" },
                        { step: "2", text: "รับใบเสนอราคาภายใน 24 ชม." },
                        { step: "3", text: "อนุมัติใบเสนอราคาและมัดจำ" },
                        { step: "4", text: "ผลิตสินค้า (3-7 วันทำการ)" },
                        { step: "5", text: "QC และจัดส่งถึงมือคุณ" }
                      ].map((s, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                            {s.step}
                          </span>
                          <span className="text-slate-300 pt-1">{s.text}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Gallery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">ตัวอย่างผลงานองค์กร</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {/* Placeholder Images - In real app, use actual portfolio images */}
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-square bg-slate-100 rounded-xl relative overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      <Image 
                        src="/shirt/front.png" 
                        alt="Corporate Work" 
                        width={300} 
                        height={300}
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-white font-bold border border-white px-4 py-2 rounded-lg">ดูรายละเอียด</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="contact-form" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">ขอใบเสนอราคา</h2>
              <p className="text-slate-500 text-center mb-8">กรอกข้อมูลเพื่อให้เจ้าหน้าที่ติดต่อกลับพร้อมราคาประเมิน</p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อผู้ติดต่อ</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="คุณสมชาย" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อบริษัท/องค์กร</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="บริษัท เอบีซี จำกัด" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">เบอร์โทรศัพท์</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="08x-xxx-xxxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">อีเมล</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="name@company.com" />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">ประเภทสินค้าที่สนใจ</label>
                   <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                      <option>เสื้อยืด (T-Shirt)</option>
                      <option>เสื้อโปโล (Polo)</option>
                      <option>เสื้อฮู้ด/แจ็คเก็ต (Hoodie/Jacket)</option>
                      <option>ถุงผ้า (Tote Bag)</option>
                      <option>อื่นๆ</option>
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">จำนวนโดยประมาณ</label>
                   <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                      <option>20-49 ชิ้น</option>
                      <option>50-99 ชิ้น</option>
                      <option>100-299 ชิ้น</option>
                      <option>300-999 ชิ้น</option>
                      <option>1,000+ ชิ้น</option>
                   </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">รายละเอียดเพิ่มเติม</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="เช่น สีเสื้อที่ต้องการ, ตำแหน่งสกรีน, วันที่ต้องการใช้งาน"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                  ส่งคำขอใบเสนอราคา
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

