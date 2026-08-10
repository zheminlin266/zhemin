import { entries, entryPath, SITE_URL } from "./content/registry.mjs";

function absolute(path) {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap() {
  const homeAlternates = { languages: { "zh-CN": absolute("/"), en: absolute("/en") } };
  const pages = [
    { url: absolute("/"), changeFrequency: "monthly", priority: 1, alternates: homeAlternates },
    { url: absolute("/en"), changeFrequency: "monthly", priority: 1, alternates: homeAlternates },
  ];

  for (const entry of entries) {
    const chinese = entryPath(entry, "cn");
    const english = entryPath(entry, "en");
    const alternates = { languages: { "zh-CN": absolute(chinese), en: absolute(english) } };
    const shared = {
      lastModified: new Date(`${entry.date}-01T00:00:00.000Z`),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates,
    };
    pages.push({ url: absolute(chinese), ...shared }, { url: absolute(english), ...shared });
  }

  return pages;
}
