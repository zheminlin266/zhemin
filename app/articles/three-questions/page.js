import ArticleClient from "../research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = { title: "投研模糊三问 — Zhemin Lin", description: "Three Questions for Fundamental Research" };

export default function ThreeQuestionsPage() {
  const article = {
    date: "2023-10",
    cn: { title: "投研模糊三问", date: "2023 年 10 月" },
    en: { title: "Three Questions for Fundamental Research", date: "October 2023" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
