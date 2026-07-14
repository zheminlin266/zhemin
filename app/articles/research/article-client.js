"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { languageFromStorage, nextLanguage, nextTheme } from "../../preferences.mjs";

const ui = {
  cn: { switchLabel: "切换为英文", themeLight: "切换为浅色模式", themeDark: "切换为深色模式", toc: "目录", tocOpen: "收起文章目录", tocClosed: "展开文章目录", back: "返回首页", settings: "页面设置" },
  en: { switchLabel: "Switch to Chinese", themeLight: "Switch to light mode", themeDark: "Switch to dark mode", toc: "Contents", tocOpen: "Collapse table of contents", tocClosed: "Expand table of contents", back: "Back home", settings: "Page settings" },
};

function SunIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></svg>; }
function MoonIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" /></svg>; }
function MenuIcon() { return <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>; }

export default function ArticleClient({ chineseArticle, englishArticle, article }) {
  const [language, setLanguage] = useState("cn");
  const [theme, setTheme] = useState("light");
  const [tocOpen, setTocOpen] = useState(true);
  const [tocItems, setTocItems] = useState([]);
  const [controlsHidden, setControlsHidden] = useState(false);
  const copy = ui[language];
  const details = article[language];

  useEffect(() => {
    let savedLanguage = null;
    let saved = null;
    try {
      savedLanguage = window.localStorage.getItem("language");
      saved = window.localStorage.getItem("theme");
    } catch { /* ponytail: persistence is optional when storage is blocked. */ }
    const initialLanguage = languageFromStorage(savedLanguage);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = saved === "dark" || saved === "light" ? saved : preferred;
    setLanguage(initialLanguage);
    setTheme(initial);
    document.documentElement.lang = initialLanguage === "cn" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    const update = () => setControlsHidden(window.scrollY > 64);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(".article-body h2, .article-body h3, .article-body h4"));
    setTocItems(headings.map((heading) => ({ id: heading.id, label: heading.textContent.trim(), level: Number(heading.tagName.slice(1)) })).filter((item) => item.id && item.label));
  }, [language]);

  function toggleLanguage() { const next = nextLanguage(language); setLanguage(next); document.documentElement.lang = next === "cn" ? "zh-CN" : "en"; try { window.localStorage.setItem("language", next); } catch { /* ponytail: the active language still works without persistence. */ } }
  function toggleTheme() { const next = nextTheme(theme); setTheme(next); document.documentElement.dataset.theme = next; try { window.localStorage.setItem("theme", next); } catch { /* ponytail: the active theme still works without persistence. */ } }

  return (
    <>
      <div className={`controls scroll-hide-controls ${controlsHidden ? "is-hidden" : ""}`} aria-label={copy.settings} aria-hidden={controlsHidden}>
        <button className="control-button language-button" type="button" onClick={toggleLanguage} aria-label={copy.switchLabel} tabIndex={controlsHidden ? -1 : 0}>{language === "cn" ? "EN" : "中文"}</button>
        <button className="control-button icon-button" type="button" onClick={toggleTheme} aria-label={theme === "light" ? copy.themeDark : copy.themeLight} tabIndex={controlsHidden ? -1 : 0}>{theme === "light" ? <MoonIcon /> : <SunIcon />}</button>
      </div>
      <main className="article-main">
        {tocItems.length > 0 && <aside className={`article-toc ${tocOpen ? "is-open" : "is-closed"}`} aria-label={copy.toc}>
          <button className="toc-toggle" type="button" onClick={() => setTocOpen((open) => !open)} aria-expanded={tocOpen} aria-controls="article-toc-list" aria-label={tocOpen ? copy.tocOpen : copy.tocClosed}><MenuIcon /><span className="toc-heading">{copy.toc}</span></button>
          <nav id="article-toc-list" className="toc-list" aria-label={copy.toc} aria-hidden={!tocOpen} tabIndex={tocOpen ? 0 : -1}>{tocItems.map(({ label, id, level }) => <a className={`toc-level-${level}`} href={`#${id}`} key={id} tabIndex={tocOpen ? 0 : -1}>{label}</a>)}</nav>
        </aside>}
        <article className="article-copy rise" style={{ "--delay": "40ms" }}>
          <header className="article-header"><Link className="article-back" href="/">← {copy.back}</Link><h1>{details.title}</h1><div className="article-meta"><time dateTime={article.date}>{details.date}</time></div></header>
          <div className="article-body">{language === "cn" ? chineseArticle : englishArticle}</div>
          <footer className="article-footer"><Link href="/">← {copy.back}</Link><span>@Zhemin</span></footer>
        </article>
      </main>
    </>
  );
}
