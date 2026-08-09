import ArticlePage from "../../../../components/article-page";
import { createEntryMetadata, getEntry } from "../../../../content/registry.mjs";
import Content from "../../../../articles/pendle-industry/content.en.mdx";

const entry = getEntry("articles", "pendle-industry");
export const metadata = createEntryMetadata(entry, "en");

export default function Page() {
  return <ArticlePage language="en" entry={entry}><Content /></ArticlePage>;
}
