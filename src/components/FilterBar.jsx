export default function FilterBar({ items, filters, onChange }) {
  const platforms = uniqueValues(items, "platform");
  const owners = uniqueValues(items, "owner");
  const statuses = uniqueValues(items, "status");

  return (
    <div className="filter-bar">
      <label>
        Plattform
        <select
          value={filters.platform}
          onChange={(e) => onChange({ ...filters, platform: e.target.value })}
        >
          <option value="">Alle</option>
          {platforms.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        Verantwortlich
        <select
          value={filters.owner}
          onChange={(e) => onChange({ ...filters, owner: e.target.value })}
        >
          <option value="">Alle</option>
          {owners.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        Status
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">Alle</option>
          {statuses.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      {(filters.platform || filters.owner || filters.status) && (
        <button
          type="button"
          className="btn-link"
          onClick={() => onChange({ platform: "", owner: "", status: "" })}
        >
          Filter zurücksetzen
        </button>
      )}
    </div>
  );
}

function uniqueValues(items, field) {
  return [...new Set(items.map((item) => item[field]).filter(Boolean))].sort();
}
