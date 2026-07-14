import ArticleClient from "../research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = {
  title: "探究 Pendle 的行业空间和境况 — Zhemin Lin",
  description: "Pendle: Market Opportunity and Competitive Position",
};

export default function PendleIndustryPage() {
  const article = {
    date: "2025-05",
    cn: { title: "探究 Pendle 的行业空间和境况", date: "2025 年 5 月" },
    en: { title: "Pendle: Market Opportunity and Competitive Position", date: "May 2025" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
