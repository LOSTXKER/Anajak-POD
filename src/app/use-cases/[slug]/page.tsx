import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';

// Use Case Data
const useCaseData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  benefits: string[];
  galleryImages: string[];
  priceStart: string;
  ctaText: string;
}> = {
  'graduation': {
    title: 'เสื้อรุ่น สั่งทำ ราคาถูก',
    subtitle: 'สั่งผลิตเสื้อรุ่นง่ายๆ ส่งฟรีถึงโรงเรียน',
    description: 'ออกแบบเสื้อรุ่นของคุณเอง พิมพ์ได้ตั้งแต่ 1 ตัว ไม่ต้องสต็อก ราคาหน้าโรงงาน คุณภาพคมชัดติดทน',
    keywords: ['เสื้อรุ่น', 'เสื้อรับปริญญา', 'เสื้อจบการศึกษา', 'เสื้อนักเรียน'],
    benefits: ['ไม่มีขั้นต่ำ - 1 ตัวก็ทำได้', 'หลากหลายสีและขนาด', 'สกรีนภาพคมชัด ไม่ลอก', 'ส่งฟรี! เมื่อสั่ง 20 ตัวขึ้นไป'],
    galleryImages: ['/shirt/front.png', '/shirt/back.png', '/shirt/front.png', '/shirt/back.png'],
    priceStart: '150',
    ctaText: 'ออกแบบเสื้อรุ่นเลย'
  },
  'event': {
    title: 'เสื้องานบวช สกรีน ราคาถูก',
    subtitle: 'เสื้องานบุญ เสื้องานแต่ง เสื้อทำบุญ',
    description: 'รับผลิตเสื้อสำหรับงานบวช งานแต่ง งานบุญ งานรวมญาติ ออกแบบได้ตามต้องการ คุณภาพดี ราคาประหยัด',
    keywords: ['เสื้องานบวช', 'เสื้องานแต่ง', 'เสื้อทำบุญ', 'เสื้องานรวมญาติ'],
    benefits: ['สั่งได้ทุกจำนวน', 'มีบริการขึ้นตัวอย่างก่อนผลิต', 'ผ้าคุณภาพ สวมใส่สบาย', 'ส่วนลดพิเศษเมื่อสั่งจำนวนมาก'],
    galleryImages: ['/shirt/front.png', '/shirt/back.png', '/shirt/front.png', '/shirt/back.png'],
    priceStart: '120',
    ctaText: 'ออกแบบเสื้องานบุญเลย'
  },
  'team': {
    title: 'เสื้อทีม เสื้อกีฬา สกรีนชื่อ-เบอร์',
    subtitle: 'เสื้อฟุตบอล เสื้อวิ่ง เสื้อกิจกรรม',
    description: 'สั่งทำเสื้อทีมคุณภาพ สกรีนชื่อและเบอร์ได้ตามใจ รับผลิตทุกจำนวน ผ้าระบายอากาศดี ทนทาน',
    keywords: ['เสื้อทีม', 'เสื้อกีฬา', 'เสื้อฟุตบอล', 'เสื้อวิ่ง'],
    benefits: ['ผ้ากีฬา ระบายอากาศดี', 'สกรีนชื่อ-เบอร์ ได้ทุกตัว', 'มีหลายสีให้เลือก', 'ผลิตเร็ว ส่งตรงเวลา'],
    galleryImages: ['/shirt/front.png', '/shirt/back.png', '/shirt/front.png', '/shirt/back.png'],
    priceStart: '180',
    ctaText: 'ออกแบบเสื้อทีมเลย'
  },
  'uniform': {
    title: 'เสื้อยูนิฟอร์ม เสื้อพนักงาน',
    subtitle: 'เสื้อโปโล เสื้อช็อป สำหรับบริษัท',
    description: 'รับผลิตเสื้อยูนิฟอร์มบริษัท เสื้อโปโล เสื้อช็อป พร้อมบริการปักโลโก้หรือสกรีน คุณภาพเกรดพรีเมียม',
    keywords: ['เสื้อยูนิฟอร์ม', 'เสื้อพนักงาน', 'เสื้อบริษัท', 'เสื้อโปโล'],
    benefits: ['เนื้อผ้าคุณภาพ ใส่ทนทาน', 'ปัก/สกรีนโลโก้บริษัทได้', 'ออกใบกำกับภาษีได้', 'ส่วนลดพิเศษสำหรับองค์กร'],
    galleryImages: ['/shirt/front.png', '/shirt/back.png', '/shirt/front.png', '/shirt/back.png'],
    priceStart: '250',
    ctaText: 'ขอใบเสนอราคา'
  },
  'band': {
    title: 'เสื้อวง เสื้อศิลปิน เสื้อ Merchandise',
    subtitle: 'ทำ Merch ขายแฟนคลับ ไม่ต้องสต็อกของ',
    description: 'สร้าง Merchandise สำหรับวงดนตรี ศิลปิน หรือคอนเท้นต์ครีเอเตอร์ ผลิตตามสั่ง ส่งตรงถึงแฟนคลับ',
    keywords: ['เสื้อวง', 'เสื้อศิลปิน', 'Merchandise', 'Merch'],
    benefits: ['ผลิตตามสั่ง ไม่ต้องสต็อก', 'เชื่อมต่อร้านค้าออนไลน์ได้', 'กำไรเข้ากระเป๋าคุณเต็มๆ', 'คุณภาพงานพิมพ์ระดับพรีเมียม'],
    galleryImages: ['/shirt/front.png', '/shirt/back.png', '/shirt/front.png', '/shirt/back.png'],
    priceStart: '180',
    ctaText: 'สร้าง Merch เลย'
  }
};

