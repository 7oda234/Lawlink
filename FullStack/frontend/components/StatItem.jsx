const StatItem = ({ label, value }) => (
    <div className="stat-item">
<h2 className="stat-value">{value}</h2>
<p className="stat-label">{label}</p>
    </div>
);
export default StatItem;