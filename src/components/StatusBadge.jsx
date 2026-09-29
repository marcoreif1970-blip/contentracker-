import { STATUS_COLORS } from "../lib/constants.js";
import { useLanguage } from "../lib/LanguageContext.jsx";

export default function StatusBadge({ status }) {
  const { t } = useLanguage();
  const color = STATUS_COLORS[status] || "#9ca3af";
  return (
    <span className="status-badge" style={{ backgroundColor: color }}>
      {t.statusLabels[status] || status}
    </span>
  );
}
