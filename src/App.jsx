import { useState } from "react";
import { useContentItems } from "./hooks/useContentItems.js";
import Dashboard from "./components/Dashboard.jsx";
import ContentList from "./components/ContentList.jsx";
import ContentForm from "./components/ContentForm.jsx";

const EMPTY_FILTERS = { platform: "", owner: "", status: "" };

export default function App() {
  const { items, addItem, updateItem, deleteItem } = useContentItems();
  const [view, setView] = useState("dashboard");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
        <h1>Content-Tracker</h1>
        <nav className="tabs">
          <button
            className={view === "dashboard" ? "tab active" : "tab"}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={view === "list" ? "tab active" : "tab"}
            onClick={() => setView("list")}
          >
            Alle Inhalte
          </button>
        </nav>
        <button className="btn-primary" onClick={openAddForm}>
          + Content hinzufügen
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
