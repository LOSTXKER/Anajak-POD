# 🏭 Operations Plan
## Anajak POD - Print on Demand Platform

---

## 💳 Payment Methods

### ช่องทางชำระเงินที่ต้องมี

| ช่องทาง | ความสำคัญ | หมายเหตุ |
|---------|----------|----------|
| **PromptPay QR** | ⭐⭐⭐⭐⭐ | คนไทยใช้เยอะที่สุด |
| **Mobile Banking** | ⭐⭐⭐⭐⭐ | SCB, KBANK, KTB, BBL |
| **Credit/Debit Card** | ⭐⭐⭐⭐ | Visa, Mastercard |
| **TrueMoney Wallet** | ⭐⭐⭐ | กลุ่มวัยรุ่น |
| **เก็บเงินปลายทาง (COD)** | ⭐⭐⭐ | สร้างความมั่นใจ |
| **Shopee Pay** | ⭐⭐ | ถ้า Integrate กับ Shopee |
| **ผ่อนชำระ 0%** | ⭐⭐ | สำหรับออเดอร์ใหญ่ |

### Payment Flow

```
┌─────────────────────────────────────────┐
│  💳 เลือกช่องทางชำระเงิน                 │
│                                         │
│  ○ PromptPay (แนะนำ - ฟรีค่าธรรมเนียม)  │
│  ○ Mobile Banking                       │
│  ○ บัตรเครดิต/เดบิต                     │
│  ○ TrueMoney Wallet                     │
│  ○ เก็บเงินปลายทาง (+฿30)              │
│                                         │
│  [ชำระเงิน ฿XXX]                         │
│                                         │
└─────────────────────────────────────────┘
```

### Payment Gateway: Omise

**Supported Methods:**
- Credit/Debit Cards (Visa, Mastercard, JCB)
- PromptPay QR
- TrueMoney Wallet
- Mobile Banking (via redirect)
- Installments

**Integration:**
- Omise.js for frontend
- Webhooks for payment confirmation
- Refund API for returns

---

## 🚚 Shipping Options

### ขนส่งที่รองรับ

| ขนส่ง | ราคา | ระยะเวลา | หมายเหตุ |
|-------|------|---------|----------|
| **Kerry Express** | ฿50-80 | 1-2 วัน | เร็ว, น่าเชื่อถือ |
| **Flash Express** | ฿40-60 | 1-3 วัน | ราคาถูก |
| **J&T Express** | ฿40-60 | 2-3 วัน | ครอบคลุมทั่วไทย |
| **Thailand Post EMS** | ฿50-100 | 2-3 วัน | ไปรษณีย์ไทย |
| **ไปรษณีย์ลงทะเบียน** | ฿30-50 | 3-5 วัน | ประหยัด |

### ค่าจัดส่ง

**Standard Rate:**
- น้ำหนัก < 1 kg: ฿50
- น้ำหนัก 1-3 kg: ฿70
- น้ำหนัก 3-5 kg: ฿90

**ฟรีค่าส่ง:**
```
🚚 ส่งฟรี! เมื่อสั่งครบ ฿500 หรือ 10 ชิ้นขึ้นไป
```

### Shipping Flow

```
Order Placed
    ↓
Production (1-3 days)
    ↓
Quality Check (QC)
    ↓
Packing
    ↓
Handover to Carrier
    ↓
In Transit (1-3 days)
    ↓
Delivered
```

### Tracking

- Auto-send tracking number via LINE/Email
- Tracking page on website
- Integration with carrier tracking APIs

---

## 📞 Customer Support

### ช่องทาง Support

| ช่องทาง | เวลาทำการ | Response Time |
|---------|----------|---------------|
| **LINE @anajakpod** | 9:00-21:00 | < 30 นาที |
| **Live Chat (เว็บ)** | 9:00-21:00 | < 5 นาที |
| **Email** | 24 ชม. | < 24 ชม. |
| **โทรศัพท์** | 9:00-18:00 | ทันที |
| **FAQ / Help Center** | 24/7 | Self-service |

### Chatbot Flow

```
"สวัสดีค่ะ! ต้องการความช่วยเหลือเรื่องอะไรคะ?"

1. 📦 เช็คสถานะคำสั่งซื้อ
2. 🎨 วิธีใช้งานเครื่องมือออกแบบ
3. 💰 สอบถามราคา/โปรโมชั่น
4. 🔄 เปลี่ยน/คืนสินค้า
5. 💬 พูดคุยกับเจ้าหน้าที่
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| ไฟล์ภาพไม่ชัด | แนะนำให้อัพโหลดภาพ 300 DPI ขึ้นไป |
| สีไม่ตรงกับหน้าจอ | อธิบายเรื่อง RGB vs CMYK, แนะนำ Pantone |
| ขนาดไม่พอดี | มี Size Chart, แนะนำวัดตัวก่อนสั่ง |
| ส่งของล่าช้า | ตรวจสอบสถานะ, ติดต่อขนส่ง, ชดเชยถ้าจำเป็น |
| สินค้าเสียหาย | รับเปลี่ยน/คืน ภายใน 7 วัน |

---

## 🔄 Return & Refund Policy

### เงื่อนไขการคืน/เปลี่ยน

**รับคืน/เปลี่ยน ภายใน 7 วัน กรณี:**
- ✅ สินค้าชำรุด/เสียหายจากการผลิต
- ✅ พิมพ์ผิด (ไม่ตรงกับแบบที่สั่ง)
- ✅ ส่งสินค้าผิดรุ่น/ไซส์/สี

**ไม่รับคืน/เปลี่ยน กรณี:**
- ❌ เปลี่ยนใจ (สินค้าทำตามสั่ง)
- ❌ สีไม่ตรง 100% (ธรรมชาติของการพิมพ์)
- ❌ ขนาดไม่พอดี (มี Size Chart ให้ดู)

### Refund Process

```
Customer Request
    ↓
