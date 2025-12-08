import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <LandingHeader />

      <main>
        {/* Header */}
        <section className="pt-32 pb-20 bg-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              เกี่ยวกับเรา
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              จากโรงงานผลิตเสื้อยืดสู่แพลตฟอร์ม Print on Demand ชั้นนำของไทย
              เรามุ่งมั่นที่จะช่วยให้ทุกคนสร้างแบรนด์ของตัวเองได้ง่ายที่สุด
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl bg-slate-100">
                  <Image 
                     src="/shirt/front.png" // Placeholder for Factory Image
                     alt="Anajak Factory"
                     fill
                     className="object-contain p-8"
                  />
               </div>
               <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">เรื่องราวของเรา</h2>
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                     <p>
                        <strong>Anajak POD</strong> ก่อตั้งขึ้นจากรากฐานของโรงงานผลิตเสื้อยืด Anajak T-Shirt 
                        ที่มีประสบการณ์ในอุตสาหกรรมสิ่งทอกว่า 20 ปี เราเห็นปัญหาที่ผู้ประกอบการรายย่อยและคนทั่วไปต้องเจอ 
                        เมื่อต้องการทำเสื้อในจำนวนน้อย หรือต้องการสร้างแบรนด์ของตัวเอง
                     </p>
                     <p>
                        ปัญหาเรื่อง "ขั้นต่ำในการผลิต" "ต้องสต็อกสินค้า" และ "ขั้นตอนที่ยุ่งยาก" 
                        คือสิ่งที่เราตั้งใจเข้ามาแก้ไข ด้วยการนำเทคโนโลยีการพิมพ์ดิจิทัล (DTG & DTF) 
                        ระดับอุตสาหกรรม มาผสานกับแพลตฟอร์มออนไลน์ที่ใช้งานง่าย
                     </p>
                     <p>
                        วันนี้ เราภูมิใจที่ได้เป็นส่วนหนึ่งในการสร้างรายได้และสร้างอาชีพให้กับคนไทยนับหมื่นคน 
                        ผ่านโมเดลธุรกิจ Print on Demand ที่ยั่งยืนและเป็นธรรม
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-slate-900 text-white">
           <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 {[
                    { val: "20+", label: "ปีประสบการณ์" },
                    { val: "50,000+", label: "ออเดอร์จัดส่งแล้ว" },
                    { val: "10,000+", label: "พาร์ทเนอร์ผู้ขาย" },
                    { val: "100%", label: "ผลิตในไทย" },
                 ].map((stat, i) => (
                    <div key={i}>
                       <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.val}</div>
                       <div className="text-slate-400">{stat.label}</div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Contact Info */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">ติดต่อเรา</h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                 <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">ที่อยู่โรงงาน</h3>
                    <p className="text-slate-600">
                       123 ถนนตัวอย่าง แขวงตัวอย่าง<br />เขตตัวอย่าง กรุงเทพฯ 10XXX
                    </p>
                 </div>

                 <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Phone className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">เบอร์โทรศัพท์</h3>
                    <p className="text-slate-600 mb-2">02-123-4567 (Office)</p>
                    <p className="text-slate-600">08x-xxx-xxxx (Sales)</p>
                 </div>

                 <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">เวลาทำการ</h3>
                    <p className="text-slate-600 mb-2">จันทร์ - ศุกร์: 09:00 - 18:00</p>
                    <p className="text-slate-600">เสาร์: 09:00 - 12:00</p>
                 </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-16 h-[400px] bg-slate-200 rounded-3xl w-full flex items-center justify-center text-slate-400">
                 [Google Maps Area]
              </div>
           </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

