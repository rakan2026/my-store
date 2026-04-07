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
          <h1 className="text-2xl font-black text-blue-600 tracking-tighter">RAKAN PLUS</h1>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 text-xl shadow-inner">👤</div>
        </div>
      </header>

      {/* شريط التنبيهات */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden shadow-inner">
        <div className="animate-pulse text-center font-bold text-sm">
           ✅ جميع الشهادات تعمل الآن | 🚀 متجر راكان بلس المطور
        </div>
      </div>

      {/* البانر الرئيسي */}
      <div className="max-w-6xl mx-auto px-6 mt-10 mb-12">
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black mb-4 inline-block uppercase tracking-wider">إصدار 2026 الحصري</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 leading-tight">متجرك، <br/> <span className="text-blue-600">عالمك الخاص.</span></h2>
            <p className="text-gray-500 max-w-sm text-lg mb-8 font-medium">الوصول الفوري لأقوى تطبيقات البلس، الألعاب المعدلة، والشهادات المستقرة.</p>
            <div className="flex gap-4">
               <button className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-blue-100 transition-transform active:scale-95">تفعيل الاشتراك</button>
               <button className="bg-gray-50 text-gray-600 px-8 py-3.5 rounded-2xl font-bold border border-gray-100">استكشاف المزيد</button>
            </div>
          </div>
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>

      {/* مربع البحث */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن تطبيقك..."
            className="w-full p-5 pr-14 rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">🔍</span>
        </div>
      </div>

      {/* قائمة التطبيقات */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative group">
            
            {app.isHot && (
              <div className="absolute top-4 left-4 bg-red-50 text-red-600 text-[9px] font-black px-2.5 py-1 rounded-lg border border-red-100 z-10 animate-bounce">
                HOT 🔥
              </div>
            )}<div className="flex items-center gap-4 mb-6 flex-row-reverse">
              {/* هنا تعديل عرض الصورة بدل الإيموجي */}
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={app.icon} 
                  alt={app.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // في حال ما لقيت الصورة، يرجع يحط إيموجي كخيار احتياطي
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=App';
                  }}
                />
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-lg font-bold text-gray-900 leading-none mb-2">{app.name}</h3>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{app.version}</span>
              </div>
            </div>

            <p className="text-gray-400 text-[13px] mb-8 font-medium leading-relaxed h-10 overflow-hidden text-right">{app.description}</p>

            <div className="flex gap-2">
              <Link 
                href={app.downloadUrl}
                className={`flex-[2] text-center py-3.5 rounded-xl font-black text-sm transition-all active:scale-95 shadow-sm ${
                  app.status === 'working' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
                  : 'bg-red-50 text-red-300 cursor-not-allowed border border-red-100 shadow-none'
                }`}
              >
                {app.status === 'working' ? 'تثبيت' : 'متوقف'}
              </Link>
              <Link href={`/details/${app.id}`} className="flex-1 text-center py-3.5 bg-gray-50 text-gray-400 rounded-xl font-bold text-sm border border-gray-100 hover:bg-gray-100 transition-all">
                تفاصيل
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}