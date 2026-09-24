import { entries, entryPath, SITE_URL } from "./content/registry.mjs";
import { moments, momentPath } from "./content/moments.mjs";

function absolute(path) {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap() {
  const homeAlternates = { languages: { "zh-CN": absolute("/cn"), en: absolute("/") } };
  const pages = [
    { url: absolute("/"), changeFrequency: "monthly", priority: 1, alternates: homeAlternates },
    { url: absolute("/cn"), changeFrequency: "monthly", priority: 1, alternates: homeAlternates },
  ];

  for (const collection of moments) {
    const chinese = momentPath(collection.slug, "cn");
    const english = momentPath(collection.slug, "en");
    const alternates = { languages: { "zh-CN": absolute(chinese), en: absolute(english) } };
    pages.push({ url: absolute(chinese), alternates }, { url: absolute(english), alternates });
  }

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
