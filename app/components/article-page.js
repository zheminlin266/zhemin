import Link from "next/link";
import ArticleToc from "./article-toc";
import SiteControls from "./site-controls";
import { entryPath, homePath, SITE_URL } from "../content/registry.mjs";

const ui = {
  cn: {
    switchLabel: "切换为英文",
    themeLabel: "深色主题",
    toc: "目录",
    tocOpen: "收起文章目录",
    tocClosed: "展开文章目录",
    back: "返回首页",
    settings: "页面设置",
  },
  en: {
    switchLabel: "Switch to Chinese",
    themeLabel: "Dark theme",
    toc: "Contents",
    tocOpen: "Collapse table of contents",
    tocClosed: "Expand table of contents",
    back: "Back home",
    settings: "Page settings",
  },
};

export default function ArticlePage({ language, entry, children }) {
  const copy = ui[language];
  const otherLanguage = language === "cn" ? "en" : "cn";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title[language],
    description: entry.description[language],
    datePublished: `${entry.date}-01`,
    inLanguage: language === "cn" ? "zh-CN" : "en",
    mainEntityOfPage: new URL(entryPath(entry, language), SITE_URL).toString(),
    author: { "@type": "Person", name: "Zhemin Lin", url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }}
      />
      <SiteControls
        language={language}
        alternateHref={entryPath(entry, otherLanguage)}
        labels={{ settings: copy.settings, switchLabel: copy.switchLabel, themeLabel: copy.themeLabel }}
      />
      <main className="article-main" lang={language === "en" ? "en" : "zh-CN"}>
        {entry.hasToc && <ArticleToc labels={{ toc: copy.toc, tocOpen: copy.tocOpen, tocClosed: copy.tocClosed }} />}
        <article className="article-copy rise" style={{ "--delay": "40ms" }}>
          <header className="article-header">
            <Link className="article-back" href={homePath(language)}>← {copy.back}</Link>
            <h1>{entry.title[language]}</h1>
            <div className="article-meta">
              <time dateTime={entry.date}>{entry.displayDate[language]}</time>
              {entry.originalNote && <span>· {entry.originalNote[language]}</span>}
            </div>
          </header>
          <div className="article-body">{children}</div>
          <footer className="article-footer">
            <Link href={homePath(language)}>← {copy.back}</Link>
            <span>@Zhemin</span>
          </footer>
        </article>
      </main>
    </>
  );
}
