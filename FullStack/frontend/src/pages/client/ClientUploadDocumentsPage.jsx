import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, FileText, X, CheckCircle, Shield } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { useTheme } from '../../context/ThemeContext';
import dataService from '../../services/DataService';
import "../../styles/client/ClientBase.css"; // Global Client Styles

const ClientUploadDocumentsPage = () => {
  const { language } = useLanguage();
  const { mode } = useTheme();
  const { caseId } = useParams();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const isRTL = language === 'ar' || language === 'eg';
  const isDark = mode === 'dark';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus(null);
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    if (!caseId) {
      setErrorMessage('No case ID found. Please access this page from a case details route.');
      return;
    }

    setUploading(true);
    setUploadStatus(null);
    setErrorMessage('');

    try {
      const userId = localStorage.getItem('userId');
      const formData = new FormData();
      formData.append('document_file', file);
      formData.append('userId', userId || '');
      formData.append('caseId', caseId);

      const response = await dataService.documents.upload(formData);
      if (response.data?.ok) {
        setUploadStatus('success');
        setFile(null);
      } else {
        setErrorMessage(response.data?.message || 'Upload failed.');
        setUploadStatus('error');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Upload failed.');
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const content = {
    en: {
      title: "Upload Case Documents",
      subtitle: "Securely add files to your legal case folder.",
      dropzone: "Click to upload or drag and drop",
      support: "Supports PDF, DOC, DOCX, TXT, XLS, PPT, CSV, JPG, PNG, GIF",
      btnUpload: "Upload to Case",
      btnCancel: "Remove",
      success: "Document uploaded successfully and stored in the case record.",
      securityNote: "All documents are securely uploaded and metadata is saved to the LawLink database."
    },
    eg: {
      title: "رفع مستندات القضية",
      subtitle: "أضف ملفاتك بأمان إلى مجلد القضية الخاص بك.",
      dropzone: "اضغط للرفع أو قم بسحب وإفلات الملف هنا",
      support: "يدعم PDF، DOC، DOCX، TXT، XLS، PPT، CSV، JPG، PNG، GIF",
      btnUpload: "رفع إلى القضية",
      btnCancel: "إزالة",
      success: "تم رفع المستند بنجاح وتسجيله في سجل القضية.",
      securityNote: "يتم رفع جميع المستندات بأمان ويتم حفظ بياناتها في قاعدة بيانات LawLink."
    }
  };

  const t = content[language] || content['eg'];

  return (
    <div 
      className={`client-page-wrapper ${isDark ? 'dark-mode' : 'light-mode'}`} 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <main className="client-card">
        {/* Header Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="ai-icon-wrapper">
            <Upload />
          </div>
          <h1 className="client-h1 italic tracking-tight">{t.title}</h1>
          <p className="client-subtitle font-bold">{t.subtitle}</p>
        </div>

        <div className="space-y-8">
          {/* Upload Area */}
          {!file ? (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all border-slate-300 dark:border-white/10 hover:border-yellow-500 bg-slate-50 dark:bg-slate-950">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-4 text-yellow-500" />
                <p className="mb-2 text-sm font-black italic">{t.dropzone}</p>
                <p className="text-xs text-gray-500">{t.support}</p>
              </div>
              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx,.ppt,.pptx,.csv,.jpg,.jpeg,.png,.gif" />
            </label>
          ) : (
            /* Selected File Preview using ClientBase styles */
            <div className="client-banner !justify-between !opacity-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <FileText className="text-slate-950" size={24} />
                </div>
                <div>
                  <p className="font-black text-sm truncate max-w-[200px]">{file.name}</p>
                  <p className="text-[10px] uppercase font-bold opacity-50">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => {setFile(null); setUploadStatus(null);}} 
                className="p-2 hover:bg-red-500/10 text-red-500 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="client-btn-primary italic"
          >
            {uploading ? (
              <div className="spinner" />
            ) : (
              t.btnUpload
            )}
          </button>

          {errorMessage && (
            <div className="client-banner !bg-red-50 !border-red-200 !text-red-700 !opacity-100">
              <p className="text-sm font-bold">{errorMessage}</p>
            </div>
          )}

          {/* Success Message */}
          {uploadStatus === 'success' && (
            <div className="client-banner !bg-green-500/10 !border-green-500/20 !text-green-500 !opacity-100">
              <CheckCircle size={24} />
              <p className="text-sm font-bold">{t.success}</p>
            </div>
          )}

          {/* Security Notice */}
          <div className="client-banner">
            <Shield className="text-yellow-500 shrink-0" size={18} />
            <p className="client-banner-text leading-relaxed">
              {t.securityNote}
            </p>
          </div>
        </div>
      </main>

      {/* Branding Footer */}
      <p className="mt-8 text-center client-banner-text !opacity-40">
        LawLink Secure File Management • BIS AASTMT
      </p>
    </div>
  );
};

export default ClientUploadDocumentsPage;