Review Photos/Evidence
    ↓ (ภายใน 24 ชม.)
Approved / Rejected
    ↓
Refund / Replacement
    ↓ (ภายใน 3-5 วันทำการ)
Completed
```

### Compensation Options

| กรณี | ชดเชย |
|------|-------|
| สินค้าเสียหาย | ผลิตใหม่ฟรี หรือ คืนเงินเต็มจำนวน |
| ส่งช้าเกิน 7 วัน | ส่วนลด 10% ครั้งถัดไป |
| พิมพ์ไม่ตรงแบบ | ผลิตใหม่ฟรี |

---

## 🏭 Production Process

### Order to Delivery Timeline

| Stage | Duration | Notes |
|-------|----------|-------|
| Order Received | - | Payment confirmed |
| Production Queue | 0-12 hrs | ขึ้นกับคิว |
| Printing | 1-2 hrs | DTG/DTF |
| Quality Check | 30 min | ตรวจสอบทุกตัว |
| Packing | 30 min | - |
| Handover to Carrier | Same day | ก่อน 14:00 |
| Delivery | 1-3 days | ขึ้นกับพื้นที่ |

**Total: 2-5 วัน (ปกติ 2-3 วัน)**

### Quality Control (QC)

**Checkpoints:**
1. ✅ ภาพถูกต้องตามแบบ
2. ✅ ตำแหน่งพิมพ์ตรง
3. ✅ สีคมชัด ไม่เลือน
4. ✅ ไม่มีรอยเปื้อน/รอยขีดข่วน
5. ✅ ขนาด/สี ถูกต้อง

### Production Capacity

| เครื่อง | Capacity/วัน | Notes |
|---------|-------------|-------|
| DTG (Epson F3070) | 200-300 ชิ้น | High quality |
| DTF | 500-800 ชิ้น | Mass production |
| Screen Print | 1000+ ชิ้น | Bulk orders |

---

## 📊 Order Status Flow

```
┌──────────────┐
│  Pending     │ ← รอชำระเงิน
└──────┬───────┘
       ↓
┌──────────────┐
│   Paid       │ ← ชำระเงินแล้ว
└──────┬───────┘
       ↓
┌──────────────┐
│ Processing   │ ← กำลังผลิต
└──────┬───────┘
       ↓
┌──────────────┐
│  Printing    │ ← กำลังพิมพ์
└──────┬───────┘
       ↓
┌──────────────┐
│   QC Pass    │ ← ผ่าน QC
└──────┬───────┘
       ↓
┌──────────────┐
│   Shipped    │ ← จัดส่งแล้ว
└──────┬───────┘
       ↓
┌──────────────┐
│  Delivered   │ ← ส่งถึงแล้ว
└──────────────┘
```

---

## 🏢 B2B/Corporate Operations

### Corporate Order Process

```
Day 1: ติดต่อ + ส่งแบบ
    ↓
Day 2: ใบเสนอราคา + ตัวอย่างดิจิทัล
    ↓
Day 3-4: อนุมัติ + ชำระเงิน (50%)
    ↓
Day 5-10: ผลิต (ขึ้นกับจำนวน)
    ↓
Day 11-12: QC + จัดส่ง + ชำระที่เหลือ
```

### Bulk Order Pricing

| จำนวน | ส่วนลด | ราคาต่อตัว (ประมาณ) |
|-------|--------|-------------------|
| 20-49 ชิ้น | 10% | ฿XXX |
| 50-99 ชิ้น | 15% | ฿XXX |
| 100-299 ชิ้น | 20% | ฿XXX |
| 300+ ชิ้น | 25% | ติดต่อเรา |

### Documents Provided

- ✅ ใบเสนอราคา (Quotation)
- ✅ ใบกำกับภาษี (Tax Invoice)
- ✅ ใบส่งของ (Delivery Note)
- ✅ ใบเสร็จรับเงิน (Receipt)

---

## 📈 Operational KPIs

### Production

| Metric | Target |
|--------|--------|
| Production Time | < 24 hrs |
| QC Pass Rate | > 98% |
| On-time Delivery | > 95% |

### Customer Service

| Metric | Target |
|--------|--------|
| First Response Time | < 30 min |
| Resolution Time | < 24 hrs |
| Customer Satisfaction | > 4.5/5 |

### Returns

| Metric | Target |
|--------|--------|
| Return Rate | < 2% |
| Return Resolution | < 48 hrs |
| Refund Processing | < 5 days |

---

## 🔧 Tools & Systems

### Order Management

- **Platform:** Custom Dashboard / Shopify
- **Features:** Order tracking, status updates, bulk actions

### Inventory

- **Blank Products:** Track stock levels
- **Ink/Supplies:** Reorder alerts
- **Packaging:** Stock management

### Communication

- **Customer:** LINE OA, Email, Website Chat
- **Internal:** Slack / Discord
- **Carrier:** API integration

### Reporting

- **Daily:** Orders, Revenue, Production
- **Weekly:** KPIs, Issues, Feedback
- **Monthly:** Full analytics, Growth

---

*Document Version: 1.0*
*Last Updated: December 2024*

