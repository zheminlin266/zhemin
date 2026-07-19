"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { copyEmailAddress } from "./email-copy.mjs";
import { languageFromStorage, nextLanguage, nextTheme } from "./preferences.mjs";

const content = {
  cn: {
    switchLabel: "切换为英文",
    themeLight: "切换为浅色模式",
    themeDark: "切换为深色模式",
    intro: [
      "站在科技、商业和人文的交汇点。",
      "问好问题，享受过程。欢迎纠错和理性探讨。",
      "曾在私募基金和家族办公室进行基本面研究，重点关注科技、消费行业。前华润万象生活商业数据分析师。",
    ],
    projectsHeading: "项目",
    articlesHeading: "文章",
    recommendationsHeading: "推荐",
    backToTop: "返回顶部",
    copyEmail: "复制邮箱地址",
    emailCopied: "复制成功",
    emailCopyFailed: "复制失败",
    photoLabel: "Zhemin Lin 的个人照片",
    projects: [
      ["金银铜供需信息", "https://metals.zhemin.ltd/"],
    ],
    articles: [
      ["铜供需研究小结", "/articles/copper-supply-demand", "2026"],
      ["Pendle 市场观察：巧妇难为无米之炊", "/articles/pendle-market-observation", "2026"],
      ["探究 Pendle 的行业空间和境况", "/articles/pendle-industry", "2025"],
      ["幸运的公司和权力结构", "/articles/lucky-companies", "2024"],
      ["投研模糊三问", "/articles/three-questions", "2023"],
      ["从时间的角度漫谈区块链", "/articles/blockchain-and-time", "2023"],
    ],
    recommendations: [
      ["投资人张尧的思维习惯和投资纪律", "/recommendations/zhang-yao", "2025"],
      ["集中、分散与不上市也值得持有", "/recommendations/concentration-diversification", "2023"],
      ["王川：为什么思维模型是最重要的财富（一）", "/recommendations/mental-models", "2019"],
    ],
  },
  en: {
    switchLabel: "Switch to Chinese",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    intro: [
      "At the intersection of technology, business, and the humanities.",
      "Ask good questions. Enjoy the process. Corrections and thoughtful discussion are always welcome.",
      "I conducted fundamental research at a private equity fund and a family office, with a focus on technology and consumer sectors. Formerly, I was a commercial data analyst at China Resources Mixc Lifestyle.",
    ],
    projectsHeading: "Projects",
    articlesHeading: "Articles",
    recommendationsHeading: "Recommendations",
    backToTop: "Back to top",
    copyEmail: "Copy email address",
    emailCopied: "Copied",
    emailCopyFailed: "Copy failed",
    photoLabel: "Portrait of Zhemin Lin",
    projects: [
      ["Gold, Silver & Copper Supply–Demand", "https://metals.zhemin.ltd/"],
    ],
    articles: [
      ["Copper Supply and Demand: Research Notes", "/articles/copper-supply-demand", "2026"],
      ["Pendle Market Outlook: You Can’t Cook Without Ingredients", "/articles/pendle-market-observation", "2026"],
      ["Pendle: Market Opportunity and Competitive Position", "/articles/pendle-industry", "2025"],
      ["Lucky Companies and Power Structures", "/articles/lucky-companies", "2024"],
      ["Three Questions for Fundamental Research", "/articles/three-questions", "2023"],
      ["Blockchain Through the Lens of Time", "/articles/blockchain-and-time", "2023"],
    ],
    recommendations: [
      ["Investor Zhang Yao’s Thinking Habits and Discipline", "/recommendations/zhang-yao", "2025"],
      ["Concentration, Diversification, and Companies Worth Owning", "/recommendations/concentration-diversification", "2023"],
      ["Wang Chuan: Why Mental Models Are the Most Important Wealth (I)", "/recommendations/mental-models", "2019"],
    ],
  },
};

function SunIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></svg>;
}

function MoonIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" /></svg>;
}

