import { useState } from "react";
import { STATUS_KEYS } from "../lib/constants.js";
import { useLanguage } from "../lib/LanguageContext.jsx";

function emptyForm(defaultStatus) {
  return {
    title: "",
    platform: "",
    owner: "",
    publishDate: "",
    status: defaultStatus,
  };
}

export default function ContentForm({ initialItem, onSave, onCancel }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(
    initialItem ? { ...initialItem } : emptyForm(STATUS_KEYS[0])
  );
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError(t.errorTitleRequired);
      return;
    }
    if (!form.publishDate) {
      setError(t.errorDateRequired);
      return;
    }
    setError("");
    onSave(form);
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initialItem ? t.formTitleEdit : t.formTitleAdd}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            {t.fieldTitle}
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder={t.fieldTitlePlaceholder}
              autoFocus
            />
          </label>
          <label>
            {t.fieldPlatform}
            <input
              type="text"
              value={form.platform}
              onChange={(e) => handleChange("platform", e.target.value)}
              placeholder={t.fieldPlatformPlaceholder}
            />
          </label>
          <label>
            {t.fieldOwner}
            <input
              type="text"
              value={form.owner}
              onChange={(e) => handleChange("owner", e.target.value)}
              placeholder={t.fieldOwnerPlaceholder}
            />
          </label>
          <label>
            {t.fieldPublishDate}
            <input
              type="date"
              value={form.publishDate}
              onChange={(e) => handleChange("publishDate", e.target.value)}
            />
          </label>
          <label>
            {t.fieldStatus}
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              {STATUS_KEYS.map((status) => (
                <option key={status} value={status}>
                  {t.statusLabels[status]}
                </option>
              ))}
            </select>
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              {t.cancel}
            </button>
            <button type="submit" className="btn-primary">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
