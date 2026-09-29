import { useLanguage } from "../lib/LanguageContext.jsx";

export default function FilterBar({ items, filters, onChange }) {
  const { t } = useLanguage();
  const platforms = uniqueValues(items, "platform");
  const owners = uniqueValues(items, "owner");
  const statuses = uniqueValues(items, "status");

  return (
    <div className="filter-bar">
      <label>
        {t.filterPlatform}
        <select
          value={filters.platform}
          onChange={(e) => onChange({ ...filters, platform: e.target.value })}
        >
          <option value="">{t.filterAll}</option>
          {platforms.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t.filterOwner}
        <select
          value={filters.owner}
          onChange={(e) => onChange({ ...filters, owner: e.target.value })}
        >
          <option value="">{t.filterAll}</option>
          {owners.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t.filterStatus}
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">{t.filterAll}</option>
          {statuses.map((value) => (
            <option key={value} value={value}>
              {t.statusLabels[value] || value}
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
          {t.filterReset}
        </button>
      )}
    </div>
  );
}

function uniqueValues(items, field) {
  return [...new Set(items.map((item) => item[field]).filter(Boolean))].sort();
}
