"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nextTheme, shouldHideControls } from "../preferences.mjs";

function SunIcon() {
  return (
    <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
    </svg>
  );
}

export default function SiteControls({ language, alternateHref, labels }) {
  const [theme, setTheme] = useState(null);
  const [controlsHidden, setControlsHidden] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    const update = () => setControlsHidden(shouldHideControls(window.scrollY));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function toggleTheme() {
    const current = theme ?? (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const next = nextTheme(current);
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Theme persistence is optional when storage is blocked.
    }
  }

  return (
    <nav
      className={`controls scroll-hide-controls ${controlsHidden ? "is-hidden" : ""}`}
      aria-label={labels.settings}
      aria-hidden={controlsHidden}
      lang={language === "en" ? "en" : "zh-CN"}
    >
      <Link
        className="control-button language-button"
        href={alternateHref}
        aria-label={labels.switchLabel}
        tabIndex={controlsHidden ? -1 : 0}
      >
        {language === "cn" ? "EN" : "文"}
      </Link>
      <button
        className="control-button icon-button"
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? labels.themeLight : labels.themeDark}
        aria-pressed={theme === "dark"}
        tabIndex={controlsHidden ? -1 : 0}
      >
        <MoonIcon />
        <SunIcon />
      </button>
    </nav>
  );
}
