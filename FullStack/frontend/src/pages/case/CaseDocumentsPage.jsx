import React from 'react';
import { FileText, Download, Trash2, UploadCloud } from 'lucide-react';

const CaseDocumentsPage = () => {
  // بيانات تجريبية للملفات المرفوعة
  const docs = [
    { name: 'عقد التوكيل الرسمي.pdf', size: '1.2 MB', date: '2026-04-10' },
    { name: 'صور الأدلة الجنائية.zip', size: '15.5 MB', date: '2026-04-12' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <main className="max-w-6xl mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-black text-black italic">Case <span className="text-yellow-500">Documents</span></h1>
            {/* زرار رفع ملف جديد */}
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:text-black transition-all">
              <UploadCloud size={20}/> Upload New
            </button>
          </div>

          {/* جدول عرض المستندات */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 text-xs font-black uppercase text-gray-400">File Name</th>
                  <th className="py-4 text-xs font-black uppercase text-gray-400">Size</th>
                  <th className="py-4 text-xs font-black uppercase text-gray-400">Upload Date</th>
                  <th className="py-4 text-xs font-black uppercase text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {docs.map((doc, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-5 font-bold flex items-center gap-3"><FileText className="text-yellow-500" size={18}/> {doc.name}</td>
                    <td className="py-5 text-gray-400 font-bold text-sm">{doc.size}</td>
                    <td className="py-5 text-gray-400 font-bold text-sm">{doc.date}</td>
                    <td className="py-5 text-right">
                      <button className="p-2 text-black hover:bg-yellow-500 rounded-lg mr-2 transition-all"><Download size={16}/></button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDocumentsPage;
