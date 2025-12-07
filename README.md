# Anajak POD - Print on Demand Platform (Next.js)

แพลตฟอร์ม Print on Demand แบบ Full-Stack สร้างด้วย Next.js 14, TypeScript และ Tailwind CSS

## 🚀 Features

- ✅ **Dashboard** - ภาพรวมธุรกิจ, สถิติการขาย, ข่าวสารอัพเดต
- ✅ **Product Catalog** - แค็ตตาล็อกสินค้าพร้อมรายละเอียดสเปก
- ✅ **Storefront Management** - จัดการหน้าร้านออนไลน์
- ✅ **Order Management** - ระบบจัดการคำสั่งซื้อ
- ✅ **Product Designer** - เครื่องมือออกแบบสินค้า
- ✅ **Integrations** - เชื่อมต่อแพลตฟอร์มขายออนไลน์
- ✅ **Wallet & Transactions** - ระบบกระเป๋าเงินและธุรกรรม
- ✅ **Reports** - รายงานยอดขาย

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # หน้า Dashboard
│   │   ├── catalog/            # หน้า Product Catalog
│   │   ├── orders/             # หน้า Order Management
│   │   ├── wallet/             # หน้า Wallet & Transactions
│   │   ├── integrations/       # หน้า Integrations
│   │   ├── storefront/         # หน้า Storefront Management
│   │   ├── designer/           # หน้า Product Designer
│   │   ├── templates/          # หน้า My Designs
│   │   ├── reports/            # หน้า Reports
│   │   ├── affiliate/          # หน้า Affiliate Program
│   │   ├── cart/               # หน้า Shopping Cart
│   │   ├── checkout/           # หน้า Checkout
│   │   ├── layout.tsx          # Root Layout
│   │   ├── page.tsx            # Home page (redirect to dashboard)
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Header.tsx          # Page header
│   │   ├── DashboardLayout.tsx # Dashboard layout wrapper
│   │   └── StepIndicator.tsx   # Step indicator component
│   └── lib/
│       └── mockData.ts         # Mock data for development
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
- **Date Formatting**: date-fns

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm หรือ bun

### Steps

1. **Clone or navigate to the project directory**

```bash
cd POD
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Mock Data

โปรเจคนี้ใช้ Mock Data สำหรับการพัฒนาและทดสอบ ไม่ต้องเชื่อมต่อ Database

### ข้อมูลที่มี

| ประเภท | จำนวน | ไฟล์ |
|--------|-------|------|
| Products | 7 รายการ | `src/lib/mockData.ts` |
| Orders | 8 รายการ | `src/lib/mockData.ts` |
| Transactions | 7 รายการ | `src/lib/mockData.ts` |
| Integrations | 3 รายการ | `src/lib/mockData.ts` |
| Wallet | ยอดเงิน ฿4,500 | `src/lib/mockData.ts` |

### การใช้งาน Mock Data

```typescript
import { getProducts, getOrders, getWallet } from '@/lib/mockData';

// ดึงข้อมูลสินค้า
const products = getProducts();

// ดึงข้อมูล Orders
const orders = getOrders();

// ดึงข้อมูล Wallet
const wallet = getWallet();
```

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

### 3. Orders (`/orders`)
- รายการคำสั่งซื้อทั้งหมด
- สถานะการผลิตและจัดส่ง
- Filter ตามสถานะ

### 4. Wallet (`/wallet`)
- ยอดเงินคงเหลือ
- ประวัติธุรกรรม
- เติมเงิน/ถอนเงิน

### 5. Storefront Management (`/storefront`)
- ตั้งค่า URL ร้านค้า
- ปรับแต่งธีมและสี
- จัดการสินค้าในหน้าร้าน
- ตั้งค่าการจัดส่งและ Tracking Pixels

### 6. Product Designer (`/designer`)
- เครื่องมือออกแบบสินค้า
- อัพโหลดภาพและเพิ่มข้อความ
- AI Image Generator
- Preview แบบ Real-time

### 7. Integrations (`/integrations`)
- เชื่อมต่อ Shopee, Lazada, TikTok Shop
- API Keys สำหรับนักพัฒนา

### 8. Reports (`/reports`)
- รายงานยอดขาย
- กราฟและสถิติ

### 9. Affiliate (`/affiliate`)
- โปรแกรมแนะนำเพื่อน
- ติดตามรายได้จากการแนะนำ

## 📱 Responsive Design

โปรเจคนี้รองรับ:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🎯 Next Steps

- [ ] เชื่อมต่อ Backend API จริง
- [ ] เพิ่ม Authentication
- [ ] เชื่อมต่อ Database (PostgreSQL/MySQL)
- [ ] Deploy to Production
- [ ] เพิ่ม Payment Gateway
- [ ] ทำระบบแจ้งเตือน Real-time

## 📄 License

© 2024 Anajak T-Shirt. All rights reserved.

---

**Note**: โปรเจคนี้ใช้ Mock Data สำหรับการพัฒนา สามารถเชื่อมต่อ Database จริงได้ในภายหลัง
