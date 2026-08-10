import ArticlePage from "../../../../components/article-page";
import { createEntryMetadata, getEntry } from "../../../../content/registry.mjs";
import Content from "../../../../articles/lucky-companies/content.en.mdx";

const entry = getEntry("articles", "lucky-companies");
export const metadata = createEntryMetadata(entry, "en");

export default function Page() {
  return <ArticlePage language="en" entry={entry}><Content /></ArticlePage>;
}
