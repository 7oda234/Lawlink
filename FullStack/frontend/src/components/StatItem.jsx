// ═══════════════════════════════════════════════════════════════════════════════════
// 📊 مكون عرض الإحصائيات - Statistics Display Component
// ═══════════════════════════════════════════════════════════════════════════════════
// عرض قيمة أحصائية للشركة (100+, 500+) مع وصف لها
// Display key statistics with labels (e.g., 100+ Lawyers, 500+ Clients)
// ────────────────────────────────────────────────────────════════════════════════════

// 📌 Props: label (الوصف التوضيحي), value (القيمة الرقمية)
const StatItem = ({ label, value }) => (
    <div className="stat-item">
      <h2 className="stat-value">{value}</h2>
      <p className="stat-label">{label}</p>
    </div>
);
export default StatItem;
