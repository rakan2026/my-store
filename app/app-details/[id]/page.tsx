"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AppDetails() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [app, setApp] = useState<any>(null);

  useEffect(() => {
    fetch('/apps.json')
      .then(res => res.json())
      .then(data => {
        const foundApp = data.find((a: any) => a.id === Number(id));
        setApp(foundApp);
      });
  }, [id]);

  if (!app) return <div className="text-center py-20 font-bold">جاري تحميل بيانات التطبيق...</div>;

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      {/* هيدر بسيط للرجوع */}
      <div className="p-6 max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-2">
          <span>{"<"}</span> رجوع للمتجر
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-gray-50 p-8 rounded-[3rem]">
          <div className="text-8xl shadow-sm">{app.icon}</div>
          <div className="text-center md:text-right">
            <h1 className="text-4xl font-black mb-2">{app.name}</h1>
            <p className="text-gray-400 mb-6">{app.category} • {app.version}</p>
            <button 
              onClick={() => {
                alert('سيتم بدء التثبيت الآن...');
                window.location.href = app.downloadUrl;
              }}
              className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-lg active:scale-95"
            >
              تثبيت الآن
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">عن التطبيق</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{app.description}</p>
        </div>
        
        <div className="mt-12 mb-20 bg-gray-50 p-16 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
           <div className="text-4xl mb-4">📸</div>
           <p className="text-gray-400 font-bold">معرض الصور بيتوفر قريباً في تحديث راكان بلس القادم!</p>
        </div>
      </div>
    </div>
  );
}