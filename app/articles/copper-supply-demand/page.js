import ArticleClient from "../research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = { title: "铜供需研究小结 — Zhemin Lin", description: "Copper Supply and Demand: Research Notes" };

export default function CopperSupplyDemandPage() {
  const article = {
    date: "2026-03",
    cn: { title: "铜供需研究小结", date: "2026 年 3 月" },
    en: { title: "Copper Supply and Demand: Research Notes", date: "March 2026" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
