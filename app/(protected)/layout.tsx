import { SiteHeader } from "@/components/site-header";
import { requireViewer } from "@/lib/auth";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const viewer = await requireViewer();

  return (
    <>
      <SiteHeader viewer={viewer} />
      {children}
    </>
  );
}