function LinkList({ items }) {
  return (
    <div className="project-list">
      {items.map(([title, href, year]) => {
        const external = href.startsWith("http");
        return (
          <a className="project-row" href={href} key={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
            <span className="project-title">{title}</span>
            {year ? (
              <span className="project-meta"><span className="arrow" aria-hidden="true">↗</span><span>{year}</span></span>
            ) : <span className="arrow" aria-hidden="true">↗</span>}
          </a>
        );
      })}
    </div>
  );
}

function copyWithSelection(text) {
  const previousFocus = document.activeElement;
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  try {
    field.select();
    // ponytail: execCommand is a compatibility fallback; remove it once Clipboard API support is universal for the site's browsers.
    return document.execCommand("copy");
  } finally {
    field.remove();
    previousFocus?.focus();
  }
}

export default function HomeClient() {
  const [language, setLanguage] = useState("cn");
  const [theme, setTheme] = useState("light");
  const [controlsHidden, setControlsHidden] = useState(false);
  const [emailCopyNotice, setEmailCopyNotice] = useState({ status: "idle", x: 0, y: 0, sequence: 0 });
  const copy = content[language];

  useEffect(() => {
    let savedLanguage = null;
    let savedTheme = null;
    try {
      savedLanguage = window.localStorage.getItem("language");
      savedTheme = window.localStorage.getItem("theme");
    } catch { /* ponytail: persistence is optional when storage is blocked. */ }
    const initialLanguage = languageFromStorage(savedLanguage);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferred;
    setLanguage(initialLanguage);
    setTheme(initial);
    document.documentElement.lang = initialLanguage === "cn" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    const update = () => setControlsHidden(window.scrollY > 64);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (emailCopyNotice.status === "idle") return undefined;

    const sequence = emailCopyNotice.sequence;
    const timer = window.setTimeout(() => {
      setEmailCopyNotice((notice) => notice.sequence === sequence ? { ...notice, status: "idle" } : notice);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [emailCopyNotice.status, emailCopyNotice.sequence]);

  function toggleLanguage() {
    const next = nextLanguage(language);
    setLanguage(next);
    document.documentElement.lang = next === "cn" ? "zh-CN" : "en";
    try { window.localStorage.setItem("language", next); } catch { /* ponytail: the active language still works without persistence. */ }
  }

  function toggleTheme() {
    const next = nextTheme(theme);
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem("theme", next); } catch { /* ponytail: the active theme still works without persistence. */ }
  }

  async function handleEmailCopy(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = event.detail === 0
      ? { x: rect.right, y: rect.bottom }
      : { x: event.clientX, y: event.clientY };

    try {
      await copyEmailAddress({ clipboard: navigator.clipboard, fallback: copyWithSelection });
      setEmailCopyNotice((notice) => ({ status: "copied", ...point, sequence: notice.sequence + 1 }));
    } catch {
      setEmailCopyNotice((notice) => ({ status: "failed", ...point, sequence: notice.sequence + 1 }));
    }
  }

  return (
    <>
      <div className={`controls scroll-hide-controls ${controlsHidden ? "is-hidden" : ""}`} aria-label={language === "cn" ? "页面设置" : "Page settings"} aria-hidden={controlsHidden}>
        <button className="control-button language-button" type="button" onClick={toggleLanguage} aria-label={copy.switchLabel} tabIndex={controlsHidden ? -1 : 0}>{language === "cn" ? "EN" : "文"}</button>
        <button className="control-button icon-button" type="button" onClick={toggleTheme} aria-label={theme === "light" ? copy.themeDark : copy.themeLight} tabIndex={controlsHidden ? -1 : 0}>{theme === "light" ? <MoonIcon /> : <SunIcon />}</button>
      </div>

      <main>
        <header className="intro-grid rise" style={{ "--delay": "40ms" }}>
          <div className="intro-copy">
            <h1 id="top">Zhemin Lin</h1>
            <div className="bio">{copy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <div className="portrait"><Image className="portrait-image" src="/zhemin-profile.png" alt={copy.photoLabel} fill priority sizes="(max-width: 520px) 96px, (max-width: 800px) 112px, 210px" /></div>
        </header>

        <section className="section rise" style={{ "--delay": "120ms" }} aria-labelledby="projects-heading"><h2 id="projects-heading">{copy.projectsHeading}</h2><LinkList items={copy.projects} /></section>
        <section className="section rise" style={{ "--delay": "180ms" }} aria-labelledby="articles-heading"><h2 id="articles-heading">{copy.articlesHeading}</h2><LinkList items={copy.articles} /></section>
        <section className="section rise" style={{ "--delay": "240ms" }} aria-labelledby="recommendations-heading"><h2 id="recommendations-heading">{copy.recommendationsHeading}</h2><LinkList items={copy.recommendations} /></section>

        <footer className="footer rise" style={{ "--delay": "300ms" }}><a className="back-to-top" href="#top">{copy.backToTop}</a><div className="footer-meta"><nav className="footer-social" aria-label="Social links"><a href="https://x.com/zheminlin" target="_blank" rel="noreferrer">X</a><a href="https://github.com/zheminlin266" target="_blank" rel="noreferrer">GitHub</a></nav><button className="footer-copy-button" type="button" onClick={handleEmailCopy} aria-label={copy.copyEmail}>Email</button></div></footer>
      </main>
      <span className={`copy-toast ${emailCopyNotice.status !== "idle" ? "is-visible" : ""}`} style={{ "--copy-x": `${emailCopyNotice.x}px`, "--copy-y": `${emailCopyNotice.y}px` }} role="status" aria-live="polite">{emailCopyNotice.status === "copied" ? copy.emailCopied : emailCopyNotice.status === "failed" ? copy.emailCopyFailed : ""}</span>
    </>
  );
}
