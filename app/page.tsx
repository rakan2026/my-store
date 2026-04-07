'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface App {
  id: number;
  name: string;
  version: string;
  description: string;
  icon: string;
  category: string;
  downloadUrl: string;
  status: 'working' | 'revoked';
  isHot: boolean;
}

export default function Home() {
  const [apps, setApps] = useState<App[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/apps.json')
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch(err => console.error("Error loading apps:", err));
  }, []);

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 font-[sans-serif] text-right" dir="rtl">
      
      {/* هيدر المتجر */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-black text-blue-600">RAKAN PLUS</h1>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 text-xl">👤</div>
        </div>
      </header>

      {/* شريط التنبيهات المتصل بـ apps.json */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden shadow-inner">
        <div className="animate-pulse text-center font-bold text-sm">
           ✅ جميع الشهادات تعمل الآن | 🚀 متجر راكان بلس المطور
        </div>
      </div>

      {/* البانر الرئيسي - ستايل أبيض فخم */}
      <div className="max-w-6xl mx-auto px-6 mt-10 mb-12">
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">إصدار 2026 الحصري</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 leading-tight">متجرك، <br/> <span className="text-blue-600">عالمك الخاص.</span></h2>
            <p className="text-gray-500 max-w-sm text-lg mb-8">الوصول الفوري لأقوى تطبيقات البلس، الألعاب المعدلة، والشهادات المستقرة.</p>
            <div className="flex gap-4">
               <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-transform active:scale-95">تفعيل الاشتراك</button>
               <button className="bg-gray-50 text-gray-600 px-8 py-3 rounded-2xl font-bold border border-gray-100">استكشاف المزيد</button>
            </div>
          </div>
        </div>
      </div>

      {/* البحث */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <input
          type="text"
          placeholder="ابحث عن تطبيقك..."
          className="w-full p-5 rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* شبكة التطبيقات */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
            
            {app.isHot && (
              <div className="absolute top-4 left-4 bg-red-50 text-red-600 text-[10px] font-black px-2 py-1 rounded-lg border border-red-100 animate-bounce">
                HOT 🔥
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl border border-gray-100">
                {app.icon}
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-lg font-bold text-gray-900 leading-none mb-1">{app.name}</h3><span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">{app.version}</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs mb-6 h-8 overflow-hidden">{app.description}</p>

            <div className="flex gap-2">
              <Link 
                href={app.downloadUrl}
                className={`flex-[2] text-center py-3 rounded-xl font-bold text-sm transition-all ${
                  app.status === 'working' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-red-50 text-red-300 cursor-not-allowed'
                }`}
              >
                {app.status === 'working' ? 'تثبيت' : 'متوقف'}
              </Link>
              <Link href="#" className="flex-1 text-center py-3 bg-gray-50 text-gray-400 rounded-xl font-bold text-sm border border-gray-100">
                تفاصيل
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}