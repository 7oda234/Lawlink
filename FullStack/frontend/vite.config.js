// ═══════════════════════════════════════════════════════════════════════════════════
// 🟠 إعداد مـ Vite - Vite Configuration File
// ═══════════════════════════════════════════════════════════════════════════════════
// هذا الملف بل يعرف كيف يبآ Vite التطبيق عند التطوير
// It defines how Vite builds and runs the frontend application during development
// ─────────────────────────────────────────────────────────────────────────────────────

import { defineConfig } from 'vite'  // استيراد defineConfig من Vite - Import Vite config function
import react from '@vitejs/plugin-react'  // React plugin لـ Vite - React plugin for Vite
import tailwindcss from '@tailwindcss/vite'  // Tailwind CSS plugin لـ Vite - Tailwind CSS plugin for Vite

// 🟠 إعداد المشروع - Export Vite configuration
export default defineConfig({
  // 📊 مقولات الاستخدام - Plugins array
  plugins: [
    react(),  // فعل React plugin عع فهم JSX ودعم Hot Module Replacement
    tailwindcss(),  // فعل Tailwind plugin عع سمو CSS classes
  ],
  // ὚1 إعدادات الخادم التطوير - Development server settings
  server: {
    host: '0.0.0.0',  // الإذاعة علا جميع أجهزة النبِوة - Listen on all network interfaces
    port: 5173  // رقم بورت الخادم - Server port number
  }
})
