import { useEffect, useState } from "react";
import { loadItems, saveItems } from "../lib/storage.js";

const LEGACY_STATUS_MAP = {
  Entwurf: "draft",
  Review: "review",
  Geplant: "scheduled",
  Veröffentlicht: "published",
};

function migrateItem(item) {
  const mapped = LEGACY_STATUS_MAP[item.status];
  return mapped ? { ...item, status: mapped } : item;
}

export function useContentItems() {
  const [items, setItems] = useState(() => loadItems().map(migrateItem));

  useEffect(() => {
    saveItems(items);
  }, [items]);

  function addItem(item) {
    const newItem = { ...item, id: crypto.randomUUID() };
    setItems((prev) => [...prev, newItem]);
  }

  function updateItem(id, updates) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }

  function deleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return { items, addItem, updateItem, deleteItem };
}