// Generate static params for SSG (optional for better SEO)
export async function generateStaticParams() {
  return Object.keys(useCaseData).map((slug) => ({
    slug,
  }));
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = useCaseData[slug];

  // Fallback for unknown slugs
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <LandingHeader />
        <main className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold mb-4">ไม่พบหน้านี้</h1>
          <p className="text-slate-600 mb-8">ขออภัย ไม่พบ Use Case ที่คุณต้องการ</p>
          <Link href="/" className="text-blue-600 font-bold">กลับหน้าหลัก</Link>
        </main>
        <LandingFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0">
             <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/3" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-sm font-bold mb-6">
                    Use Case
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {data.title}
                  </h1>
                  <p className="text-xl text-blue-100 mb-6">{data.subtitle}</p>
                  <p className="text-blue-200 leading-relaxed mb-8">{data.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/designer" 
                      className="px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                      {data.ctaText}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/20">
                     <p className="text-sm text-blue-200 mb-2">เริ่มต้นเพียง</p>
                     <p className="text-4xl font-bold">฿{data.priceStart}<span className="text-lg font-normal text-blue-200"> / ตัว</span></p>
                  </div>
               </div>

               <div className="relative h-[400px] hidden md:flex items-center justify-center">
                  <Image 
                     src="/shirt/front.png" 
                     alt={data.title}
                     width={350}
                     height={350}
                     className="object-contain drop-shadow-2xl animate-float-slow"
                  />
               </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">ทำไมต้องสั่งกับเรา?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {data.benefits.map((benefit, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                   <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-4" />
                   <p className="font-bold text-slate-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">ตัวอย่างผลงาน</h2>
            <p className="text-slate-600 text-center mb-12">ผลงานจริงจากลูกค้าของเรา</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.galleryImages.map((img, i) => (
                <div key={i} className="aspect-square bg-white rounded-2xl overflow-hidden border border-slate-200 p-4 flex items-center justify-center hover:shadow-lg transition-shadow">
                  <Image 
                    src={img} 
                    alt={`Gallery ${i + 1}`}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white text-center">
           <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
              <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
                 ออกแบบเสื้อของคุณเองได้ง่ายๆ ใน 5 นาที ไม่ต้องสมัครสมาชิก!
              </p>
              <Link href="/designer" className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:-translate-y-1">
                 เริ่มออกแบบเลย
              </Link>
           </div>
        </section>

      </main>

      <LandingFooter />
    </div>
  );
}

