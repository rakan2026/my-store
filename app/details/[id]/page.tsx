'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function AppDetails() {
  const params = useParams();
  const [app, setApp] = useState<App | null>(null);

  useEffect(() => {
    fetch('/apps.json')
      .then((res) => res.json())
      .then((data: App[]) => {
        const foundApp = data.find((item) => item.id.toString() === params.id);
        setApp(foundApp || null);
      });
  }, [params.id]);

  if (!app) return <div className="text-center mt-20 font-bold">جاري تحميل التفاصيل...</div>;

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-10 text-right" dir="rtl">
      {/* هيدر بسيط للرجوع */}
      <header className="bg-white border-b border-gray-100 p-5 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-blue-600 font-black flex items-center gap-2">
            <span>‹</span> رجوع للمتجر
          </Link>
          <h1 className="text-lg font-black text-gray-900">تفاصيل التطبيق</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 mt-10">
        {/* كرت المعلومات الرئيسي */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 bg-gray-50 rounded-[2rem] p-1 border border-gray-100 shadow-inner mb-6">
              <img src={app.icon} alt={app.name} className="w-full h-full object-cover rounded-[1.8rem]" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">{app.name}</h2>
            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black border border-blue-100 mb-6">
              إصدار {app.version}
            </span>
            
            <p className="text-gray-500 leading-relaxed font-medium mb-10">
              {app.description}
            </p>

            <Link 
              href={app.downloadUrl}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg ${
                app.status === 'working' 
                ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700' 
                : 'bg-red-50 text-red-300 cursor-not-allowed border border-red-100'
              }`}
            >
              {app.status === 'working' ? 'تثبيت الآن' : 'التطبيق متوقف حالياً'}
            </Link>
          </div>
        </div>

        {/* كرت المميزات (ثابت لكل التطبيقات) */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black mb-6 text-gray-900 flex items-center gap-2">
            <span className="text-blue-600 text-2xl">★</span> مميزات النسخة
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-600 font-bold">
              <span className="text-green-500">✓</span> نسخة مستقرة ومجربة 100%
            </li>
            <li className="flex items-center gap-3 text-gray-600 font-bold">
              <span className="text-green-500">✓</span> تدعم آخر إصدار من نظام iOS
            </li>
            <li className="flex items-center gap-3 text-gray-600 font-bold">
              <span className="text-green-500">✓</span> بدون إعلانات مزعجة
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}