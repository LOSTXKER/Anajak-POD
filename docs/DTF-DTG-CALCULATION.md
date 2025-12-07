# 📐 ระบบคำนวณพื้นที่สกรีนอัตโนมัติ

> **DTF (Direct to Film)** & **DTG (Direct to Garment)** Automatic Pricing System

---

## 🎯 Overview

ระบบคำนวณราคาการสกรีนอัตโนมัติที่รองรับ 2 เทคนิค:
- **DTF**: คำนวณราคาตามจำนวนจุดสกรีนและขนาดพื้นที่
- **DTG**: ราคาเหมาตามขนาดพื้นที่โดยรวม

---

## 🎨 เทคนิค DTF (Direct to Film)

### หลักการทำงาน

DTF คำนวณราคาโดยการ:
1. **จัดกลุ่ม Elements** - รวม elements ที่อยู่ใกล้กัน (< 5 cm) เป็น cluster เดียวกัน
2. **คำนวณ Bounding Box** - หาขนาดพื้นที่ที่เล็กที่สุดที่ครอบคลุม elements ในแต่ละ cluster
3. **จับ Price Tier** - เทียบขนาดกับตาราง tier เพื่อกำหนดราคา
4. **รวมราคา** - นำราคาของทุก cluster มาบวกกัน

### 📊 ตาราง Price Tiers

| Tier | ขนาดสูงสุด (cm) | ราคาเพิ่ม | รวม (BASE ฿290) |
|------|----------------|----------|----------------|
| A7   | ≤ 10 × 10      | +฿0      | ฿290           |
| A6   | ≤ 15 × 15      | +฿50     | ฿340           |
| A5   | ≤ 20 × 20      | +฿100    | ฿390           |
| A4   | ≤ 25 × 30      | +฿200    | ฿490           |
| A3   | ≤ 35 × 45      | +฿400    | ฿690           |
| A2+  | > 35 × 45      | +฿600    | ฿890           |

### 🔧 Clustering Algorithm

```javascript
const CLUSTER_DISTANCE = 50; // pixels (≈ 5 cm)

// Elements ที่มีระยะห่าง < 50px จะถูกรวมเป็น cluster เดียวกัน
clusterElements(elements, side) {
  1. กรอง elements ตาม side (front/back)
  2. วนลูปแต่ละ element
  3. ถ้าอยู่ใกล้ cluster ที่มีอยู่ (< CLUSTER_DISTANCE) → เพิ่มเข้า cluster
  4. ถ้าไม่ → สร้าง cluster ใหม่
  5. return array ของ clusters
}
```

### 📐 Bounding Box Calculation

```javascript
getBoundingBox(cluster) {
  // หา min/max coordinates
  minX = min(element.x for all elements)
  minY = min(element.y for all elements)
  maxX = max(element.x + element.width)
  maxY = max(element.y + element.height)
  
  // คำนวณขนาด
  width = maxX - minX
  height = maxY - minY
  
  // แปลง pixels → cm
  PIXELS_TO_CM = 0.06  // ค่าประมาณ (ปรับตามจริง)
  widthCm = ceil(width × PIXELS_TO_CM)
  heightCm = ceil(height × PIXELS_TO_CM)
  
  return { x, y, width, height, widthCm, heightCm }
}
```

### 💰 การคำนวณราคา

```javascript
// DTF Price Calculation
printingPrice = 0
for each cluster in allClusters {
  bbox = getBoundingBox(cluster)
  tier = getPriceTier(bbox.widthCm, bbox.heightCm)
  printingPrice += tier.price
}

totalPrice = BASE_PRICE + sizeSurcharge + printingPrice
```

### 📝 ตัวอย่างการคำนวณ

#### ตัวอย่างที่ 1: Single Cluster
```
Elements:
- Logo: (x:100, y:100, 150×150px) → 9×9 cm

Clusters:
- Cluster 1: 9×9 cm → Tier A7 → +฿0

ราคาสุดท้าย:
฿290 (เสื้อ M) + ฿0 (DTF) = ฿290
```

