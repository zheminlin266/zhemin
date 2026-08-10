"use client";

import { useEffect, useState } from "react";

function MenuIcon() {
  return <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>;
}

export default function ArticleToc({ labels }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(".article-body h2, .article-body h3, .article-body h4"));
    setItems(headings
      .map((heading) => ({
        id: heading.id,
        label: heading.textContent.trim(),
        level: Number(heading.tagName.slice(1)),
      }))
      .filter((item) => item.id && item.label));
    const desktop = window.matchMedia("(min-width: 1221px)");
    const syncWithViewport = (event) => setOpen(event.matches);
    setOpen(desktop.matches);
    desktop.addEventListener("change", syncWithViewport);
    return () => desktop.removeEventListener("change", syncWithViewport);
  }, []);

  const ready = items.length > 0;

  return (
    <aside className={`article-toc ${open ? "is-open" : "is-closed"} ${ready ? "" : "is-loading"}`}>
      <button
        className="toc-toggle"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="article-toc-list"
        aria-label={open ? labels.tocOpen : labels.tocClosed}
        disabled={!ready}
      >
        <MenuIcon />
        <span className="toc-heading">{labels.toc}</span>
      </button>
      <nav id="article-toc-list" className="toc-list" aria-label={labels.toc} aria-hidden={!open} inert={!open}>
        {items.map(({ label, id, level }) => (
          <a className={`toc-level-${level}`} href={`#${id}`} key={id} tabIndex={open ? 0 : -1}>
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
