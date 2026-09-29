import { useState } from "react";
import { STATUSES } from "../lib/constants.js";

const EMPTY_FORM = {
  title: "",
  platform: "",
  owner: "",
  publishDate: "",
  status: STATUSES[0],
};

export default function ContentForm({ initialItem, onSave, onCancel }) {
  const [form, setForm] = useState(initialItem ? { ...initialItem } : EMPTY_FORM);
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Bitte einen Titel eingeben.");
      return;
    }
    if (!form.publishDate) {
      setError("Bitte ein Veröffentlichungsdatum wählen.");
      return;
    }
    setError("");
    onSave(form);
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initialItem ? "Content bearbeiten" : "Content hinzufügen"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Titel
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="z. B. Instagram-Reel Hundeernährung"
              autoFocus
            />
          </label>
          <label>
            Plattform
            <input
              type="text"
              value={form.platform}
              onChange={(e) => handleChange("platform", e.target.value)}
              placeholder="z. B. Instagram, Newsletter, Blog"
            />
          </label>
          <label>
            Verantwortlich
            <input
              type="text"
              value={form.owner}
              onChange={(e) => handleChange("owner", e.target.value)}
              placeholder="z. B. Anna"
            />
          </label>
          <label>
            Veröffentlichungsdatum
            <input
              type="date"
              value={form.publishDate}
              onChange={(e) => handleChange("publishDate", e.target.value)}
            />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Abbrechen
            </button>
            <button type="submit" className="btn-primary">
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
