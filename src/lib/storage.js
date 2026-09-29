const STORAGE_KEY = "content-tracker-items";

export function loadItems() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
