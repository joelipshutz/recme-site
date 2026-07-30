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
  const preview = await fetchPublicPreview("list", id);
  return publicPreviewMetadata({
    kind: "list",
    identifier: id,
    preview,
    fallbackTitle: "Shared list",
    fallbackDescription:
      "Open this shared list in rec.me. Access follows the owner’s privacy settings.",
    alwaysNoIndex: true
  });
}

export default async function ListSharePage({ params }: PageProps) {
  const { id } = await params;
  const preview = await fetchPublicPreview("list", id);
  return <PublicPreviewPage kind="list" identifier={id} preview={preview} />;
}
