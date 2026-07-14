import ArticleClient from "../../articles/research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = { title: "集中、分散与不上市也值得持有 — Zhemin Lin", description: "Concentration, Diversification, and Companies Worth Owning" };

export default function ConcentrationDiversificationPage() {
  const article = {
    date: "2023-10",
    cn: { title: "集中、分散与不上市也值得持有", date: "2023 年 10 月" },
    en: { title: "Concentration, Diversification, and Companies Worth Owning", date: "October 2023" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
