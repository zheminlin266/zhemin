import { notFound } from "next/navigation";
import MomentAlbum from "../../../components/moment-album";
import { createMomentMetadata, getMoment, moments } from "../../../content/moments.mjs";

export function generateStaticParams() {
  return moments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const collection = getMoment((await params).slug);
  if (!collection) notFound();
  return createMomentMetadata(collection, "en");
}

export default async function MomentPage({ params }) {
  const collection = getMoment((await params).slug);
  if (!collection) notFound();
  return <MomentAlbum collection={collection} language="en" />;
}
