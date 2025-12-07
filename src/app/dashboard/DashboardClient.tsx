'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { TrendingUp, Clock, AlertCircle, Activity, Palette, ArrowRight, ChevronRight, Sparkles, Heart, Store, ShoppingCart } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalSales: number;
    totalOrders: number;
    pendingOrders: number;
    processingOrders: number;
    recentOrders: number; // Orders this week
  };
  topProducts: Array<{
    title: string;
    sales: number; // Mocked for now as we don't track sales count per product in DB yet
  }>;
}

export default function DashboardClient({ stats, topProducts }: DashboardProps) {
  return (
    <DashboardLayout 
      title="สวัสดีตอนบ่าย, คุณลูกค้า ☀️" 
      subtitle="วันนี้อยากสร้างสรรค์หรือสร้างรายได้ดี?"
    >
      <div className="max-w-[1600px] mx-auto space-y-8 pb-10">
        {/* Main Banner */}
        <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-12 text-white shadow-2xl shadow-ci-blue/20 group">
          <div 
            className="absolute inset-0 transition-transform duration-[10s] scale-105 bg-[url('https://images.unsplash.com/photo-1556909114-a64265487840?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-ci-blue/40 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-ci-yellow text-xs font-bold mb-6 border border-white/10 backdrop-blur-md shadow-sm">
                ✨ เปลี่ยนไอเดียให้เป็นรายได้
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                พื้นที่สำหรับ<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  นักออกแบบและผู้ขาย
                </span>
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg leading-relaxed font-light">
                ไม่ว่าจะทำใส่เองชิ้นเดียว หรือสร้างแบรนด์ขายจริงจัง เราพร้อมซัพพอร์ตทุกความฝันของคุณด้วยระบบการผลิตที่ทันสมัย
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3.5 bg-ci-yellow text-slate-900 rounded-xl text-sm font-bold hover:bg-yellow-400 hover:scale-105 transition-all flex items-center shadow-lg shadow-ci-yellow/20">
                  <Palette className="w-4 h-4 mr-2" />
                  ออกแบบใส่เอง
                </button>
                <button className="px-8 py-3.5 bg-transparent text-white rounded-xl text-sm font-bold hover:bg-white/10 hover:scale-105 transition-all flex items-center border-2 border-white/20 hover:border-white/40">
                  <Store className="w-4 h-4 mr-2" />
                  ฉันต้องการทำขาย
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +12.5% <span className="text-emerald-400 ml-1">↗</span>
              </span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">ยอดขายรวม</p>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">฿{stats.totalSales.toLocaleString()}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-ci-blue/10 rounded-2xl text-ci-blue group-hover:bg-ci-blue group-hover:text-white transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">ออเดอร์ทั้งหมด</p>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{stats.totalOrders}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stats.recentOrders} ออเดอร์ในสัปดาห์นี้</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex -space-x-2">
                 <div className="w-6 h-6 rounded-full bg-ci-yellow/20 border-2 border-white"></div>
                 <div className="w-6 h-6 rounded-full bg-ci-blue/20 border-2 border-white"></div>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">รอคุณดำเนินการ</p>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{stats.pendingOrders + stats.processingOrders}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">รอชำระ {stats.pendingOrders} • ผลิต {stats.processingOrders}</p>
            </div>
          </div>

          <div className="bg-ci-red/5 p-6 rounded-[1.5rem] border border-ci-red/10 flex flex-col justify-between hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white rounded-2xl text-ci-red shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="w-2 h-2 bg-ci-red rounded-full animate-ping"></span>
            </div>
            <div>
              <p className="text-ci-red/80 text-sm font-bold mb-1">ต้องแก้ไขด่วน!</p>
              <h3 className="text-3xl font-bold text-ci-red tracking-tight mb-1">0</h3>
              <div className="text-xs font-bold text-ci-red flex items-center group-hover:translate-x-1 transition-transform">
                ดูรายการที่พบปัญหา <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Factory Status & News */}
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-ci-blue/10 rounded-xl text-ci-blue">
                 <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  สถานะโรงพิมพ์ & ข่าวสาร
                </h3>
                <p className="text-sm text-slate-500">อัปเดตล่าสุด: 1 นาทีที่แล้ว</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-xl border border-emerald-100 flex items-center">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 shadow-[0_0_8px_#34d399] animate-pulse" />
              ระบบทั้งหมดทำงานปกติ
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8">
            <div className="lg:col-span-2 space-y-5">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Real-time Production Status</h4>
              
              {[
                { title: 'คิวพิมพ์ DTG (Epson F3070)', subtitle: 'พิมพ์เสื้อสีเข้ม', progress: 45, status: 'รอผลิต 1-2 วัน', color: 'bg-ci-blue' },
                { title: 'คิวพิมพ์ DTF (Gongzheng)', subtitle: 'งานเฟล็กซ์, โลโก้, ป้ายคอ', progress: 20, status: 'คิวว่าง (1 วัน)', color: 'bg-emerald-500', isGood: true },
                { title: 'สต็อก: Gildan Premium (ดำ) - S, M, L, XL', subtitle: 'สินค้าขายดี', progress: 90, status: 'พร้อมส่ง', color: 'bg-emerald-500', isGood: true }
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <h4 className="font-bold text-slate-700 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.isGood ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${item.color}`} 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 border-l border-slate-100 pl-8 hidden lg:block">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-bold text-slate-800">ข่าวสารล่าสุด</h4>
                <button className="text-xs font-bold text-ci-blue hover:bg-ci-blue/5 px-2 py-1 rounded-lg transition-colors">
                  ดูทั้งหมด
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { icon: '🔔', type: 'ประกาศสำคัญ', date: '12 พ.ย.', title: 'ประกาศวันหยุดสงกรานต์ 13-15 เม.ย.' },
                  { icon: '📦', type: 'สินค้าใหม่', date: '10 พ.ย.', title: 'New! "เสื้อฮู้ดดี้พรีเมียม Anajak"' },
                  { icon: '✅', type: 'สต็อกสินค้า', date: '5 พ.ย.', title: 'Gildan (สีดำ) ไซส์ M, L เติมสต็อกแล้ว' }
                ].map((news, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                      {news.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold mb-0.5 flex items-center gap-2">
                        {news.type}
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        {news.date}
                      </p>
                      <h5 className="font-bold text-slate-700 text-sm group-hover:text-ci-blue transition-colors line-clamp-1">
                        {news.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">ภาพรวมรายได้</h3>
                <p className="text-sm text-slate-500 mt-1">เปรียบเทียบกับสัปดาห์ที่แล้ว</p>
              </div>
              {/* Tabs - Updated Style to match Catalog */}
              <div className="flex space-x-2 p-1">
                <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-ci-blue text-white shadow-sm border border-ci-blue shadow-ci-blue/20">7 วัน</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300">30 วัน</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300">ปีนี้</button>
              </div>
            </div>
            
            {/* Simple Bar Chart Visualization */}
            <div className="flex items-end justify-between h-64 gap-4 px-2">
              {[
                { day: 'จ', amount: 2400, height: 40 },
                { day: 'อ', amount: 3200, height: 55 },
                { day: 'พ', amount: 2800, height: 45 },
                { day: 'พฤ', amount: 4100, height: 70 },
                { day: 'ศ', amount: 3600, height: 60 },
                { day: 'ส', amount: 5200, height: 85 },
                { day: 'อา', amount: 8450, height: 100 },
              ].map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center group cursor-pointer">
                  <div className="w-full relative flex flex-col justify-end h-full">
                    <div 
                      className="w-full bg-slate-100 rounded-t-2xl group-hover:bg-ci-blue transition-all duration-300 relative" 
                      style={{ height: `${data.height}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl mb-2 transform translate-y-2 group-hover:translate-y-0 z-10">
                        ฿{data.amount.toLocaleString()}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 mt-4 group-hover:text-ci-blue transition-colors">{data.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 p-4 rounded-2xl">
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">ยอดรวมสัปดาห์นี้</p>
                <p className="text-2xl font-bold text-slate-800">฿29,750</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">เฉลี่ยต่อวัน</p>
                <p className="text-2xl font-bold text-emerald-600">฿4,250</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">สินค้าขายดี</h3>
                <p className="text-sm text-slate-500 mt-1">Top 5 ประจำเดือน</p>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-6 flex-1">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform`}>
                    #{idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                       <p className="font-bold text-slate-800 text-sm truncate">{product.title}</p>
                       <span className="text-xs font-bold text-slate-400">{product.sales} ขายแล้ว</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-ci-blue to-blue-500`} 
                        style={{ width: `${(product.sales / 50) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 text-sm font-bold bg-ci-blue text-white border border-ci-blue/10 rounded-xl hover:bg-blue-700 transition-all">
              ดูรายงานฉบับเต็ม
            </button>
          </div>
        </div>

        {/* Upgrade Banner (Pro) */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ci-blue/20 rounded-full blur-[120px] -mr-20 -mt-20"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -ml-20 -mb-20"></div>
           
           <div className="relative z-10 p-8 md:p-12 lg:p-16">
             <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
               <div className="flex-1 text-center lg:text-left">
                 <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-ci-yellow text-xs font-bold mb-6">
                    👑 สิทธิพิเศษสำหรับมืออาชีพ
                 </span>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                   อัปเกรดเป็น <span className="text-transparent bg-clip-text bg-gradient-to-r from-ci-blue via-cyan-400 to-ci-yellow">Anajak Pro</span>
                 </h2>
                 <p className="text-slate-400 text-lg mb-10 max-w-xl leading-relaxed">
                   ปลดล็อกศักยภาพสูงสุดของคุณ ด้วยส่วนลดค่าผลิต เครื่องมือวิเคราะห์เชิงลึก และผู้ดูแลส่วนตัว
                 </p>
                 
                 <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                   <button className="px-8 py-4 bg-gradient-to-r from-ci-blue to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-ci-blue/30 hover:shadow-ci-blue/50 hover:-translate-y-1 transition-all">
                     เริ่มทดลองใช้ฟรี 14 วัน
                   </button>
                   <button className="px-8 py-4 bg-transparent text-white rounded-2xl font-bold backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-all">
                     ดูรายละเอียดแพ็กเกจ
                   </button>
                 </div>
                 <p className="mt-4 text-xs text-slate-500">
                   หลังจากนั้นเพียง ฿499/เดือน • ยกเลิกได้ตลอดเวลา
                 </p>
               </div>
               
               <div className="hidden lg:block">
                 <div className="relative w-80 h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-ci-blue to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Pro Member</h3>
                      <p className="text-slate-400 text-sm">ปลดล็อกทุกฟีเจอร์</p>
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
        
        {/* Additional Components for Shop Assistant */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-[2rem] border border-slate-100 p-8">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                 <Sparkles className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-slate-800">AI แนะนำสินค้าทำกำไร</h3>
                 <p className="text-slate-500 text-sm">วิเคราะห์จากเทรนด์ตลาดปัจจุบัน</p>
               </div>
             </div>
             <button className="text-ci-blue font-bold text-sm hover:underline hover:text-ci-blue/80 transition-colors">ดูทั้งหมด</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Unisex Sweatshirt', profit: 39, price: 590, cost: 350, img: 'bg-slate-200' },
              { name: 'Heavy Hoodie', profit: 45, price: 890, cost: 490, img: 'bg-slate-300' },
              { name: 'Glossy Mug', profit: 60, price: 250, cost: 85, img: 'bg-slate-100' },
              { name: 'Canvas Tote', profit: 55, price: 390, cost: 150, img: 'bg-stone-200' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
                <div className={`aspect-square rounded-xl ${item.img} mb-4 relative overflow-hidden`}>
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-ci-red">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                    กำไร +{item.profit}%
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 mb-1">{item.name}</h4>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">ต้นทุน ฿{item.cost}</span>
                  <span className="text-sm font-bold text-ci-blue">ขาย ฿{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
