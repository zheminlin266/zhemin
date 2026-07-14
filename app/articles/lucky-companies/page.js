import ArticleClient from "../research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = { title: "幸运的公司和权力结构 — Zhemin Lin", description: "Lucky Companies and Power Structures" };

export default function LuckyCompaniesPage() {
  const article = {
    date: "2024-03",
    cn: { title: "幸运的公司和权力结构", date: "2024 年 3 月" },
    en: { title: "Lucky Companies and Power Structures", date: "March 2024" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
