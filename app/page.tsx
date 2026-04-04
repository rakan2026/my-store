"use client";

import React, { useState, useEffect } from 'react';

interface AppItem {
  id: number;
  name: string;
  version: string;
  description: string;
  icon: string;
  category: string;
  downloadUrl: string;
  status: 'working' | 'revoked'; // إضافة حالة الشهادة
}

export default function Home() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [filteredApps, setFilteredApps] = useState<AppItem[]>([]);
  const [activeTab, setActiveTab] = useState('الكل');

  useEffect(() => {
    fetch('/apps.json')
      .then(res => res.json())
      .then(data => {
        setApps(data);
        setFilteredApps(data);
      });
  }, []);

  const filterCategory = (category: string) => {
    setActiveTab(category);
    if (category === 'الكل') {
      setFilteredApps(apps);
    } else {
      setFilteredApps(apps.filter(app => app.category === category));
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]" dir="rtl">
      
      {/* هيدر */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg text-white text-xl">🚀</div>
            <h1 className="text-2xl font-black italic">راكان <span className="text-blue-600 font-bold">PLUS</span></h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-4">متجرك المفضل</h2>
        <p className="text-gray-500 font-medium">أفضل تطبيقات البلس والألعاب في مكان واحد</p>
      </section>

      {/* الأقسام */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {['الكل', 'سوشيال ميديا', 'ألعاب', 'أدوات'].map((cat) => (
          <button 
            key={cat}
            onClick={() => filterCategory(cat)}
            className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all border ${
              activeTab === cat 
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
              : 'bg-white text-gray-500 border-gray-100 hover:border-blue-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* عرض التطبيقات */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => (
            <div key={app.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-gray-50">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{app.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-gray-400">{app.version}</span>
                    {/* عرض حالة الشهادة */}
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                      <div className={`w-2 h-2 rounded-full ${app.status === 'working' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                      <span className="text-[10px] font-bold text-gray-500">
                        {app.status === 'working' ? 'شغالة' : 'مقفلة'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12 overflow-hidden">{app.description}</p><div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-blue-600 text-[10px] font-black bg-blue-50 px-3 py-1 rounded-full">{app.category}</span>
                <button 
  onClick={() => {
    if(app.status === 'working') {
      alert('سيتم بدء التثبيت، اضغط "تثبيت" في النافذة القادمة');
      window.location.href = app.downloadUrl;
    }
  }}
  className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 ${
    app.status === 'working' 
    ? 'bg-blue-600 text-white hover:bg-[#1d1d1f]' 
    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
  }`}
>
  {app.status === 'working' ? 'تثبيت الآن' : 'غير متوفر'}
</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* زر الواتساب العائم */}
      <a 
        href="https://wa.me/9665XXXXXXXX" 
        target="_blank"
        className="fixed bottom-8 left-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-[100] flex items-center justify-center group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold px-0 group-hover:px-2">دعم فني</span>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.52c1.589.943 3.139 1.467 4.788 1.468 5.421 0 9.832-4.41 9.835-9.832.001-2.628-1.023-5.097-2.883-6.958-1.859-1.862-4.329-2.885-6.958-2.886-5.423 0-9.833 4.41-9.836 9.833-.001 1.745.47 3.447 1.36 4.93l-.97 3.545 3.664-.96z"/></svg>
      </a>

    </div>
  );
}