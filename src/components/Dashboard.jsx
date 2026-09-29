import StatusBadge from "./StatusBadge.jsx";
import { STATUSES } from "../lib/constants.js";

const UPCOMING_WINDOW_DAYS = 14;

export default function Dashboard({ items, onEdit }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const windowEnd = new Date(today);
  windowEnd.setDate(windowEnd.getDate() + UPCOMING_WINDOW_DAYS);

  const upcoming = items
    .filter((item) => {
      if (item.status === "Veröffentlicht") return false;
      if (!item.publishDate) return false;
      const date = new Date(item.publishDate + "T00:00:00");
      return date >= today && date <= windowEnd;
    })
    .sort((a, b) => a.publishDate.localeCompare(b.publishDate));

  const counts = STATUSES.reduce((acc, status) => {
    acc[status] = items.filter((item) => item.status === status).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="status-summary">
        {STATUSES.map((status) => (
          <div key={status} className="status-tile">
            <StatusBadge status={status} />
            <span className="status-count">{counts[status]}</span>
          </div>
        ))}
      </div>

      <h2>Anstehend (nächste {UPCOMING_WINDOW_DAYS} Tage)</h2>
      {upcoming.length === 0 ? (
        <p className="empty-state">Nichts geplant in den nächsten {UPCOMING_WINDOW_DAYS} Tagen.</p>
      ) : (
        <ul className="upcoming-list">
          {upcoming.map((item) => (
            <li key={item.id} className="upcoming-item" onClick={() => onEdit(item)}>
              <div className="upcoming-date">{formatDate(item.publishDate)}</div>
              <div className="upcoming-details">
                <span className="upcoming-title">{item.title}</span>
                <span className="upcoming-meta">
                  {item.platform || "–"} · {item.owner || "–"}
                </span>
              </div>
              <StatusBadge status={item.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}
