import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({ 
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anajak.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Anajak POD - ทำเสื้อได้ภายใน 5 นาที | Print on Demand',
    template: '%s | Anajak POD',
  },
  description: 'แพลตฟอร์ม Print on Demand สำหรับทำเสื้อ ออกแบบเอง สั่งผลิตได้ตั้งแต่ 1 ชิ้น ไม่มีขั้นต่ำ ผลิตจากโรงงาน Anajak T-Shirt ส่งถึงมือใน 3-5 วัน',
  keywords: ['print on demand', 'POD', 'ทำเสื้อ', 'สกรีนเสื้อ', 'เสื้อยืด', 'ออกแบบเสื้อ', 'Anajak', 'DTF', 'DTG'],
  authors: [{ name: 'Anajak T-Shirt' }],
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: siteUrl,
    siteName: 'Anajak POD',
    title: 'Anajak POD - ทำเสื้อได้ภายใน 5 นาที',
    description: 'ออกแบบและสั่งผลิตเสื้อยืดคุณภาพสูง ไม่มีขั้นต่ำ ผลิตจากโรงงานเอง ส่งไว 3-5 วัน',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Anajak POD' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anajak POD - ทำเสื้อได้ภายใน 5 นาที',
    description: 'ออกแบบและสั่งผลิตเสื้อยืดคุณภาพสูง ไม่มีขั้นต่ำ ผลิตจากโรงงานเอง',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${notoSansThai.className} antialiased`}>{children}</body>
    </html>
  );
}
