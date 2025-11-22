# Anajak POD - Print on Demand Platform (Next.js)

แพลตฟอร์ม Print on Demand แบบ Full-Stack สร้างด้วย Next.js 14, TypeScript และ Tailwind CSS

## 🚀 Features

- ✅ **Dashboard** - ภาพรวมธุรกิจ, สถิติการขาย, ข่าวสารอัพเดต
- ✅ **Product Catalog** - แค็ตตาล็อกสินค้าพร้อมรายละเอียดสเปก
- ✅ **Storefront Management** - จัดการหน้าร้านออนไลน์
- ✅ **Order Management** - ระบบจัดการคำสั่งซื้อ
- ✅ **Product Designer** - เครื่องมือออกแบบสินค้า
- ✅ **Integrations** - เชื่อมต่อแพลตฟอร์มขายออนไลน์

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # หน้า Dashboard
│   │   ├── catalog/            # หน้า Product Catalog
│   │   ├── storefront/         # หน้า Storefront Management
│   │   ├── layout.tsx          # Root Layout
│   │   ├── page.tsx            # Home page (redirect to dashboard)
│   │   └── globals.css         # Global styles
│   └── components/             # Reusable components
│       ├── Sidebar.tsx         # Navigation sidebar
│       ├── Header.tsx          # Page header
│       └── DashboardLayout.tsx # Dashboard layout wrapper
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter & Sarabun (Google Fonts)

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm หรือ bun

### Steps

1. **Clone or navigate to the project directory**

```bash
cd "c:\Users\LOSTXKER\OneDrive\Desktop\Desktop\Anajak\Anajak T-Shirt\เว็บ\POD"
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Color Scheme

โปรเจคนี้ใช้ Color Scheme จาก Brand Anajak:

```javascript
colors: {
  ci: {
    blue: '#3973b2',    // สีน้ำเงินหลัก
    yellow: '#fec91b',  // สีเหลือง
    red: '#e72f27',     // สีแดง
    dark: '#0f172a',    // สีเข้ม
  }
}
```

## 📄 Pages

### 1. Dashboard (`/dashboard`)
- ภาพรวมยอดขายและสถิติ
- สถานะโรงพิมพ์แบบ Real-time
- AI Product Recommendations
- ข่าวสารและอัพเดต

### 2. Product Catalog (`/catalog`)
- แค็ตตาล็อกสินค้าทั้งหมด
- ระบบค้นหาและกรองสินค้า
- รายละเอียดสินค้า (ขนาด, สี, วิธีพิมพ์, เวลาจัดส่ง)
- ราคาสมาชิกและราคาทั่วไป

### 3. Storefront Management (`/storefront`)
- ตั้งค่า URL ร้านค้า
- ปรับแต่งธีมและสี
- จัดการสินค้าในหน้าร้าน
- ตั้งค่าการจัดส่งและ Tracking Pixels
- จัดการหน้าเพจต่างๆ

### 4. Orders Management (`/orders`)
- รายการคำสั่งซื้อทั้งหมด
- สถานะการผลิตและจัดส่ง
- ประวัติธุรกรรม

### 5. Product Designer (`/designer`)
- เครื่องมือออกแบบสินค้า
- อัพโหลดภาพและเพิ่มข้อความ
- AI Image Generator
- Preview แบบ Real-time

## 🔧 Configuration Files

### `next.config.js`
```javascript
module.exports = {
  images: {
    domains: ['placehold.co'], // เพิ่ม domain สำหรับ next/image
  },
}
```

### `tailwind.config.ts`
กำหนด custom colors, fonts และ theme extensions

## 📝 Component Usage

### DashboardLayout

```tsx
import DashboardLayout from '@/components/DashboardLayout';

export default function MyPage() {
  return (
    <DashboardLayout 
      title="Page Title" 
      subtitle="Optional subtitle"
      showCreateButton={true}
    >
      {/* Your page content */}
    </DashboardLayout>
  );
}
```

## 🚧 Development

### Adding a New Page

1. สร้างโฟลเดอร์ใน `src/app/[page-name]/`
2. สร้างไฟล์ `page.tsx`
3. เพิ่ม route ใน Sidebar (`src/components/Sidebar.tsx`)

### Adding a New Component

1. สร้างไฟล์ใน `src/components/[ComponentName].tsx`
2. Export และ import ในที่ต้องการใช้งาน

## 📱 Responsive Design

โปรเจคนี้รองรับ:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🎯 Next Steps

- [ ] เชื่อมต่อ Backend API
- [ ] เพิ่ม Authentication
- [ ] ทำระบบ Database
- [ ] Deploy to Production
- [ ] เพิ่ม Payment Gateway
- [ ] ทำระบบแจ้งเตือน Real-time

## 📄 License

© 2024 Anajak T-Shirt. All rights reserved.

## 👨‍💻 Development Team

Converted to Next.js by AI Assistant

---

**Note**: โปรเจคนี้แปลงมาจาก HTML/CSS/JavaScript แบบ Static เป็น Next.js Application พร้อม TypeScript และ Modern React Patterns
