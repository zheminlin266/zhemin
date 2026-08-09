import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";

export const metadata = {
  metadataBase: new URL("https://zhemin.ltd"),
  title: "Zhemin Lin",
  description: "Zhemin Lin 的个人网站：基本面研究、项目、文章与推荐。",
  applicationName: "Zhemin",
  authors: [{ name: "Zhemin Lin", url: "https://zhemin.ltd" }],
  creator: "Zhemin Lin",
};

export default function ChineseRootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`try { const saved = localStorage.getItem("theme"); const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; document.documentElement.dataset.theme = saved === "dark" || saved === "light" ? saved : system; } catch {}`}</Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
