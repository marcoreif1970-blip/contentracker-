import StatusBadge from "./StatusBadge.jsx";
import FilterBar from "./FilterBar.jsx";

export default function ContentList({
  items,
  allItems,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <FilterBar items={allItems} filters={filters} onChange={onFilterChange} />
      {items.length === 0 ? (
        <p className="empty-state">Keine Inhalte gefunden.</p>
      ) : (
        <table className="content-table">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Plattform</th>
              <th>Verantwortlich</th>
              <th>Datum</th>
              <th>Status</th>
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
                  <td>{formatDate(item.publishDate)}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="row-actions">
                    <button className="btn-link" onClick={() => onEdit(item)}>
                      Bearbeiten
                    </button>
                    <button
                      className="btn-link btn-danger"
                      onClick={() => {
                        if (window.confirm(`"${item.title}" wirklich löschen?`)) {
                          onDelete(item.id);
                        }
                      }}
                    >
                      Löschen
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

function formatDate(dateStr) {
  if (!dateStr) return "–";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
