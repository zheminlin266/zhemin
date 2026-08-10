export const SITE_URL = "https://zhemin.ltd";

export const languages = {
  cn: { htmlLang: "zh-CN", prefix: "" },
  en: { htmlLang: "en", prefix: "/en" },
};

export const homeCopy = {
  cn: {
    title: "Zhemin Lin",
    description: "Zhemin Lin 的个人网站：基本面研究、项目、文章与推荐。",
    switchLabel: "切换为英文",
    themeDark: "切换为深色主题",
    themeLight: "切换为浅色主题",
    settings: "页面设置",
    intro: [
      "在这个因科技而剧变的时代，战术勤奋弥补不了战略懒惰。",
      "真正重要的是找好视角，提好问题，给对权重，承担选择。",
      "曾在私募基金和家族办公室进行基本面研究，重点关注科技、消费行业。前华润万象生活商业数据分析师。",
      "欢迎纠错和理性探讨。",
    ],
    projectsHeading: "项目",
    articlesHeading: "文章",
    recommendationsHeading: "推荐",
    backToTop: "返回顶部",
    copyEmail: "复制邮箱地址",
    emailCopied: "复制成功",
    emailCopyFailed: "复制失败",
    photoLabel: "Zhemin Lin 的个人照片",
    socialLinks: "社交链接",
  },
  en: {
    title: "Zhemin Lin",
    description: "Zhemin Lin’s personal website for fundamental research, projects, articles, and recommendations.",
    switchLabel: "Switch to Chinese",
    themeDark: "Switch to dark theme",
    themeLight: "Switch to light theme",
    settings: "Page settings",
    intro: [
      "In an age of rapid technological change, tactical execution can’t make up for poor strategic thinking.",
      "The real work is finding the right angle, asking the right questions, setting the right priorities, and owning the decisions that follow.",
      "I conducted fundamental research at a private equity fund and family office, focusing on technology and consumer sectors. Previously, a commercial data analyst at CR Mixc Lifestyle.",
      "Corrections and thoughtful discussion are always welcome.",
    ],
    projectsHeading: "Projects",
    articlesHeading: "Articles",
    recommendationsHeading: "Recommendations",
    backToTop: "Back to top",
    copyEmail: "Copy email address",
    emailCopied: "Copied",
    emailCopyFailed: "Copy failed",
    photoLabel: "Portrait of Zhemin Lin",
    socialLinks: "Social links",
  },
};

export const projects = [
  {
    href: "https://agora.zhemin.ltd/",
    year: "2026",
    title: { cn: "对声网的投资研究", en: "Agora Equity Research" },
  },
  {
    href: "https://metals.zhemin.ltd/",
    title: { cn: "金银铜供需信息", en: "Gold, Silver & Copper Supply–Demand" },
  },
];

