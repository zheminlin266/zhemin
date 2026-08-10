import ArticlePage from "../../../components/article-page";
import { createEntryMetadata, getEntry } from "../../../content/registry.mjs";
import Content from "../../../articles/three-questions/content.cn.mdx";

const entry = getEntry("articles", "three-questions");
export const metadata = createEntryMetadata(entry, "cn");

export default function Page() {
  return <ArticlePage language="cn" entry={entry}><Content /></ArticlePage>;
}
