import { ITranslation } from "infraNM/ElasticAPI";
import { FactsTranslationResponseModel } from "infraNM/FactsAPI";
import { useTranslation } from "react-i18next";

export interface TranslationResponseModel {
  id: string;
  languageCode: string;
  translatedText: string;
}
function ParseFacts<T extends { factsTranslations: FactsTranslationResponseModel[] }>(list: T[], language: string) {
  return list.map((c) => ({
    ...c,
    text: c?.factsTranslations?.find((e) => e.languageCode === language)?.translatedText,
  }));
}

function ParseTranslations(translations: ITranslation[], language: string) {
  const lan = language === "pt-br" ? "ptbr" : language;
  return translations?.find((e) => e.languageCode === lan)?.translatedText;
}

function ParseFactsTranslations(translations: FactsTranslationResponseModel[], language: string) {
  return translations?.find((e) => e.languageCode === language)?.translatedText;
}

function ParseOptions(fieldTranslations: Record<"en" | "pt" | "es" | "ptbr" | "default", string>) {
  const {
    i18n: { language },
  } = useTranslation();
  const lan = language === "pt-br" ? "ptbr" : language;
  return fieldTranslations ? (fieldTranslations as any)[lan] || fieldTranslations.default || "" : "";
}

export const useParseTranslations = {
  ParseFacts,
  ParseOptions,
  ParseTranslations,
  ParseFactsTranslations,
};
