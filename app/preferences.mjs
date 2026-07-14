export function nextLanguage(language) {
  return language === "cn" ? "en" : "cn";
}

export function languageFromStorage(language) {
  return language === "en" ? "en" : "cn";
}

export function nextTheme(theme) {
  return theme === "light" ? "dark" : "light";
}
