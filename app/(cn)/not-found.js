import Link from "next/link";
import SiteControls from "../components/site-controls";

export default function NotFound() {
  return (
    <>
      <SiteControls
        language="cn"
        alternateHref="/en"
        labels={{ settings: "页面设置", switchLabel: "切换为英文", themeLabel: "深色主题" }}
      />
      <main className="state-page" lang="zh-CN">
        <p className="role">404</p>
        <h1>这个页面暂时不存在。</h1>
        <Link className="state-link" href="/">返回主页</Link>
      </main>
    </>
  );
}
