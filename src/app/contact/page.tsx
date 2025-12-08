import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <LandingHeader />

      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">ติดต่อเรา</h1>
                <p className="text-xl text-slate-600">
                  มีคำถาม? ต้องการความช่วยเหลือ? ทีมงานของเราพร้อมดูแลคุณเสมอ
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                {/* Contact Info */}
                <div className="bg-slate-900 text-white p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-8">ข้อมูลการติดต่อ</h3>
                    
                    <div className="space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1">LINE Official</p>
                          <p className="text-slate-300">@anajakpod</p>
                          <p className="text-sm text-slate-500 mt-1">ตอบกลับเร็วสุด</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1">โทรศัพท์</p>
                          <p className="text-slate-300">02-123-4567</p>
                          <p className="text-sm text-slate-500 mt-1">จันทร์-ศุกร์ 9:00-18:00</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1">อีเมล</p>
                          <p className="text-slate-300">support@anajakpod.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1">สำนักงาน</p>
                          <p className="text-slate-300">
                            123 ถนนตัวอย่าง แขวงตัวอย่าง<br />เขตตัวอย่าง กรุงเทพฯ 10XXX
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-800">
                     <p className="text-sm text-slate-500">
                        Anajak POD ภายใต้การดำเนินงานของ บริษัท อานาจักร ทีเชิ้ต จำกัด
                     </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="p-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">ส่งข้อความถึงเรา</h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อของคุณ</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">อีเมล</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">หัวข้อเรื่อง</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                        <option>สอบถามทั่วไป</option>
                        <option>ติดตามออเดอร์</option>
                        <option>แจ้งปัญหาการใช้งาน</option>
                        <option>ขอใบเสนอราคา (B2B)</option>
                        <option>อื่นๆ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">ข้อความ</label>
                      <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                      ส่งข้อความ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

