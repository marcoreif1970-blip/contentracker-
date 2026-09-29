import { useEffect, useState } from "react";
import { loadItems, saveItems } from "../lib/storage.js";

export function useContentItems() {
  const [items, setItems] = useState(() => loadItems());

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
