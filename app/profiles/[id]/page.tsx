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
  const preview = await fetchPublicPreview("profile", id);
  return publicPreviewMetadata({
    kind: "profile",
    identifier: id,
    preview,
    fallbackTitle: "Shared profile",
    fallbackDescription:
      "Open this shared profile in rec.me. Private saves stay private."
  });
}

export default async function ProfileSharePage({ params }: PageProps) {
  const { id } = await params;
  const preview = await fetchPublicPreview("profile", id);
  return (
    <PublicPreviewPage kind="profile" identifier={id} preview={preview} />
  );
}
