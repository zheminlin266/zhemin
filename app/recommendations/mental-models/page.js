import ArticleClient from "../../articles/research/article-client";
import ChineseArticle from "./content.cn.mdx";
import EnglishArticle from "./content.en.mdx";

export const metadata = { title: "王川：为什么思维模型是最重要的财富（一） — Zhemin Lin", description: "Wang Chuan: Why Mental Models Are the Most Important Wealth (I)" };

export default function MentalModelsPage() {
  const article = {
    date: "2019-04",
    cn: { title: "王川：为什么思维模型是最重要的财富（一）", date: "2019 年 4 月" },
    en: { title: "Wang Chuan: Why Mental Models Are the Most Important Wealth (I)", date: "April 2019" },
  };
  return <ArticleClient article={article} chineseArticle={<ChineseArticle />} englishArticle={<EnglishArticle />} />;
}