export const entries = [
  {
    section: "articles",
    slug: "copper-supply-demand",
    date: "2026-03",
    hasToc: true,
    title: { cn: "铜供需研究小结", en: "Copper Supply and Demand: Research Notes" },
    description: {
      cn: "梳理铜矿供给约束，以及电动车、AI 数据中心、电网和国防带来的增量需求。",
      en: "Research notes on copper supply constraints and demand from EVs, AI data centers, power grids, and defense.",
    },
    displayDate: { cn: "2026 年 3 月", en: "March 2026" },
  },
  {
    section: "articles",
    slug: "pendle-market-observation",
    date: "2026-01",
    hasToc: true,
    title: { cn: "Pendle 市场观察：巧妇难为无米之炊", en: "Pendle Market Outlook: You Can’t Cook Without Ingredients" },
    description: {
      cn: "观察 Pendle 池子结构、链上真实现金流瓶颈，以及 RWA 收益市场的潜在方向。",
      en: "An examination of Pendle’s pool mix, the limits of on-chain cash flow, and potential markets for real-world yield.",
    },
    displayDate: { cn: "2026 年 1 月", en: "January 2026" },
  },
  {
    section: "articles",
    slug: "pendle-industry",
    date: "2025-05",
    originalDate: "2024-H1",
    originalNote: { cn: "原文写于 2024 年上半年", en: "Originally written in H1 2024" },
    hasToc: true,
    title: { cn: "探究 Pendle 的行业空间和境况", en: "Pendle: Market Opportunity and Competitive Position" },
    description: {
      cn: "分析 Pendle 所在利率互换市场的空间、竞争格局、代币现金流与业务风险。",
      en: "An analysis of Pendle’s addressable market, competitive position, tokenholder cash flow, and business risks.",
    },
    displayDate: { cn: "2025 年 5 月", en: "May 2025" },
  },
  {
    section: "articles",
    slug: "lucky-companies",
    date: "2024-03",
    hasToc: false,
    title: { cn: "幸运的公司和权力结构", en: "Lucky Companies and Power Structures" },
    description: {
      cn: "从幸运与权力结构的角度，思考企业护城河、生态位置及其变化。",
      en: "A framework for considering company moats and ecosystem positions through luck and power structures.",
    },
    displayDate: { cn: "2024 年 3 月", en: "March 2024" },
  },
  {
    section: "articles",
    slug: "three-questions",
    date: "2023-10",
    hasToc: true,
    title: { cn: "投研模糊三问", en: "Three Questions for Fundamental Research" },
    description: {
      cn: "用三个问题分析个人认知、市场定价以及持仓能否等待错误修正。",
      en: "Three questions for evaluating personal understanding, market pricing, and whether a position can survive until mispricing is corrected.",
    },
    displayDate: { cn: "2023 年 10 月", en: "October 2023" },
  },
  {
    section: "articles",
    slug: "blockchain-and-time",
    date: "2023-04",
    hasToc: true,
    title: { cn: "从时间的角度漫谈区块链", en: "Blockchain Through the Lens of Time" },
    description: {
      cn: "从时间、顺序和信任出发，讨论区块链网络的价值与市场摩擦成本。",
      en: "An essay on blockchain value, trust, and market friction through the concepts of time and order.",
    },
    displayDate: { cn: "2023 年 4 月", en: "April 2023" },
  },
  {
    section: "recommendations",
    slug: "zhang-yao",
    date: "2025-12",
    hasToc: false,
    title: { cn: "投资人张尧的思维习惯和投资纪律", en: "Investor Zhang Yao’s Thinking Habits and Investment Discipline" },
    description: {
      cn: "总结投资人张尧关于能力圈、估值、仓位和长期投资的十条纪律。",
      en: "Ten lessons from investor Zhang Yao on competence, valuation, position sizing, and long-term ownership.",
    },
    displayDate: { cn: "2025 年 12 月", en: "December 2025" },
  },
  {
    section: "recommendations",
    slug: "concentration-diversification",
    date: "2023-10",
    hasToc: false,
    title: { cn: "集中、分散与不上市也值得持有", en: "Concentration, Diversification, and Companies Worth Owning" },
    description: {
      cn: "讨论投资组合为什么需要适度分散，以及持股数量与非系统性风险的关系。",
      en: "A discussion of appropriate portfolio diversification and the relationship between stock count and idiosyncratic risk.",
    },
    displayDate: { cn: "2023 年 10 月", en: "October 2023" },
  },
  {
    section: "recommendations",
    slug: "mental-models",
    date: "2019-04",
    hasToc: false,
    title: { cn: "王川：为什么思维模型是最重要的财富（一）", en: "Wang Chuan: Why Mental Models Are the Most Important Wealth (I)" },
    description: {
      cn: "关于思维模型、问题选择、技术基础设施和新旧价值链变迁的文章。",
      en: "An essay on mental models, problem selection, technological infrastructure, and shifts between old and new value chains.",
    },
    displayDate: { cn: "2019 年 4 月", en: "April 2019" },
  },
];

export function entryPath(entry, language) {
  return `${languages[language].prefix}/${entry.section}/${entry.slug}`;
}

export function homePath(language) {
  return languages[language].prefix || "/";
}

export function getEntry(section, slug) {
  const entry = entries.find((candidate) => candidate.section === section && candidate.slug === slug);
  if (!entry) throw new Error(`Unknown content entry: ${section}/${slug}`);
  return entry;
}

export function createHomeMetadata(language) {
  const copy = homeCopy[language];
  const canonical = homePath(language);
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: { "zh-CN": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: copy.title,
      description: copy.description,
      siteName: "Zhemin",
      locale: language === "cn" ? "zh_CN" : "en_US",
      alternateLocale: language === "cn" ? ["en_US"] : ["zh_CN"],
    },
    twitter: { card: "summary", title: copy.title, description: copy.description },
  };
}

export function createEntryMetadata(entry, language) {
  const canonical = entryPath(entry, language);
  const title = `${entry.title[language]} — Zhemin Lin`;
  const description = entry.description[language];
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "zh-CN": entryPath(entry, "cn"),
        en: entryPath(entry, "en"),
        "x-default": entryPath(entry, "cn"),
      },
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: "Zhemin",
      locale: language === "cn" ? "zh_CN" : "en_US",
      alternateLocale: language === "cn" ? ["en_US"] : ["zh_CN"],
      publishedTime: `${entry.date}-01`,
    },
    twitter: { card: "summary", title, description },
  };
}
