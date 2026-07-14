import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Zhemin",
  description: "Zhemin Lin 的个人网站：基本面研究、项目、文章与推荐。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`try { const saved = localStorage.getItem("theme"); const system = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; document.documentElement.dataset.theme = saved === "dark" || saved === "light" ? saved : system; } catch {}`}</Script>
        {children}
      </body>
    </html>
  );
}
