import type { Metadata } from "next";
import { PublicPreviewPage } from "@/components/PublicPreviewPage";
import { fetchPublicPreview, publicPreviewMetadata } from "@/lib/previews";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const preview = await fetchPublicPreview("place", id);
  return publicPreviewMetadata({
    kind: "place",
    identifier: id,
    preview,
    fallbackTitle: "Shared place",
    fallbackDescription: "Open this shared place in rec.me."
  });
}

export default async function PlaceSharePage({ params }: PageProps) {
  const { id } = await params;
  const preview = await fetchPublicPreview("place", id);
  return <PublicPreviewPage kind="place" identifier={id} preview={preview} />;
}
