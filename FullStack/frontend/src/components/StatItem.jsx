// ═══════════════════════════════════════════════════════════════════════════════════
// 📊 مكون عرض الإحصائيات - Statistics Display Component
// ═══════════════════════════════════════════════════════════════════════════════════
// عرض قيمة أحصائية للشركة (100+, 500+) مع وصف لها
// Display key statistics with labels (e.g., 100+ Lawyers, 500+ Clients)
// ────────────────────────────────────────────────────────════════════════════════════

// 📌 Props: label (الوصف التوضيحي), value (القيمة الرقمية)
const StatItem = ({ label, value }) => (
    {/* 📋 حاوية إحصائية - Statistics container */}
    <div className="stat-item">
      {/* 📊 قيمة الإحصائية بخط غليظ - Statistics value in large font */}
      <h2 className="stat-value">{value}</h2>
      {/* 📁 وصف الإحصائية - Statistics label description */}
      <p className="stat-label">{label}</p>
    </div>
);
export default StatItem;
