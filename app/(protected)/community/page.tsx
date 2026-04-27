import { DashboardShell } from "@/components/dashboard-shell";
import { DirectoryFilters } from "@/components/directory-filters";
import { requireViewer } from "@/lib/auth";
import { getDirectoryBundle } from "@/lib/data";

export default async function CommunityPage() {
  const viewer = await requireViewer();
  const { members } = await getDirectoryBundle();

  return (
    <DashboardShell
      viewer={viewer}
      title="Community directory"
      intro="A traditional member view with search, filters, and specialties so the right introductions can happen faster."
    >
      <DirectoryFilters mode="members" members={members} />
    </DashboardShell>
  );
}