#### ตัวอย่างที่ 2: Multiple Clusters (ห่างกัน)
```
Elements:
- Logo (Front): (x:50, y:50, 200×200px) → 12×12 cm
- Text (Back): (x:100, y:100, 250×50px) → 15×3 cm

Clusters:
- Cluster 1 (Front): 12×12 cm → Tier A6 → +฿50
- Cluster 2 (Back): 15×3 cm → Tier A6 → +฿50

ราคาสุดท้าย:
฿290 + ฿50 + ฿50 = ฿390
```

#### ตัวอย่างที่ 3: Multiple Elements in Same Cluster
```
Elements:
- Logo: (x:100, y:100, 150×150px) → 9×9 cm
- Brand Text: (x:110, y:260, 200×40px) → 12×2.4 cm
  * ระยะห่าง dy = 10px < 50px → Same Cluster

Clusters:
- Cluster 1 (รวม): 12×12 cm (Bounding Box) → Tier A6 → +฿50

ราคาสุดท้าย:
฿290 + ฿50 = ฿340
```

---

## 🖨️ เทคนิค DTG (Direct to Garment)

### หลักการทำงาน

DTG คำนวณราคาแบบเหมาจ่าย:
1. คำนวณ Bounding Box ของ elements ทั้งหมด
2. เช็คขนาดพื้นที่รวม
3. กำหนดราคาตามขนาด

### 💰 โครงสร้างราคา

| ขนาดพื้นที่ | ราคาเหมา |
|------------|---------|
| ≤ 30×40 cm | ฿350    |
| > 30×40 cm | ฿450    |

### 📝 การคำนวณ

```javascript
// DTG Price Calculation
hasLargeDesign = clusters.some(cp => 
  cp.bbox.widthCm > 30 || cp.bbox.heightCm > 40
)

printingPrice = hasLargeDesign 
  ? (DTG_LARGE_RATE - BASE_PRICE)  // ฿450 - ฿290 = ฿160
  : (DTG_FLAT_RATE - BASE_PRICE)   // ฿350 - ฿290 = ฿60

totalPrice = BASE_PRICE + sizeSurcharge + printingPrice
```

### 📝 ตัวอย่าง

#### DTG Standard
```
Elements: Logo 20×15 cm + Text 10×3 cm
→ พื้นที่รวม < 30×40 cm
→ ฿290 + ฿60 = ฿350
```

#### DTG Large
```
Elements: Large Graphic 35×42 cm
→ พื้นที่รวม > 30×40 cm  
→ ฿290 + ฿160 = ฿450
```

---

## 📊 เปรียบเทียบ DTF vs DTG

| หัวข้อ | DTF | DTG |
|--------|-----|-----|
| **การคำนวณ** | แยกราคาแต่ละจุด | ราคาเหมา |
| **จำนวน Elements** | มีผล (หลาย cluster = แพงขึ้น) | ไม่มีผล |
| **ขนาด** | มีผล (tier ต่างกัน) | มีผล (2 ระดับ) |
| **ราคาต่ำสุด** | ฿290 | ฿350 |
| **ราคาสูงสุด** | ไม่จำกัด (ตามจำนวน cluster) | ฿450 |
| **เหมาะสำหรับ** | Design หลายจุด, แยกส่วน | Design ใหญ่เต็มพื้นที่ |

---

## 🎨 UI Components

### 1. Product Panel - Technique Selector
```
🎨 DTF     |  🖨️ DTG
คิดตามจุด  |  ราคาเหมา
```

### 2. Canvas - Cluster Visualization (DTF only)
```
┌─────────────────────────────────┐
│ จุดที่ 1: 12×8 cm (A6)          │
│  ┌────────┐                     │
│  │ Logo   │                     │
│  │ & Text │                     │
│  └────────┘                     │
└─────────────────────────────────┘
```

### 3. Product Panel - Price Breakdown

#### DTF Breakdown
```
พื้นที่สกรีน (DTF)
┌─────────────────────────────┐
│ 🎯 1  12×8 cm (A6)  +฿50   │
│ 🎯 2  20×15 cm (A5) +฿100  │
└─────────────────────────────┘
รวม 2 จุดสกรีน         ฿150
```

