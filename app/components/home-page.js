import Image from "next/image";
import Link from "next/link";
import EmailCopyButton from "./email-copy-button";
import SiteControls from "./site-controls";
import { entries, entryPath, homeCopy, homePath, projects } from "../content/registry.mjs";

function LinkList({ items, language }) {
  return (
    <ul className="project-list">
      {items.map((item) => {
        const href = item.href ?? entryPath(item, language);
        const external = href.startsWith("http");
        const title = item.title[language];
        const content = (
          <>
            <span className="project-title">{title}</span>
            {item.year || item.date ? (
              <span className="project-meta">
                <span className="arrow" aria-hidden="true">↗</span>
                <span>{item.year ?? item.date.slice(0, 4)}</span>
              </span>
            ) : (
              <span className="arrow" aria-hidden="true">↗</span>
            )}
          </>
        );

        return (
          <li key={href}>
            {external ? (
              <a className="project-row" href={href} target="_blank" rel="noreferrer">{content}</a>
            ) : (
              <Link className="project-row" href={href}>{content}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function HomePage({ language }) {
  const copy = homeCopy[language];
  const articles = entries.filter((entry) => entry.section === "articles");
  const recommendations = entries.filter((entry) => entry.section === "recommendations");
  const languageLabels = {
    settings: copy.settings,
    switchLabel: copy.switchLabel,
    themeLabel: copy.themeLabel,
  };

  return (
    <>
      <SiteControls language={language} alternateHref={homePath(language === "cn" ? "en" : "cn")} labels={languageLabels} />
      <main lang={language === "en" ? "en" : "zh-CN"}>
        <header className="intro-grid rise" style={{ "--delay": "40ms" }}>
          <div className="intro-copy">
            <h1 id="top">Zhemin Lin</h1>
            <div className="bio">{copy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <div className="portrait">
            <Image
              className="portrait-image"
              src="/zhemin-profile.webp"
              alt={copy.photoLabel}
              fill
              priority
              sizes="(max-width: 520px) 96px, (max-width: 800px) 112px, 210px"
            />
          </div>
        </header>

        <section className="section rise" style={{ "--delay": "120ms" }} aria-labelledby="projects-heading">
          <h2 id="projects-heading">{copy.projectsHeading}</h2>
          <LinkList items={projects} language={language} />
        </section>
        <section className="section rise" style={{ "--delay": "180ms" }} aria-labelledby="articles-heading">
          <h2 id="articles-heading">{copy.articlesHeading}</h2>
          <LinkList items={articles} language={language} />
        </section>
        <section className="section rise" style={{ "--delay": "240ms" }} aria-labelledby="recommendations-heading">
          <h2 id="recommendations-heading">{copy.recommendationsHeading}</h2>
          <LinkList items={recommendations} language={language} />
        </section>

        <footer className="footer rise" style={{ "--delay": "300ms" }}>
          <a className="back-to-top" href="#top">{copy.backToTop}</a>
          <div className="footer-meta">
            <nav className="footer-social" aria-label={copy.socialLinks}>
              <a href="https://x.com/zheminlin" target="_blank" rel="noreferrer">X</a>
              <a href="https://github.com/zheminlin266" target="_blank" rel="noreferrer">GitHub</a>
            </nav>
            <EmailCopyButton labels={copy} />
          </div>
        </footer>
      </main>
    </>
  );
}
