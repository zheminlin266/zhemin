import Link from "next/link";
import SiteControls from "../../components/site-controls";

export default function EnglishNotFound() {
  return (
    // Wrap the page so client navigation scrolls to this y=0 box, not to the offset controls.
    <div>
      <SiteControls
        language="en"
        alternateHref="/"
        labels={{ settings: "Page settings", switchLabel: "Switch to Chinese", themeDark: "Switch to dark theme", themeLight: "Switch to light theme" }}
      />
      <main className="state-page" lang="en">
        <p className="role">404</p>
        <h1>This page does not exist.</h1>
        <Link className="state-link" href="/en">Back home</Link>
      </main>
    </div>
  );
}
