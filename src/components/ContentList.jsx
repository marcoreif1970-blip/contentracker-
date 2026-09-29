import StatusBadge from "./StatusBadge.jsx";
import FilterBar from "./FilterBar.jsx";
import { useLanguage } from "../lib/LanguageContext.jsx";

export default function ContentList({
  items,
  allItems,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();

  return (
    <div>
      <FilterBar items={allItems} filters={filters} onChange={onFilterChange} />
      {items.length === 0 ? (
        <p className="empty-state">{t.emptyList}</p>
      ) : (
        <table className="content-table">
          <thead>
            <tr>
              <th>{t.tableTitle}</th>
              <th>{t.tablePlatform}</th>
              <th>{t.tableOwner}</th>
              <th>{t.tableDate}</th>
              <th>{t.tableStatus}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items
              .slice()
              .sort((a, b) => a.publishDate.localeCompare(b.publishDate))
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.platform || "–"}</td>
                  <td>{item.owner || "–"}</td>
                  <td>{formatDate(item.publishDate, t.dateLocale)}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="row-actions">
                    <button className="btn-link" onClick={() => onEdit(item)}>
                      {t.edit}
                    </button>
                    <button
                      className="btn-link btn-danger"
                      onClick={() => {
                        if (window.confirm(t.deleteConfirm(item.title))) {
                          onDelete(item.id);
                        }
                      }}
                    >
                      {t.delete}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function formatDate(dateStr, locale) {
  if (!dateStr) return "–";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
