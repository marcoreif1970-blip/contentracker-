import { useEffect, useState } from "react";
import { useContentItems } from "./hooks/useContentItems.js";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext.jsx";
import { LANGUAGES } from "./lib/i18n.js";
import { translations } from "./lib/i18n.js";
import Dashboard from "./components/Dashboard.jsx";
import ContentList from "./components/ContentList.jsx";
import ContentForm from "./components/ContentForm.jsx";

const EMPTY_FILTERS = { platform: "", owner: "", status: "" };

function AppContent() {
  const { t, lang, setLang } = useLanguage();
  const { items, addItem, updateItem, deleteItem } = useContentItems();
  const [view, setView] = useState("dashboard");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = t.appTitle;
  }, [t.appTitle]);

  const filteredItems = items.filter((item) => {
    if (filters.platform && item.platform !== filters.platform) return false;
    if (filters.owner && item.owner !== filters.owner) return false;
    if (filters.status && item.status !== filters.status) return false;
    return true;
  });

  function openAddForm() {
    setEditingItem(null);
    setShowForm(true);
  }

  function openEditForm(item) {
    setEditingItem(item);
    setShowForm(true);
    setView("list");
  }

  function handleSave(form) {
    if (editingItem) {
      updateItem(editingItem.id, form);
    } else {
      addItem(form);
    }
    setShowForm(false);
    setEditingItem(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t.appTitle}</h1>
        <nav className="tabs">
          <button
            className={view === "dashboard" ? "tab active" : "tab"}
            onClick={() => setView("dashboard")}
          >
            {t.navDashboard}
          </button>
          <button
            className={view === "list" ? "tab active" : "tab"}
            onClick={() => setView("list")}
          >
            {t.navList}
          </button>
        </nav>
        <div className="lang-switch">
          {LANGUAGES.map((code) => (
            <button
              key={code}
              className={lang === code ? "lang-btn active" : "lang-btn"}
              onClick={() => setLang(code)}
            >
              {translations[code].langLabel}
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={openAddForm}>
          {t.addButton}
        </button>
      </header>

      <main className="app-main">
        {view === "dashboard" ? (
          <Dashboard items={items} onEdit={openEditForm} />
        ) : (
          <ContentList
            items={filteredItems}
            allItems={items}
            filters={filters}
            onFilterChange={setFilters}
            onEdit={openEditForm}
            onDelete={deleteItem}
          />
        )}
      </main>

      {showForm && (
        <ContentForm
          initialItem={editingItem}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
