import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./i18n.js";

const LANG_STORAGE_KEY = "content-tracker-lang";
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_STORAGE_KEY) || "de");

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = { lang, setLang, t: translations[lang] };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
