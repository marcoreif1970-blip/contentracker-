import { STATUS_COLORS } from "../lib/constants.js";

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || "#9ca3af";
  return (
    <span className="status-badge" style={{ backgroundColor: color }}>
      {status}
    </span>
  );
}
