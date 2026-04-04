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
}

export default function Home() {
  const [apps, setApps] = useState<App[]>([]);
  const [filteredApps, setFilteredApps] = useState<App[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/apps.json')
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setFilteredApps(data);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = apps.filter((app) =>
      app.name.toLowerCase().includes(query)
    );
    setFilteredApps(filtered);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] pb-20 font-[sans-serif]" dir="rtl">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-blue-600 tracking-tighter">راكان PLUS</h1>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">👤</div>
        </div>
      </header>

      {/* شريط الأخبار المتحرك */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block px-4 font-bold text-sm">
          🔥 تطبيقات اليوتيوب والواتساب تعمل بكفاءة | ✅ جميع الشهادات محدثة لليوم | 🚀 أهلاً بك في متجر راكان
        </div>
      </div>

      {/* بانر راكان بلس الفخم */}
      <div className="max-w-6xl mx-auto px-6 mt-8 mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-3">متجر راكان 🚀</h2>
            <p className="text-blue-100 max-w-xs text-lg font-medium opacity-90">أفضل تطبيقات البلس والشهادات المستقرة في مكان واحد.</p>
            <button className="mt-8 bg-white text-blue-600 px-10 py-3.5 rounded-2xl font-black hover:shadow-2xl transition-all active:scale-95 shadow-lg">
              اشترك الآن
            </button>
          </div>
          <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-5%] w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* مربع البحث */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="relative group">
          <input
            type="text"
            placeholder="ابحث عن تطبيقك المفضل..."
            className="w-full p-6 pr-14 rounded-[2rem] border-none bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] focus:ring-2 focus:ring-blue-500 transition-all text-lg outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl grayscale group-focus-within:grayscale-0 transition-all">🔍</span>
        </div>
      </div>

      {/* عرض التطبيقات */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => (
            <div key={app.id} className="relative bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden">
              
              {/* تاق الترند (يظهر لأول تطبيقين) */}
              {app.id <= 2 && (<div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black px-4 py-2 rounded-bl-[1.5rem] shadow-lg z-10 animate-pulse">
                  HOT 🔥
                </div>
              )}

              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-inner group-hover:rotate-6 transition-transform">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{app.name}</h3>
                  <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{app.version}</span>
                </div>
              </div>

              <p className="text-gray-500 mb-8 line-clamp-2 text-sm font-medium leading-relaxed">
                {app.description}
              </p>

              <div className="flex items-center justify-between gap-4">
                <Link 
                  href={`/app-details/${app.id}`}
                  className="flex-1 text-center py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold hover:bg-gray-100 transition-colors"
                >
                  التفاصيل
                </Link>
                <Link 
                  href={app.downloadUrl}
                  className={`flex-[2] text-center py-4 rounded-2xl font-black shadow-md transition-all active:scale-95 ${
                    app.status === 'working' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' 
                    : 'bg-red-50 text-red-400 cursor-not-allowed'
                  }`}
                >
                  {app.status === 'working' ? 'تثبيت الآن' : 'غير متوفر'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الفوتر */}
      <footer className="mt-24 border-t border-gray-100 py-16 text-center">
        <div className="flex justify-center gap-8 mb-8 text-3xl">
          <span className="cursor-pointer hover:scale-125 transition-transform">🐦</span>
          <span className="cursor-pointer hover:scale-125 transition-transform">📸</span>
          <span className="cursor-pointer hover:scale-125 transition-transform">💬</span>
        </div>
        <p className="text-gray-400 font-bold text-lg">
          جميع الحقوق محفوظة لـ <span className="text-blue-600">راكان بلس</span> © 2026
        </p>
      </footer>

      {/* زر الواتساب العايم */}
      <a 
        href="https://wa.me/9665XXXXXXXX" 
        target="_blank" 
        className="fixed bottom-8 left-8 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all z-[100]"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </main>
  );
}