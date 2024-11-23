import { useTranslation } from "react-i18next";

import { allLangs } from "./all-langs.data";

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const { i18n } = useTranslation(ns);

  const fallback = allLangs.filter((lang) => lang.value === "pt")[0];

  const currentLang = allLangs.find((lang) => lang.value === i18n.resolvedLanguage);

  return {
    currentLang: currentLang ?? fallback,
  };
}
