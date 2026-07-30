import type { Metadata } from "next";
import { PublicPreviewPage } from "@/components/PublicPreviewPage";
import { fetchPublicPreview, publicPreviewMetadata } from "@/lib/previews";

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  const preview = await fetchPublicPreview("invite", token);
  return publicPreviewMetadata({
    kind: "invite",
    identifier: token,
    preview,
    fallbackTitle: "List invitation",
    fallbackDescription:
      "Open rec.me to review this collaborative-list invitation.",
    alwaysNoIndex: true
  });
}

export default async function InviteSharePage({ params }: PageProps) {
  const { token } = await params;
  const preview = await fetchPublicPreview("invite", token);
  return (
    <PublicPreviewPage kind="invite" identifier={token} preview={preview} />
  );
}
