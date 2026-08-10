import HomePage from "../../components/home-page";
import { createHomeMetadata } from "../../content/registry.mjs";

export const metadata = createHomeMetadata("en");

export default function EnglishHome() {
  return <HomePage language="en" />;
}
