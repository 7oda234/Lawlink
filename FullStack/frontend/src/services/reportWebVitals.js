// ═══════════════════════════════════════════════════════════════════════════════════
// report Web Vitals
// ═══════════════════════════════════════════════════════════════════════════════════
// أداء التطبيق - Performance reporter helper
// Web vitals helper to measure app performance.
// ───────────────────────────────────────────────────────────────────────────────────
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
