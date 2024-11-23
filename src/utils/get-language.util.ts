export const getLanguage = (language: string) => {
  switch (language?.toLowerCase()) {
    case "en":
      return "English";
    case "pt":
      return "Português";
    case "es":
      return "Español";
    case "pt-br":
      return "Português (Brasil)";
    default:
      return "";
  }
};
