import ArticleClient from "../research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = { title: "从时间的角度漫谈区块链 — Zhemin Lin", description: "Blockchain Through the Lens of Time" };

export default function BlockchainAndTimePage() {
  const article = {
    date: "2023-04",
    cn: { title: "从时间的角度漫谈区块链", date: "2023 年 4 月" },
    en: { title: "Blockchain Through the Lens of Time", date: "April 2023" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
