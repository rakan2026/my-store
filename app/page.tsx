// app/page.tsx
"use client"; // أضفنا هذه الكلمة لتفعيل التفاعل والضغطات

import React, { useState, useEffect } from 'react';

interface AppItem {
  id: number;
  name: string;
  version: string;
  description: string;
  icon: string;
  category: string;
  downloadUrl: string;
}

export default function Home() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [filteredApps, setFilteredApps] = useState<AppItem[]>([]);
  const [activeTab, setActiveTab] = useState('الكل');

  // جلب البيانات عند فتح الصفحة
  useEffect(() => {
    fetch('/apps.json')
      .then(res => res.json())
      .then(data => {
        setApps(data);
        setFilteredApps(data);
      });
  }, []);

  // وظيفة الفلترة
  const filterCategory = (category: string) => {
    setActiveTab(category);
    if (category === 'الكل') {
      setFilteredApps(apps);
    } else {
      const filtered = apps.filter(app => app.category === category);
      setFilteredApps(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]" dir="rtl">
      
      {/* هيدر شفاف */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 text-white text-xl">🚀</div>
            <h1 className="text-2xl font-black">راكان <span className="text-blue-600">بلس</span></h1>
          </div>
        </div>
      </header>

      {/* الهيرو (العنوان الرئيسي) */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <h2 className="text-5xl font-black mb-4">متجرك المفضل للتطبيقات</h2>
        <p className="text-gray-500">اختر القسم اللي يناسبك وحمل بضغطة زر</p>
      </section>

      {/* شريط الأقسام التفاعلي */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {['الكل', 'سوشيال ميديا', 'ألعاب', 'أدوات'].map((cat) => (
          <button 
            key={cat}
            onClick={() => filterCategory(cat)}
            className={`whitespace-nowrap px-8 py-3 rounded-full font-bold text-sm transition-all shadow-sm border ${
              activeTab === cat 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-gray-500 border-gray-200 hover:border-blue-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* شبكة التطبيقات */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => (
            <div key={app.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-5xl shadow-inner border border-gray-100 italic">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{app.name}</h3>
                  <span className="text-xs font-mono text-gray-400">{app.version}</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12 overflow-hidden">{app.description}</p>
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                  {app.category}
                </span>
                <a href={app.downloadUrl} className="bg-[#1d1d1f] text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-gray-200">
                  تحميل
                </a></div>
            </div>
          ))}
        </div>
        
        {/* رسالة في حال عدم وجود تطبيقات في القسم */}
        {filteredApps.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl font-bold">قريباً.. بنضيف تطبيقات في هذا القسم 😎</p>
          </div>
        )}
      </main>

    </div>
  );
}