import ArticleClient from "../research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = {
  title: "Pendle 市场观察：巧妇难为无米之炊 — Zhemin Lin",
  description: "Pendle Market Update: No Ingredients, No Feast",
};

export default function PendleMarketObservationPage() {
  const article = {
    date: "2026-01",
    cn: { title: "Pendle 市场观察：巧妇难为无米之炊", date: "2026 年 1 月" },
    en: { title: "Pendle Market Update: No Ingredients, No Feast", date: "January 2026" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
