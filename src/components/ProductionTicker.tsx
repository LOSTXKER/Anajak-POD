'use client';

import { useEffect, useState } from 'react';
import { Package, Truck, Printer, CheckCircle2, Clock } from 'lucide-react';

interface ProductionItem {
  id: number;
  type: 'order' | 'printing' | 'shipped' | 'completed';
  customer: string;
  location: string;
  product: string;
  quantity: number;
  time: string;
}

const productionData: ProductionItem[] = [
  { id: 1, type: 'order', customer: 'คุณ ส***', location: 'กรุงเทพฯ', product: 'เสื้อยืดคอกลม', quantity: 5, time: '2 นาที' },
  { id: 2, type: 'printing', customer: 'คุณ ม***', location: 'นนทบุรี', product: 'Hoodie', quantity: 2, time: '5 นาที' },
  { id: 3, type: 'shipped', customer: 'คุณ พ***', location: 'เชียงใหม่', product: 'เสื้อทีม', quantity: 30, time: '12 นาที' },
  { id: 4, type: 'completed', customer: 'บริษัท A***', location: 'ชลบุรี', product: 'เสื้อยูนิฟอร์ม', quantity: 50, time: '18 นาที' },
  { id: 5, type: 'order', customer: 'คุณ ว***', location: 'ภูเก็ต', product: 'กระเป๋าผ้า', quantity: 10, time: '25 นาที' },
  { id: 6, type: 'printing', customer: 'คุณ จ***', location: 'ขอนแก่น', product: 'เสื้อ Oversize', quantity: 3, time: '32 นาที' },
  { id: 7, type: 'shipped', customer: 'คุณ น***', location: 'สงขลา', product: 'เสื้อรุ่น', quantity: 120, time: '45 นาที' },
  { id: 8, type: 'order', customer: 'คุณ ก***', location: 'ปทุมธานี', product: 'เสื้อยืด Premium', quantity: 8, time: '58 นาที' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'order':
      return <Package className="w-3 h-3" />;
    case 'printing':
      return <Printer className="w-3 h-3" />;
    case 'shipped':
      return <Truck className="w-3 h-3" />;
    case 'completed':
      return <CheckCircle2 className="w-3 h-3" />;
    default:
      return <Package className="w-3 h-3" />;
  }
};

const getStatusText = (type: string) => {
  switch (type) {
    case 'order':
      return 'สั่งซื้อใหม่';
    case 'printing':
      return 'กำลังผลิต';
    case 'shipped':
      return 'จัดส่งแล้ว';
    case 'completed':
      return 'ส่งถึงแล้ว';
    default:
      return '';
  }
};

const getStatusColor = (type: string) => {
  switch (type) {
    case 'order':
      return 'bg-blue-500/90';
    case 'printing':
      return 'bg-amber-500/90';
    case 'shipped':
      return 'bg-violet-500/90';
    case 'completed':
      return 'bg-emerald-500/90';
    default:
      return 'bg-slate-500/90';
  }
};

export default function ProductionTicker() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2.5">
        <div className="h-5" />
      </div>
    );
  }

  // Duplicate items multiple times for seamless infinite loop
  const items = [...productionData, ...productionData, ...productionData, ...productionData];

  return (
    <>
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .ticker-track {
          animation: ticker 35s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Gradient overlays for seamless fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        
        <div className="py-2.5">
          <div className="ticker-track flex" style={{ width: 'max-content' }}>
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center gap-2 px-5 whitespace-nowrap text-[13px]"
              >
                {/* Status badge */}
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold text-white ${getStatusColor(item.type)}`}>
                  {getIcon(item.type)}
                  <span>{getStatusText(item.type)}</span>
                </div>
                
                {/* Customer & Details */}
                <span className="text-slate-300">
                  <span className="text-white font-medium">{item.customer}</span>
                  <span className="text-slate-500 mx-1.5">•</span>
                  <span className="text-slate-400">{item.location}</span>
                  <span className="text-slate-500 mx-1.5">•</span>
                  <span className="text-ci-yellow font-medium">{item.product}</span>
                  <span className="text-slate-400 ml-1">{item.quantity} ชิ้น</span>
                </span>
                
                {/* Time */}
                <span className="flex items-center gap-1 text-slate-500 text-xs">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Spacer to push content down */}
      <div className="h-10" />
    </>
  );
}
