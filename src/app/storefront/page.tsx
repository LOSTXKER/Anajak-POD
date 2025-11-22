'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Save, Settings, Package, Truck, Megaphone, FileText, ExternalLink, Palette, Image as ImageIcon, MousePointerClick } from 'lucide-react';

export default function StorefrontPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <DashboardLayout title="หน้าร้านของฉัน" subtitle="ตั้งค่าและปรับแต่งหน้าเว็บ E-commerce ของคุณ" showCreateButton={false}>
      <div className="max-w-6xl mx-auto pb-24 relative">
        
        {/* Tab Navigation */}
        <div className="bg-white/50 backdrop-blur-md border border-slate-100 rounded-2xl p-2 mb-8 relative z-20 shadow-sm">
          <nav className="flex space-x-1 overflow-x-auto no-scrollbar" aria-label="Tabs">
            {[
              { id: 'general', icon: Settings, label: 'ตั้งค่าทั่วไป' },
              { id: 'products', icon: Package, label: 'สินค้าหน้าร้าน' },
              { id: 'shipping', icon: Truck, label: 'การจัดส่ง' },
              { id: 'marketing', icon: Megaphone, label: 'การตลาด & SEO' },
              { id: 'pages', icon: FileText, label: 'หน้าเพจ' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-ci-blue shadow-md shadow-slate-200/50 ring-1 ring-black/5'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2.5 ${isActive ? 'text-ci-blue' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Store URL Card */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <MousePointerClick className="w-5 h-5 text-ci-blue" />
                      ที่อยู่หน้าร้าน (Store URL)
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">ลิงก์สำหรับลูกค้าเพื่อเข้าชมร้านค้าของคุณ</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                    ออนไลน์
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl border border-slate-200 shadow-inner">
                  <div className="flex-1 relative flex items-center">
                    <span className="pl-4 text-slate-400 font-medium text-sm">https://</span>
                    <input 
                      type="text" 
                      defaultValue="my-awesome-store" 
                      className="w-full pl-1 pr-32 py-3 text-sm font-bold text-slate-800 bg-transparent focus:outline-none"
                    />
                    <span className="absolute right-4 text-sm font-bold text-slate-400 pointer-events-none">
                      .anajak.pod
                    </span>
                  </div>
                  <a 
                    href="#" 
                    target="_blank" 
                    className="flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                  >
                    ไปที่ร้านค้า
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>

              {/* Store Appearance */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">ปรับแต่งรูปลักษณ์</h2>
                    <p className="text-sm text-slate-500">จัดการข้อมูลพื้นฐานและสีธีมของร้าน</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="store-logo" className="block text-sm font-bold text-slate-700 mb-2">
                          โลโก้ร้านค้า
                        </label>
                        <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-ci-blue/50 hover:bg-slate-50 transition-all flex flex-col items-center justify-center cursor-pointer group">
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-ci-blue group-hover:shadow-md transition-all mb-2">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-400 group-hover:text-ci-blue">อัปโหลดโลโก้</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="store-title" className="block text-sm font-bold text-slate-700 mb-2">
                          ชื่อร้านค้า
                        </label>
                        <input 
                          type="text" 
                          id="store-title" 
                          defaultValue="My Awesome Store" 
                          className="w-full px-4 py-3 text-sm font-medium bg-slate-50 border-2 border-transparent focus:bg-white focus:border-ci-blue/30 rounded-xl focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">สีธีม (Theme Color)</label>
                        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                          <input 
                            type="color" 
                            defaultValue="#3973b2" 
                            className="w-12 h-12 rounded-lg border-0 cursor-pointer p-1 bg-white shadow-sm"
                          />
                          <div className="flex-1">
                            <input 
                              type="text" 
                              defaultValue="#3973B2" 
                              className="w-full px-3 py-2 text-sm font-mono bg-transparent focus:outline-none font-bold text-slate-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="store-desc" className="block text-sm font-bold text-slate-700 mb-2">
                      คำอธิบายร้านค้า (Description)
                    </label>
                    <textarea 
                      id="store-desc" 
                      rows={3} 
                      className="w-full px-4 py-3 text-sm font-medium bg-slate-50 border-2 border-transparent focus:bg-white focus:border-ci-blue/30 rounded-xl focus:outline-none transition-all resize-none" 
                      placeholder="บอกเล่าเกี่ยวกับแบรนด์ของคุณ..."
                      defaultValue="เสื้อยืดลายเท่ๆ สำหรับคนคูลๆ ผลิตด้วยใจ ใส่ใจทุกรายละเอียด"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-1">สินค้าในหน้าร้าน</h2>
                  <p className="text-sm text-slate-500">
                    คุณมีสินค้า <span className="font-bold text-ci-blue bg-ci-blue/10 px-2 py-0.5 rounded-md">2</span> ชิ้น ที่แสดงอยู่
                  </p>
                </div>
                <button 
                  className="flex items-center justify-center px-6 py-3 text-sm font-bold text-white rounded-xl shadow-lg shadow-ci-blue/20 hover:shadow-ci-blue/40 hover:-translate-y-0.5 transition-all active:scale-95 bg-gradient-to-r from-ci-blue to-blue-600"
                >
                  <Package className="w-4 h-4 mr-2" />
                  เพิ่มสินค้าใหม่
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <Package className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">ยังไม่มีสินค้าในหน้าร้าน</h3>
                  <p className="text-slate-400 max-w-xs mx-auto mb-6">
                    เลือกสินค้าจากแคตตาล็อกหรือเทมเพลตที่คุณออกแบบไว้ เพื่อนำมาขายในหน้าร้าน
                  </p>
                  <button className="text-ci-blue font-bold hover:underline">
                    เลือกสินค้าจากแคตตาล็อก →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">ตั้งค่าการจัดส่ง</h2>
                  <p className="text-sm text-slate-500">กำหนดวิธีคิดค่าจัดส่งสำหรับลูกค้า</p>
                </div>
              </div>
              
              <div className="space-y-4 max-w-2xl">
                {[
                  { label: 'ค่าส่งอัตราเดียว (Flat Rate)', active: true, hasInput: true, desc: 'คิดค่าส่งเท่ากันทุกออเดอร์' },
                  { label: 'ส่งฟรี (Free Shipping)', active: false, hasInput: false, desc: 'ลูกค้าไม่ต้องเสียค่าจัดส่ง' },
                  { label: 'ส่งฟรีตามเงื่อนไข', active: false, hasInput: true, desc: 'เมื่อยอดสั่งซื้อถึงกำหนด' }
                ].map((option, idx) => (
                  <label 
                    key={idx}
                    className={`group block p-6 bg-white rounded-2xl border-2 cursor-pointer transition-all ${
                      option.active 
                        ? 'border-ci-blue bg-ci-blue/5 shadow-md shadow-ci-blue/5' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold ${option.active ? 'text-ci-blue' : 'text-slate-700'}`}>
                        {option.label}
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        option.active ? 'border-ci-blue bg-ci-blue' : 'border-slate-300 bg-white'
                      }`}>
                        {option.active && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 pl-0.5">{option.desc}</p>
                    
                    <input type="radio" name="shipping-option" className="hidden" checked={option.active} readOnly />
                    
                    {option.hasInput && option.active && (
                      <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="text-sm font-medium text-slate-600">ราคา:</span>
                        <div className="relative w-32">
                          <input 
                            type="number" 
                            defaultValue="40" 
                            className="w-full pl-8 pr-4 py-2 text-sm font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-ci-blue focus:ring-0 transition-all"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">฿</span>
                        </div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Marketing Tab */}
          {activeTab === 'marketing' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Tracking & Pixels</h2>
                  <p className="text-sm text-slate-500">เชื่อมต่อเครื่องมือวิเคราะห์และการตลาด</p>
                </div>
              </div>

              <div className="space-y-6 max-w-3xl">
                {[
                  { label: 'Facebook Pixel ID', placeholder: '1234567890123456', icon: 'bg-[#1877F2]' },
                  { label: 'Google Analytics ID (GA4)', placeholder: 'G-XXXXXXXXXX', icon: 'bg-gradient-to-r from-[#4285F4] to-[#34A853]' },
                  { label: 'TikTok Pixel ID', placeholder: 'CXXXXXXXXXXXXX', icon: 'bg-black' }
                ].map((item, idx) => (
                  <div key={idx} className="group">
                    <label htmlFor={`pixel-${idx}`} className="flex items-center text-sm font-bold text-slate-700 mb-2">
                      <span className={`w-2 h-2 rounded-full mr-2 ${item.icon}`}></span>
                      {item.label}
                    </label>
                    <div className="relative">
                       <input 
                        type="text" 
                        id={`pixel-${idx}`}
                        placeholder={item.placeholder}
                        className="w-full px-5 py-3 text-sm font-mono bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-200 rounded-xl focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Save Button */}
        <div className="fixed bottom-8 right-8 z-50 animate-in zoom-in duration-300">
          <button 
            className="flex items-center px-8 py-4 text-base font-bold text-white rounded-2xl shadow-2xl shadow-ci-blue/30 hover:shadow-ci-blue/50 hover:-translate-y-1 transition-all active:scale-95 bg-gradient-to-r from-ci-blue to-blue-600"
          >
            <Save className="w-5 h-5 mr-2.5" />
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
