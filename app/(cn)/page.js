import HomePage from "../components/home-page";
import { createHomeMetadata } from "../content/registry.mjs";

export const metadata = createHomeMetadata("cn");

export default function Home() {
  return <HomePage language="cn" />;
}
