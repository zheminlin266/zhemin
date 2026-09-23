import Link from "next/link";
import SiteControls from "../components/site-controls";

export default function NotFound() {
  return (
    // Wrap the page so client navigation scrolls to this y=0 box, not to the offset controls.
    <div>
      <SiteControls
        language="cn"
        alternateHref="/"
        labels={{ settings: "页面设置", switchLabel: "切换为英文", themeDark: "切换为深色主题", themeLight: "切换为浅色主题" }}
      />
      <main className="state-page" lang="zh-CN">
        <p className="role">404</p>
        <h1>这个页面暂时不存在。</h1>
        <Link className="state-link" href="/cn">返回主页</Link>
      </main>
    </div>
  );
}
