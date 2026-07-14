import ArticleClient from "../../articles/research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = { title: "投资人张尧的思维习惯和投资纪律 — Zhemin Lin", description: "Investor Zhang Yao’s Thinking Habits and Investment Discipline" };

export default function ZhangYaoPage() {
  const article = {
    date: "2025-12",
    cn: { title: "投资人张尧的思维习惯和投资纪律", date: "2025 年 12 月" },
    en: { title: "Investor Zhang Yao’s Thinking Habits and Investment Discipline", date: "December 2025" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
