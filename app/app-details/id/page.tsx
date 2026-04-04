"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AppDetails() {
  const { id } = useParams();
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

  if (!app) return <div className="text-center py-20">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      {/* هيدر بسيط للرجوع */}
      <div className="p-6">
        <button onClick={() => router.back()} className="text-blue-600 font-bold">{"<"} رجوع</button>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-10">
          <div className="text-6xl bg-gray-100 p-6 rounded-[2rem]">{app.icon}</div>
          <div>
            <h1 className="text-3xl font-black">{app.name}</h1>
            <p className="text-gray-400">{app.category} • {app.version}</p>
            <button 
              onClick={() => {
                alert('بدء التثبيت...');
                window.location.href = app.downloadUrl;
              }}
              className="mt-4 bg-blue-600 text-white px-10 py-2 rounded-full font-bold"
            >
              تثبيت
            </button>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-xl font-bold mb-4">الوصف</h2>
          <p className="text-gray-600 leading-relaxed">{app.description}</p>
        </div>
        
        {/* هنا مستقبلاً بنضيف معرض الصور */}
        <div className="mt-10 bg-gray-50 p-10 rounded-3xl text-center text-gray-400">
          معرض الصور (قريباً)
        </div>
      </div>
    </div>
  );
}