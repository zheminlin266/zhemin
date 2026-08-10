import ArticlePage from "../../../../components/article-page";
import { createEntryMetadata, getEntry } from "../../../../content/registry.mjs";
import Content from "../../../../recommendations/concentration-diversification/content.en.mdx";

const entry = getEntry("recommendations", "concentration-diversification");
export const metadata = createEntryMetadata(entry, "en");

export default function Page() {
  return <ArticlePage language="en" entry={entry}><Content /></ArticlePage>;
}
