import { DashboardShell } from "@/components/dashboard-shell";
import { DirectoryFilters } from "@/components/directory-filters";
import { requireViewer } from "@/lib/auth";
import { getDirectoryBundle } from "@/lib/data";

export default async function BusinessesPage() {
  const viewer = await requireViewer();
  const { businesses } = await getDirectoryBundle();

  return (
    <DashboardShell
      viewer={viewer}
      title="Business and services directory"
      intro="Traditional browse and filter tools for discovering community-owned businesses, operators, and service providers."
    >
      <DirectoryFilters mode="businesses" businesses={businesses} />
    </DashboardShell>
  );
}