#### DTG Display
```
พื้นที่สกรีน (DTG)
┌─────────────────────────────┐
│ ราคาเหมา (DTG)        ฿60  │
│ ✨ ราคามาตรฐาน              │
└─────────────────────────────┘
```

### 4. Price Summary
```
┌─────────────────────────────┐
│ ราคาเสื้อ (M)        ฿290  │
│ ค่าพิมพ์ (DTF)       ฿150  │
│ ─────────────────────────  │
│ ราคารวม             ฿440  │
└─────────────────────────────┘
```

---

## 🔧 Technical Implementation

### State Management
```javascript
const [technique, setTechnique] = useState<'dtf' | 'dtg'>('dtf');
const [elements, setElements] = useState<DesignElement[]>([]);
```

### Key Functions
```javascript
// Clustering
clusterElements(elements, side)
getClusterBoundingBox(cluster)
getPriceTier(widthCm, heightCm)

// Pricing
calculateDTFPrice(clusters)
calculateDTGPrice(clusters)
getCurrentPrice()
```

### Real-time Calculation
- คำนวณทุกครั้งที่ `elements` หรือ `technique` เปลี่ยน
- Update ทั้ง canvas visualization และ price breakdown
- แสดงผลแบบ real-time

---

## 📏 Constants & Configuration

### Price Tiers
```javascript
const DTF_PRICE_TIERS = [
  { maxWidth: 10, maxHeight: 10, price: 0, label: 'A7 (≤10×10)' },
  { maxWidth: 15, maxHeight: 15, price: 50, label: 'A6 (≤15×15)' },
  { maxWidth: 20, maxHeight: 20, price: 100, label: 'A5 (≤20×20)' },
  { maxWidth: 25, maxHeight: 30, price: 200, label: 'A4 (≤25×30)' },
  { maxWidth: 35, maxHeight: 45, price: 400, label: 'A3 (≤35×45)' },
  { maxWidth: 999, maxHeight: 999, price: 600, label: 'A2+' }
];
```

### DTG Rates
```javascript
const DTG_FLAT_RATE = 350;    // ราคามาตรฐาน
const DTG_LARGE_RATE = 450;   // พื้นที่ใหญ่ (>30×40)
```

### Clustering
```javascript
const CLUSTER_DISTANCE = 50;  // pixels (~5 cm)
const PIXELS_TO_CM = 0.06;    // conversion ratio
```

### Base Pricing
```javascript
const BASE_PRICE = 290;
const SIZE_SURCHARGES = {
  '2XL': 40,
  '3XL': 60,
  '4XL': 80,
  '5XL': 100
};
```

---

## 🎯 Business Rules

### DTF Rules
1. **ระยะห่างระหว่าง Elements < 5 cm** → รวมเป็น cluster เดียว
2. **แต่ละ cluster คิดราคาแยก** ตาม tier ของขนาด
3. **Front และ Back เป็น cluster คนละชุด** (ไม่รวมกัน)
4. **ราคาขั้นต่ำ** = ฿290 (เสื้อ M, tier A7)

### DTG Rules
1. **คิดราคาเหมา** ไม่สนจำนวน elements
2. **2 ระดับราคา** ตามขนาดพื้นที่รวม
3. **พื้นที่ > 30×40 cm** = Large rate
4. **เหมาะสำหรับ full print** หรือ design ซับซ้อน

---

## 🔄 Workflow

### User Journey
```
1. เลือกสินค้า (เสื้อ, สี, ไซส์)
2. เลือกเทคนิค (DTF/DTG)
3. เพิ่ม elements ลงพื้นที่ออกแบบ
4. ระบบคำนวณ clusters อัตโนมัติ
5. แสดง visualization บน canvas (DTF)
6. แสดง price breakdown
7. อัปเดตราคารวม real-time
```

### Calculation Flow
```
elements[] → clusterElements() → clusters[]
           → getClusterBoundingBox() → bbox[]
           → getPriceTier() → tier[]
           → calculatePrice() → totalPrice
```

---

## 📋 Use Cases

### Case 1: Small Logo (DTF)
```
- Single logo 8×8 cm
- Tier A7 → +฿0
- Total: ฿290
```

