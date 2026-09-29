import StatusBadge from "./StatusBadge.jsx";
import { STATUS_KEYS } from "../lib/constants.js";
import { useLanguage } from "../lib/LanguageContext.jsx";

const UPCOMING_WINDOW_DAYS = 14;

export default function Dashboard({ items, onEdit }) {
  const { t } = useLanguage();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const windowEnd = new Date(today);
  windowEnd.setDate(windowEnd.getDate() + UPCOMING_WINDOW_DAYS);

  const upcoming = items
    .filter((item) => {
      if (item.status === "published") return false;
      if (!item.publishDate) return false;
      const date = new Date(item.publishDate + "T00:00:00");
      return date >= today && date <= windowEnd;
    })
    .sort((a, b) => a.publishDate.localeCompare(b.publishDate));

  const counts = STATUS_KEYS.reduce((acc, status) => {
    acc[status] = items.filter((item) => item.status === status).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="status-summary">
        {STATUS_KEYS.map((status) => (
          <div key={status} className="status-tile">
            <StatusBadge status={status} />
            <span className="status-count">{counts[status]}</span>
          </div>
        ))}
      </div>

      <h2>{t.upcomingHeading(UPCOMING_WINDOW_DAYS)}</h2>
      {upcoming.length === 0 ? (
        <p className="empty-state">{t.upcomingEmpty(UPCOMING_WINDOW_DAYS)}</p>
      ) : (
        <ul className="upcoming-list">
          {upcoming.map((item) => (
            <li key={item.id} className="upcoming-item" onClick={() => onEdit(item)}>
              <div className="upcoming-date">{formatDate(item.publishDate, t.dateLocale)}</div>
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

function formatDate(dateStr, locale) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(locale, {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}
