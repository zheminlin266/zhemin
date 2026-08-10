export function nextTheme(theme) {
  return theme === "light" ? "dark" : "light";
}

export function shouldHideControls(scrollY) {
  return scrollY > 64;
}