### Case 2: Multi-position Design (DTF)
```
- Front logo 12×12 cm → Tier A6 → +฿50
- Back text 15×10 cm → Tier A6 → +฿50
- Total: ฿390
```

### Case 3: Complex Design (DTF)
```
- Logo + Brand (รวมกัน) 18×15 cm → Tier A5 → +฿100
- Bottom text 10×5 cm → Tier A7 → +฿0
- Back graphic 22×25 cm → Tier A4 → +฿200
- Total: ฿590
```

### Case 4: Full Print (DTG)
```
- Large all-over print 35×42 cm
- DTG Large → +฿160
- Total: ฿450
```

---

## 🚨 Edge Cases

### 1. Elements นอกพื้นที่พิมพ์
- **ปัจจุบัน**: ยังคำนวณปกติ
- **ควรทำ**: แสดง warning หรือไม่นับรวม

### 2. Cluster ใหญ่เกิน A2
- **ปัจจุบัน**: คิดราคา tier A2+ (สูงสุด)
- **ควรทำ**: แสดง warning ว่าอาจพิมพ์ไม่ได้

### 3. DTF vs DTG เลือกอัตโนมัติ
- **ควรทำ**: แนะนำเทคนิคที่คุ้มค่า
  ```
  if (DTF price > DTG price && area < 30×40) 
    → แนะนำเปลี่ยนเป็น DTG
  ```

### 4. Multiple Sides
- **ปัจจุบัน**: Front และ Back คำนวณแยกกัน
- **ถูกต้อง**: ตามความเป็นจริงของการสกรีน

---

## 🔮 Future Enhancements

### 1. Dynamic Clustering Distance
```javascript
// ปรับระยะตาม technique
const CLUSTER_DISTANCE = technique === 'dtf' ? 50 : 30;
```

### 2. Quantity Discounts
```javascript
if (quantity > 50) {
  discount = 10%; // ลดราคา 10%
}
```

### 3. Material Type Pricing
```javascript
const MATERIAL_SURCHARGE = {
  'cotton': 0,
  'polyester': 20,
  'blend': 10
};
```

### 4. Express Printing
```javascript
const EXPRESS_SURCHARGE = 50; // ด่วนพิเศษ +฿50
```

### 5. Export for Factory
```javascript
exportClusterData() {
  return {
    technique: 'dtf',
    clusters: [
      { position: 'front', size: '12×8', tier: 'A6' },
      { position: 'back', size: '20×15', tier: 'A5' }
    ],
    totalPrice: 440
  }
}
```

---

## 📚 References

### Screen Printing Standards
- **A-Series Paper Sizes** (ISO 216)
- **Print Area Guidelines** (Industry Standard)
- **DTF vs DTG Comparison** (Printing Technology)

### Implementation Files
- `/src/app/designer/DesignerClient.tsx` - Main component
- Lines 306-425 - Pricing configuration & algorithms
- Lines 376-470 - Clustering & calculation functions

---

## 📝 Notes

### การปรับค่าให้แม่นยำ
```javascript
// ต้องวัดจริงจากโรงงาน/เครื่องพิมพ์
const PIXELS_TO_CM = 0.06;  // ⚠️ ปรับตามจริง
const CLUSTER_DISTANCE = 50; // ⚠️ ปรับตามมาตรฐานโรงงาน
```

### Validation Points
1. ขนาดพื้นที่พิมพ์สูงสุด
2. ขนาดต่ำสุดที่พิมพ์ได้
3. ระยะห่างระหว่างจุดสกรีน
4. ราคาตาม tier ถูกต้องตามโรงงาน

---

## ✅ Checklist for Production

- [ ] ทดสอบกับ design จริง
- [ ] ปรับค่า PIXELS_TO_CM ให้แม่นยำ
- [ ] ยืนยันราคากับโรงงาน
- [ ] เพิ่ม validation
- [ ] ทดสอบ edge cases
- [ ] เพิ่ม error handling
- [ ] สร้าง export function
- [ ] เพิ่ม analytics tracking

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Author**: POD Design System Team

