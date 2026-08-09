import { permanentRedirect } from "next/navigation";

export default function LegacyResearchPage() {
  permanentRedirect("/articles/three-questions");
}
