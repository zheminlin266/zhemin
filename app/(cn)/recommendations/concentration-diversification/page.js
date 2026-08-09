import ArticlePage from "../../../components/article-page";
import { createEntryMetadata, getEntry } from "../../../content/registry.mjs";
import Content from "../../../recommendations/concentration-diversification/content.cn.mdx";

const entry = getEntry("recommendations", "concentration-diversification");
export const metadata = createEntryMetadata(entry, "cn");

export default function Page() {
  return <ArticlePage language="cn" entry={entry}><Content /></ArticlePage>;
}
