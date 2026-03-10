'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Copy, Check, AlertCircle, ExternalLink, RefreshCw, ShieldCheck, Key } from 'lucide-react';
import { connectPlatform, disconnectPlatform } from '@/app/actions/integrations';

interface Integration {
  id: string;
  platform: string;
  shopName: string | null;
  isConnected: boolean;
}

interface IntegrationsClientProps {
  initialIntegrations: Integration[];
}

export default function IntegrationsClient({ initialIntegrations }: IntegrationsClientProps) {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>(
    initialIntegrations.filter(i => i.isConnected).map(i => i.platform.toLowerCase())
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [apiKey, setApiKey] = useState('PUBLIC_KEY_EXAMPLE_123456');
  const [apiSecret, setApiSecret] = useState('SECRET_KEY_EXAMPLE_123456');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const platforms: Array<{ id: string; name: string; description: string; logo: string; color: string; stats: { products: number; orders: number } | null; isPopular: boolean }> = [
    {
      id: 'shopee',
      name: 'Shopee',
      description: 'ซิงค์สินค้าและออเดอร์อัตโนมัติ',
      logo: '🛍️',
      color: 'from-orange-500 to-red-500',
      stats: null,
      isPopular: true
    },
    {
      id: 'lazada',
      name: 'Lazada',
      description: 'จัดการร้านค้า Lazada Seller Center',
      logo: '🏪',
      color: 'from-blue-600 to-purple-600',
      stats: null,
      isPopular: true
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      description: 'เชื่อมต่อ TikTok Shop Seller',
      logo: '🎵',
      color: 'from-black to-gray-800',
      stats: null,
      isPopular: true
    },
    {
      id: 'facebook',
      name: 'Facebook Shop',
      description: 'ขายผ่าน Facebook Page & Shop',
      logo: '📘',
      color: 'from-blue-500 to-blue-700',
      stats: null,
      isPopular: false
    },
    {
      id: 'line',
      name: 'LINE Shopping',
      description: 'MyShop & LINE Official Account',
      logo: '💬',
      color: 'from-green-400 to-green-600',
      stats: null,
      isPopular: false
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'WordPress Plugin for POD',
      logo: '🛒',
      color: 'from-purple-600 to-violet-800',
      stats: null,
      isPopular: false
    },
  ];

  const isConnected = (platformId: string) => connectedPlatforms.includes(platformId);

  const toggleConnection = async (platformId: string) => {
    const integration = initialIntegrations.find(i => i.platform.toLowerCase() === platformId);
    
    if (isConnected(platformId)) {
      if (integration) {
        const result = await disconnectPlatform(integration.id);
        if (result.error) { alert(result.error); return; }
      }
      setConnectedPlatforms(prev => prev.filter(id => id !== platformId));
    } else {
      const platformInfo = platforms.find(p => p.id === platformId);
      const result = await connectPlatform({
        platform: platformId.toUpperCase(),
        shopName: platformInfo?.name || platformId,
      });
      if (result.error) { alert(result.error); return; }
      setConnectedPlatforms(prev => [...prev, platformId]);
    }
  };

  return (
    <DashboardLayout 
      title="การเชื่อมต่อ (Integrations)"
      subtitle="เชื่อมต่อร้านค้าและแพลตฟอร์มต่างๆ เพื่อขยายช่องทางการขาย"
      showCreateButton={false}
    >
      <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-[80px] opacity-20 -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">เชื่อมต่อทุกช่องทางขายไว้ที่เดียว</h2>
              <p className="text-slate-400 text-lg max-w-xl mb-6 font-light">
                จัดการสินค้า สต็อก และออเดอร์จากทุกแพลตฟอร์มได้ง่ายๆ ผ่าน Anajak POD ระบบจะทำการซิงค์ข้อมูลอัตโนมัติแบบ Real-time
              </p>
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-2">
                   {platforms.slice(0, 4).map((p, i) => (
                     <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-lg shadow-lg">
                       {p.logo}
                     </div>
                   ))}
                 </div>
                 <span className="text-sm font-bold text-slate-300">+ อีกหลายแพลตฟอร์ม</span>
              </div>
            </div>
            <div className="hidden md:block">
               <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 w-64">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-300">สถานะระบบ</span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
                    <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                    <div className="h-2 bg-white/10 rounded-full w-5/6"></div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <p className="text-2xl font-bold text-emerald-400">100%</p>
                    <p className="text-xs text-slate-400">Uptime</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Active Integrations */}
        {connectedPlatforms.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 px-2">กำลังใช้งาน ({connectedPlatforms.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {platforms
                .filter(platform => isConnected(platform.id))
                .map((platform) => {
                  // Find integration data from DB if available
                  const integrationData = initialIntegrations.find(i => i.platform.toLowerCase() === platform.id);
                  
                  return (
                  <div
                    key={platform.id}
                    className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${platform.color}`}></div>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl shadow-inner">
                          {platform.logo}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            {platform.name}
                            <span className="w-2 h-2 bg-emerald-500 rounded-full" title="Online"></span>
                          </h4>
                          <p className="text-sm text-slate-500">
                            {integrationData?.shopName || 'เชื่อมต่อแล้ว'}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                         <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>

                    {platform.stats ? (
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                           <p className="text-xs font-bold text-slate-400 uppercase">สินค้าที่ซิงค์</p>
                           <p className="text-xl font-bold text-slate-800">{platform.stats.products}</p>
                        </div>
                        <div>
                           <p className="text-xs font-bold text-slate-400 uppercase">ออเดอร์</p>
                           <p className="text-xl font-bold text-slate-800">{platform.stats.orders}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6 text-center">
                        <p className="text-sm text-slate-500">พร้อมสำหรับการซิงค์ข้อมูล</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {/* Updated Button: Outline Slate */}
                      <button 
                        onClick={() => alert('กำลังพัฒนาฟีเจอร์การตั้งค่า')}
                        className="flex-1 py-2.5 text-sm font-bold text-slate-700 bg-white border-2 border-slate-100 hover:border-slate-200 rounded-xl transition-colors"
                      >
                        ตั้งค่า
                      </button>
                      {/* Updated Button: Soft Red */}
                      <button 
                        onClick={() => toggleConnection(platform.id)}
                        className="px-4 py-2.5 text-sm font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                      >
                        ตัดการเชื่อมต่อ
                      </button>
                    </div>
                  </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Available Platforms */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-6 px-2 mt-8">แพลตฟอร์มอื่นๆ ที่รองรับ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {platforms
              .filter(platform => !isConnected(platform.id))
              .map((platform) => (
                <div
                  key={platform.id}
                  className="bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {platform.logo}
                    </div>
                    {platform.isPopular && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{platform.name}</h4>
                  <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{platform.description}</p>
                  
                  {/* Updated Button: Solid Dark (Primary Action here is Connect) or maybe Blue? Let's use Dark for consistency with Primary Actions that are not 'Select' */}
                  <button 
                    onClick={() => toggleConnection(platform.id)}
                    className="w-full py-3 text-sm font-bold text-white bg-slate-900 hover:bg-ci-blue rounded-xl transition-colors shadow-lg shadow-slate-200"
                  >
                    เชื่อมต่อ
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Developer Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-100">
              <div className="flex items-center gap-3">
                 <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Key className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-slate-800">API Keys สำหรับนักพัฒนา</h2>
                    <p className="text-sm text-slate-500">ใช้เชื่อมต่อกับแอปพลิเคชันภายนอกหรือ Custom Integration</p>
                 </div>
              </div>
           </div>
           
           <div className="p-8 grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-xs font-bold text-slate-500 uppercase">Public Key</label>
                       <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <code className="flex-1 font-mono text-sm text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 truncate">
                          {showApiKey ? apiKey : 'PUBLIC_KEY_•••••••••••••'}
                       </code>
                       <button 
                          onClick={() => copyToClipboard(apiKey, 'pk')}
                          className="p-2 text-slate-400 hover:text-ci-blue hover:bg-white rounded-lg transition-colors"
                       >
                          {copiedKey === 'pk' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-xs font-bold text-slate-500 uppercase">Secret Key</label>
                       <div className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3" />
                          Private
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <code className="flex-1 font-mono text-sm text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 truncate">
                          {showApiSecret ? apiSecret : 'SECRET_KEY_•••••••••••••'}
                       </code>
                       <button 
                          onClick={() => setShowApiSecret(!showApiSecret)}
                          className="p-2 text-slate-400 hover:text-ci-blue hover:bg-white rounded-lg transition-colors"
                       >
                          {showApiSecret ? <ExternalLink className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                       </button>
                       <button 
                          onClick={() => copyToClipboard(apiSecret, 'sk')}
                          className="p-2 text-slate-400 hover:text-ci-blue hover:bg-white rounded-lg transition-colors"
                       >
                          {copiedKey === 'sk' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                 </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                 <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Documentation
                 </h4>
                 <p className="text-sm text-indigo-800/80 mb-4 leading-relaxed">
                    ดูคู่มือการใช้งาน API ของเราเพื่อเรียนรู้วิธีการเชื่อมต่อและตัวอย่าง Code ในภาษาต่างๆ (Node.js, Python, PHP)
                 </p>
                 <div className="flex gap-3">
                    {/* Updated Button: White Outline Style for secondary */}
                    <button 
                       onClick={() => window.open('https://docs.anajak.com/api', '_blank')}
                       className="px-4 py-2 bg-white text-indigo-600 font-bold text-sm rounded-xl shadow-sm hover:bg-indigo-50 transition-colors border border-indigo-100"
                    >
                       ดู API Docs
                    </button>
                    {/* Updated Button: Primary Color but matched to Indigo context */}
                    <button 
                       onClick={() => {
                         const newKey = 'pk_' + Math.random().toString(36).substring(2, 18);
                         const newSecret = 'sk_' + Math.random().toString(36).substring(2, 18);
                         setApiKey(newKey);
                         setApiSecret(newSecret);
                         setShowApiKey(true);
                         setShowApiSecret(true);
                       }}
                       className="px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-sm hover:bg-indigo-700 transition-colors"
                    >
                       Generate New Keys
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
